/* =========================================================================
   THE USUAL BAKERY - CONTACT FORM (Part 3)
   Used on contact.html. The visitor fills in their details, the type of
   message and the message itself. After validation the script:
     1. Compiles everything into an email (recipient, subject and body)
     2. Shows the email on screen so the visitor can check it
     3. Gives them a "Send email" button that opens their email app with
        the message ready to send to the address in config.js

   Without JavaScript the form falls back to a plain mailto: action.
   Needs config.js and validation.js loaded first.
   ========================================================================= */
(function (global) {
    'use strict';

    var TU = (global.TU = global.TU || {});
    var V = TU.validators;

    var MESSAGE_MIN = 10;
    var MESSAGE_MAX = 800; // kept short so the whole email fits in a mailto: link

    /* Turns the form values into an email. Pure function, so it is easy to test. */
    TU.buildEmail = function (values) {
        var subjectPart = values.subject ? ': ' + values.subject : '';
        var lines = [
            'Name: ' + values.name,
            'Email: ' + values.email,
            'Phone: ' + (values.phone || 'Not given'),
            'Type of message: ' + values.type,
            '',
            'Message:',
            values.message,
            '',
            '(Sent from the ' + TU.CONFIG.businessName + ' website contact form)'
        ];
        var subject = '[' + values.type + ']' + subjectPart;
        var body = lines.join('\n');
        return {
            to: TU.CONFIG.recipientEmail,
            subject: subject,
            body: body,
            link: 'mailto:' + TU.CONFIG.recipientEmail +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body)
        };
    };

    function init() {
        var form = document.getElementById('contact-form-element');
        if (!form) { return; }
        form.noValidate = true; // our own checks take over (the browser's built-in pop-ups are switched off)

        var fields = {
            name: document.getElementById('contact-name'),
            email: document.getElementById('contact-email'),
            phone: document.getElementById('contact-phone'),
            type: document.getElementById('contact-type'),
            subject: document.getElementById('contact-subject'),
            message: document.getElementById('contact-message')
        };
        var summary = document.getElementById('contact-summary');
        var preview = document.getElementById('email-preview');

        var checks = [
            [fields.name, function (i) { return V.name(i.value); }],
            [fields.email, function (i) { return V.email(i.value); }],
            [fields.phone, function (i) { return V.phone(i.value, { required: false }); }],
            [fields.type, function (i) { return V.select(i.value, 'the type of message'); }],
            [fields.subject, function (i) { return V.text(i.value, { max: 80, label: 'The subject' }); }],
            [fields.message, function (i) {
                return V.text(i.value, { required: true, min: MESSAGE_MIN, max: MESSAGE_MAX, label: 'Your message' });
            }]
        ];

        TU.form.counter(fields.message, document.getElementById('contact-message-count'), MESSAGE_MAX);

        checks.forEach(function (pair) {
            var input = pair[0];
            var validator = pair[1];
            input.addEventListener('blur', function () { TU.form.check(input, validator); });
            var liveEvent = input.tagName === 'SELECT' ? 'change' : 'input';
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

        function el(tag, className, text) {
            var node = document.createElement(tag);
            if (className) { node.className = className; }
            if (text !== undefined) { node.textContent = text; }
            return node;
        }

        function showPreview(email) {
            preview.textContent = '';

            var heading = el('h3', '', 'Your email is ready');
            heading.tabIndex = -1;
            preview.appendChild(heading);
            preview.appendChild(el('p', '', 'Check it below, then press \u201cSend email\u201d. Your email app will open with everything filled in.'));

            var list = el('dl', 'summary-list');
            list.appendChild(el('dt', '', 'To'));
            list.appendChild(el('dd', '', email.to));
            list.appendChild(el('dt', '', 'Subject'));
            list.appendChild(el('dd', '', email.subject));
            preview.appendChild(list);

            var body = el('pre', 'email-body', email.body); // textContent: safe even if the message contains HTML
            preview.appendChild(body);

            var actions = el('div', 'result-actions');
            var send = el('a', 'btn', 'Send email');
            send.href = email.link;
            var edit = el('button', 'btn btn-secondary', 'Edit message');
            edit.type = 'button';
            edit.addEventListener('click', function () {
                preview.hidden = true;
                form.hidden = false;
                fields.message.focus();
            });
            actions.appendChild(send);
            actions.appendChild(edit);
            preview.appendChild(actions);

            form.hidden = true;
            preview.hidden = false;
            heading.focus();
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateAll()) { return; }

            var typeOption = fields.type.options[fields.type.selectedIndex];
            showPreview(TU.buildEmail({
                name: fields.name.value.trim(),
                email: fields.email.value.trim(),
                phone: TU.normalisePhone(fields.phone.value),
                type: typeOption.textContent,
                subject: fields.subject.value.trim(),
                message: fields.message.value.trim()
            }));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);
