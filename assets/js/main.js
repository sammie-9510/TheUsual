/* =========================================================================
   THE USUAL BAKERY - SITE-WIDE SCRIPT (Part 3)
   Loaded on every page. It adds the small interactive touches that every
   page shares:
     1. Footer year
     2. Scroll-reveal animation (sections fade up as they come into view)
     3. Accordion (used for the FAQ on the Enquiry page)
     4. Back-to-top button
   Nothing here is required for the site to work: with JavaScript turned off
   all content is still visible and every link still works.
   ========================================================================= */
(function () {
    'use strict';

    var prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. Footer year ---------- */
    function setYear() {
        var holders = document.querySelectorAll('[data-year]');
        for (var i = 0; i < holders.length; i++) {
            holders[i].textContent = new Date().getFullYear();
        }
    }

    /* ---------- 2. Scroll reveal ---------- */
    // JavaScript adds the "reveal" class itself, so if this script never runs
    // the sections simply stay visible instead of being stuck invisible.
    function initReveal() {
        var targets = document.querySelectorAll('main section, main > h1, main > p');
        if (prefersReducedMotion || !('IntersectionObserver' in window)) { return; }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        targets.forEach(function (el) {
            if (el.hidden) { return; } // sections that start hidden (results) appear on their own
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    /* ---------- 3. Accordion ---------- */
    function panelFor(button) {
        return document.getElementById(button.getAttribute('aria-controls'));
    }

    function openPanel(button) {
        var panel = panelFor(button);
        button.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px'; // animates the height open
    }

    function closePanel(button) {
        var panel = panelFor(button);
        button.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        panel.style.maxHeight = '0px';
    }

    function initAccordions() {
        var accordions = document.querySelectorAll('.accordion');
        accordions.forEach(function (accordion) {
            var buttons = accordion.querySelectorAll('.accordion-trigger');
            accordion.classList.add('accordion--ready'); // switches on the collapsed styling

            buttons.forEach(function (button) {
                closePanel(button);
                button.addEventListener('click', function () {
                    var wasOpen = button.getAttribute('aria-expanded') === 'true';
                    buttons.forEach(closePanel); // only one answer open at a time
                    if (!wasOpen) { openPanel(button); }
                });
            });
        });

        // Keep an open panel the right height if the window is resized
        window.addEventListener('resize', function () {
            document.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach(function (button) {
                panelFor(button).style.maxHeight = panelFor(button).scrollHeight + 'px';
            });
        });
    }

    /* ---------- 4. Back-to-top button ---------- */
    function initBackToTop() {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.textContent = '\u2191';
        document.body.appendChild(button);

        function toggle() {
            button.classList.toggle('is-visible', window.scrollY > 400);
        }
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();

        button.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    function init() {
        setYear();
        initReveal();
        initAccordions();
        initBackToTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
