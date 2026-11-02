/* =========================================================================
   THE USUAL BAKERY - FORM VALIDATION HELPERS (Part 3)
   Shared by the enquiry form and the contact form.

   Every validator takes the field's value and returns an empty string when
   the value is fine, or a friendly error message when it is not. Keeping
   the rules here (instead of inside each form's script) means both forms
   check names, emails and phone numbers in exactly the same way.

   The HTML also carries matching attributes (required, maxlength, type,
   pattern). Those give browsers and screen readers a head start, and the
   JavaScript below adds clearer messages and the checks HTML cannot do
   (for example "the event date can't be in the past").
   ========================================================================= */
(function (global) {
    'use strict';

    var TU = (global.TU = global.TU || {});

    /* ---------- Date helpers (work in the visitor's local time) ---------- */

    function pad(n) {
        return n < 10 ? '0' + n : String(n);
    }

    // Date -> "YYYY-MM-DD" using local time (toISOString would use UTC)
    TU.toISODate = function (date) {
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    };

    // "YYYY-MM-DD" -> Date at local midnight, or null if it isn't a real date
    TU.parseISODate = function (text) {
        var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text || '');
        if (!match) { return null; }
        var y = Number(match[1]);
        var m = Number(match[2]);
        var d = Number(match[3]);
        var date = new Date(y, m - 1, d);
        // Rejects things like 2026-02-31 that JavaScript would silently roll over
        if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
            return null;
        }
        return date;
    };

    TU.startOfToday = function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };

    /* ---------- Validators ---------- */

    var V = (TU.validators = {});

    V.name = function (value) {
        var v = (value || '').trim();
        if (!v) { return 'Please enter your full name.'; }
        if (v.length < 2) { return 'Your name needs at least 2 characters.'; }
        if (v.length > 60) { return 'Your name must be 60 characters or fewer.'; }
        if (!/^[\p{L}][\p{L}\s'\u2019-]*$/u.test(v)) {
            return 'Names can only contain letters, spaces, hyphens and apostrophes.';
        }
        return '';
    };

    V.email = function (value) {
        var v = (value || '').trim();
        if (!v) { return 'Please enter your email address.'; }
        if (v.length > 100) { return 'Your email address must be 100 characters or fewer.'; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
            return 'Enter a valid email address, like name@example.com.';
        }
        return '';
    };

    // Accepts South African numbers: 041 000 0001, 0821234567 or +27 82 123 4567
    TU.normalisePhone = function (value) {
        return (value || '').replace(/[\s\-().]/g, '');
    };

    V.phone = function (value, options) {
        var required = !options || options.required !== false;
        var cleaned = TU.normalisePhone(value);
        if (!cleaned) { return required ? 'Please enter your phone number.' : ''; }
        if (!/^(\+27|0)[1-9]\d{8}$/.test(cleaned)) {
            return 'Enter a South African number, like 041 000 0001 or +27 82 123 4567.';
        }
        return '';
    };

    V.select = function (value, label) {
        return value ? '' : 'Please choose ' + (label || 'an option') + '.';
    };

    V.date = function (value, options) {
        var maxMonths = (options && options.maxMonthsAhead) || 24;
        if (!value) { return 'Please choose your event date.'; }
        var date = TU.parseISODate(value);
        if (!date) { return 'Enter a real date.'; }
        var today = TU.startOfToday();
        if (date < today) { return 'The event date cannot be in the past.'; }
        var limit = new Date(today.getFullYear(), today.getMonth() + maxMonths, today.getDate());
        if (date > limit) { return 'Please choose a date within the next ' + maxMonths + ' months.'; }
        return '';
    };

    V.guests = function (value) {
        var v = String(value || '').trim();
        if (!v) { return 'Please enter the number of guests.'; }
        if (!/^\d+$/.test(v)) { return 'Use whole numbers only, for example 25.'; }
        var n = Number(v);
        if (n < 1) { return 'There must be at least 1 guest.'; }
        if (n > 500) { return 'For more than 500 guests please contact us directly.'; }
        return '';
    };

    V.text = function (value, options) {
        var v = (value || '').trim();
        var min = (options && options.min) || 0;
        var max = (options && options.max) || 1000;
        var label = (options && options.label) || 'This field';
        if (!v) { return options && options.required ? label + ' is required.' : ''; }
        if (v.length < min) { return label + ' needs at least ' + min + ' characters.'; }
        if (v.length > max) { return label + ' must be ' + max + ' characters or fewer.'; }
        return '';
    };

    var ALLOWED_IMAGES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    var MAX_IMAGE_BYTES = 5 * 1024 * 1024;

    V.image = function (file) {
        if (!file) { return ''; } // optional field
        if (ALLOWED_IMAGES.indexOf(file.type) === -1) {
            return 'Please upload a JPG, PNG, WebP or GIF image.';
        }
        if (file.size > MAX_IMAGE_BYTES) { return 'The image must be smaller than 5 MB.'; }
        return '';
    };

    /* ---------- Showing and clearing errors ---------- */

    // Each input has a matching <span id="<input id>-error"> in the HTML
    TU.form = {
        setError: function (input, message) {
            var holder = document.getElementById(input.id + '-error');
            var field = input.closest('.field');
            if (holder) { holder.textContent = message; }
            if (field) { field.classList.add('has-error'); }
            input.setAttribute('aria-invalid', 'true');
        },

        clearError: function (input) {
            var holder = document.getElementById(input.id + '-error');
            var field = input.closest('.field');
            if (holder) { holder.textContent = ''; }
            if (field) { field.classList.remove('has-error'); }
            input.removeAttribute('aria-invalid');
        },

        // Runs a validator for one input and shows or clears the message.
        // Returns true when the field is valid.
        check: function (input, validator) {
            var message = validator(input);
            if (message) {
                TU.form.setError(input, message);
                return false;
            }
            TU.form.clearError(input);
            return true;
        },

        // Live character counter for a textarea
        counter: function (textarea, output, max) {
            function update() {
                output.textContent = textarea.value.length + ' / ' + max + ' characters';
            }
            textarea.addEventListener('input', update);
            update();
        }
    };
})(window);
