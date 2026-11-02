/* =========================================================================
   THE USUAL BAKERY - ENQUIRY FORM (Part 3)
   Used on enquiry.html. This script:
     1. Validates every field before anything is sent (client-side checks)
     2. Shows a clear error under each wrong field (error handling)
     3. Works out an estimated cost and checks whether the date is available
     4. Sends the enquiry with AJAX (fetch) so the page does not reload
     5. Shows the visitor a response with the cost, availability and a
        reference number
   Needs config.js, products-data.js and validation.js loaded first.
   ========================================================================= */
(function (global) {
    'use strict';

    var TU = (global.TU = global.TU || {});
    var V = TU.validators;

    /* ---------- Business rules for the estimate ---------- */
    // All amounts are in Rand. These are estimates only - the bakery confirms the final price.
    var PRICE_PER_GUEST = { birthday: 45, wedding: 95, anniversary: 75, milestone: 55, corporate: 42, other: 50 };
    var MINIMUM_ORDER = 450;
    var DELIVERY_FEE = 150;
    // Days of notice we need before the event
    var LEAD_DAYS = { birthday: 3, milestone: 3, corporate: 5, anniversary: 7, wedding: 14, other: 3 };
    // Days the ovens are off (demo list - add your own public holidays)
    var CLOSED_DATES = ['2026-12-25', '2026-12-26', '2027-01-01'];
    var LARGE_ORDER_GUESTS = 200;
    var DAY_MS = 24 * 60 * 60 * 1000;

    var EVENT_LABELS = {
        birthday: 'Birthday',
        wedding: 'Wedding',
        anniversary: 'Anniversary',
        milestone: 'Milestone celebration',
        corporate: 'Corporate event',
        other: 'Other'
    };

    function roundToTen(n) { return Math.round(n / 10) * 10; }

    function isClosed(date) {
        return date.getDay() === 0 || CLOSED_DATES.indexOf(TU.toISODate(date)) !== -1;
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-ZA', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    }

    // First day on or after "date" that the bakery is open
    function nextOpenDay(date) {
        var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        while (isClosed(d)) { d.setDate(d.getDate() + 1); }
        return d;
    }

    /* ---------- Availability ---------- */
    TU.checkAvailability = function (eventType, dateText, guests, today) {
        today = today || TU.startOfToday();
        var date = TU.parseISODate(dateText);
        var required = LEAD_DAYS[eventType] || LEAD_DAYS.other;
        var daysAway = Math.round((date - today) / DAY_MS);
        var label = EVENT_LABELS[eventType] || EVENT_LABELS.other;

        if (CLOSED_DATES.indexOf(dateText) !== -1) {
            return {
                status: 'unavailable',
                title: 'Date unavailable',
                message: 'We are closed on ' + formatDate(date) + '. Please pick another date.'
            };
        }

        if (daysAway < required) {
            var earliest = new Date(today.getFullYear(), today.getMonth(), today.getDate() + required);
            return {
                status: 'unavailable',
                title: 'Not enough notice',
                message: label + ' orders need at least ' + required + ' days\u2019 notice. ' +
                    'The earliest date we can offer is ' + formatDate(nextOpenDay(earliest)) + '.'
            };
        }

        if (date.getDay() === 0) {
            return {
                status: 'limited',
                title: 'Limited availability',
                message: 'We are closed on Sundays. We can usually arrange collection or delivery on the ' +
                    'Saturday before. We will confirm with you.'
            };
        }

        if (guests >= LARGE_ORDER_GUESTS) {
            return {
                status: 'limited',
                title: 'Limited availability',
                message: 'Orders for ' + LARGE_ORDER_GUESTS + ' or more guests need extra planning. ' +
                    'We will phone you within one working day to confirm.'
            };
        }

        return {
            status: 'available',
            title: 'Available',
            message: 'Good news: we have space for your order on ' + formatDate(date) + '.'
        };
    };

    /* ---------- Cost estimate ---------- */
    TU.calculateQuote = function (details, today) {
        var type = details.eventType in PRICE_PER_GUEST ? details.eventType : 'other';
        var guests = Number(details.guests);
        var perGuest = PRICE_PER_GUEST[type];
        var fromGuests = guests * perGuest;
        var base = Math.max(MINIMUM_ORDER, fromGuests);
        var delivery = details.delivery === 'deliver' ? DELIVERY_FEE : 0;
        var total = base + delivery;

        return {
            perGuest: perGuest,
            guests: guests,
            base: base,
            minimumApplied: fromGuests < MINIMUM_ORDER,
            delivery: delivery,
            total: total,
            low: roundToTen(total * 0.9),
            high: roundToTen(total * 1.1),
            availability: TU.checkAvailability(type, details.date, guests, today)
        };
    };

    TU.makeReference = function () {
        var letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var now = new Date();
        var stamp = String(now.getFullYear()).slice(2) +
            ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2);
        var suffix = '';
        for (var i = 0; i < 4; i++) {
            suffix += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return 'TU-' + stamp + '-' + suffix;
    };

    /* ---------- Small DOM helper ---------- */
    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) { node.className = className; }
        if (text !== undefined) { node.textContent = text; }
        return node;
    }

    /* ---------- Page code ---------- */
    function init() {
        var form = document.getElementById('enquiry-form');
        if (!form) { return; }
        form.noValidate = true; // our own checks take over (the browser's built-in pop-ups are switched off)

        var fields = {
            name: document.getElementById('full-name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            type: document.getElementById('event-type'),
            date: document.getElementById('event-date'),
            guests: document.getElementById('guest-count'),
            delivery: document.getElementById('delivery'),
            image: document.getElementById('inspiration-image'),
            message: document.getElementById('message')
        };
        var honeypot = document.getElementById('website');
        var summary = document.getElementById('form-summary');
        var resultBox = document.getElementById('quote-result');
        var submitButton = form.querySelector('button[type="submit"]');
        var MESSAGE_MAX = 1000;

        // Which validator checks which field
        var checks = [
            [fields.name, function (i) { return V.name(i.value); }],
            [fields.email, function (i) { return V.email(i.value); }],
            [fields.phone, function (i) { return V.phone(i.value); }],
            [fields.type, function (i) { return V.select(i.value, 'the type of event'); }],
            [fields.date, function (i) { return V.date(i.value); }],
            [fields.guests, function (i) { return V.guests(i.value); }],
            [fields.delivery, function (i) { return V.select(i.value, 'collection or delivery'); }],
            [fields.image, function (i) { return V.image(i.files && i.files[0]); }],
            [fields.message, function (i) {
                return V.text(i.value, { max: MESSAGE_MAX, label: 'Your message' });
            }]
        ];

        // Earliest date the picker allows is today
        fields.date.min = TU.toISODate(TU.startOfToday());

        TU.form.counter(fields.message, document.getElementById('message-count'), MESSAGE_MAX);

        /* Arriving from a product's "Get a quote" button: pre-fill what we know */
        var wanted = new URLSearchParams(global.location.search).get('product');
        if (wanted && TU.CATALOG) {
            var product = TU.CATALOG.filter(function (p) { return p.id === wanted; })[0];
            if (product) {
                fields.type.value = product.eventType;
                fields.message.value = 'I\u2019m interested in: ' + product.name + '.';
                fields.message.dispatchEvent(new Event('input'));
            }
        }

        /* Check a field when the visitor leaves it, and re-check as they fix it */
        checks.forEach(function (pair) {
            var input = pair[0];
            var validator = pair[1];
            input.addEventListener('blur', function () { TU.form.check(input, validator); });
            var liveEvent = input.tagName === 'SELECT' || input.type === 'file' ? 'change' : 'input';
            input.addEventListener(liveEvent, function () {
                if (input.getAttribute('aria-invalid') === 'true') { TU.form.check(input, validator); }
            });
        });

        function validateAll() {
            var firstBad = null;
            var badCount = 0;
            checks.forEach(function (pair) {
                if (!TU.form.check(pair[0], pair[1])) {
                    badCount++;
                    if (!firstBad) { firstBad = pair[0]; }
                }
            });
            if (badCount) {
                summary.textContent = 'Please fix the ' + badCount + ' highlighted ' +
                    (badCount === 1 ? 'field' : 'fields') + ' below.';
                summary.hidden = false;
                firstBad.focus();
                return false;
            }
            summary.hidden = true;
            return true;
        }

        function readDetails() {
            return {
                name: fields.name.value.trim(),
                email: fields.email.value.trim(),
                phone: TU.normalisePhone(fields.phone.value),
                eventType: fields.type.value,
                date: fields.date.value,
                guests: Number(fields.guests.value),
                delivery: fields.delivery.value,
                message: fields.message.value.trim(),
                imageName: fields.image.files && fields.image.files[0] ? fields.image.files[0].name : ''
            };
        }

        /* ---------- AJAX submission ---------- */
        // Sends the enquiry without reloading the page. Resolves to true if the
        // server accepted it, false if anything went wrong (so the visitor
        // still sees their estimate and a way to contact us another way).
        function sendEnquiry(details, reference) {
            if (!global.fetch) { return Promise.resolve(false); }
            var controller = global.AbortController ? new AbortController() : null;
            var timeout = setTimeout(function () { if (controller) { controller.abort(); } }, 8000);

            return fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ reference: reference, enquiry: details }),
                signal: controller ? controller.signal : undefined
            }).then(function (response) {
                clearTimeout(timeout);
                return response.ok;
            }).catch(function () {
                clearTimeout(timeout);
                return false;
            });
        }

        /* ---------- Showing the response ---------- */
        function addRow(list, label, value) {
            list.appendChild(el('dt', '', label));
            list.appendChild(el('dd', '', value));
        }

        function showResult(details, quote, reference, sent) {
            var date = TU.parseISODate(details.date);
            resultBox.textContent = '';

            var heading = el('h2', '', 'Your estimate');
            heading.id = 'quote-heading';
            heading.tabIndex = -1;
            resultBox.appendChild(heading);
            resultBox.appendChild(el('p', 'reference', 'Reference: ' + reference));

            var status = el('div', 'status status-' + quote.availability.status);
            status.appendChild(el('strong', '', quote.availability.title));
            status.appendChild(el('p', '', quote.availability.message));
            resultBox.appendChild(status);

            resultBox.appendChild(el('h3', '', 'Your event'));
            var eventList = el('dl', 'summary-list');
            addRow(eventList, 'Event', EVENT_LABELS[details.eventType] || 'Other');
            addRow(eventList, 'Date', formatDate(date));
            addRow(eventList, 'Guests', String(details.guests));
            addRow(eventList, 'Option', details.delivery === 'deliver' ? 'Delivery' : 'Collection');
            resultBox.appendChild(eventList);

            resultBox.appendChild(el('h3', '', 'Estimated cost'));
            var costList = el('dl', 'summary-list');
            addRow(costList, 'Cakes & treats',
                quote.minimumApplied
                    ? TU.formatPrice(quote.base) + ' (minimum order)'
                    : TU.formatPrice(quote.base) + ' (' + quote.guests + ' guests \u00d7 ' + TU.formatPrice(quote.perGuest) + ')');
            addRow(costList, 'Delivery', quote.delivery ? TU.formatPrice(quote.delivery) : 'Free (collection)');
            addRow(costList, 'Estimated total', TU.formatPrice(quote.total));
            addRow(costList, 'Likely range', TU.formatPrice(quote.low) + ' to ' + TU.formatPrice(quote.high));
            resultBox.appendChild(costList);

            resultBox.appendChild(el('p', 'note',
                'This is an estimate based on your guest count. We confirm the final price once we know your flavours and design.'));

            var sentNote = el('p', sent ? 'sent-ok' : 'sent-fail');
            if (sent) {
                sentNote.textContent = 'Your enquiry has been sent. We will reply to ' + details.email + ' within one working day.';
            } else {
                sentNote.appendChild(document.createTextNode(
                    'We could not send your enquiry online just now. Please email us at '));
                var mail = el('a', '', TU.CONFIG.recipientEmail);
                mail.href = 'mailto:' + TU.CONFIG.recipientEmail + '?subject=' + encodeURIComponent('Enquiry ' + reference);
                sentNote.appendChild(mail);
                sentNote.appendChild(document.createTextNode(' and quote reference ' + reference + '.'));
            }
            resultBox.appendChild(sentNote);

            var actions = el('div', 'result-actions');
            var edit = el('button', 'btn btn-secondary', 'Change my answers');
            edit.type = 'button';
            edit.addEventListener('click', function () {
                resultBox.hidden = true;
                form.hidden = false;
                fields.name.focus();
            });
            var fresh = el('button', 'btn', 'Start a new enquiry');
            fresh.type = 'button';
            fresh.addEventListener('click', function () {
                form.reset();
                checks.forEach(function (pair) { TU.form.clearError(pair[0]); });
                fields.message.dispatchEvent(new Event('input'));
                resultBox.hidden = true;
                form.hidden = false;
                fields.name.focus();
            });
            actions.appendChild(edit);
            actions.appendChild(fresh);
            resultBox.appendChild(actions);

            form.hidden = true;
            resultBox.hidden = false;
            heading.focus();
            resultBox.scrollIntoView({ block: 'start' });
        }

        /* ---------- Submit ---------- */
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Bots fill in hidden fields that people never see - quietly ignore them
            if (honeypot && honeypot.value) { return; }
            if (!validateAll()) { return; }

            var details = readDetails();
            var quote = TU.calculateQuote(details);
            var reference = TU.makeReference();

            submitButton.disabled = true;
            submitButton.textContent = 'Sending\u2026';
            form.setAttribute('aria-busy', 'true');

            sendEnquiry(details, reference).then(function (sent) {
                submitButton.disabled = false;
                submitButton.textContent = 'Get My Estimate';
                form.removeAttribute('aria-busy');
                showResult(details, quote, reference, sent);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);
