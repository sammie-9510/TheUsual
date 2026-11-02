/* =========================================================================
   THE USUAL BAKERY - PHOTO GALLERY WITH LIGHTBOX (Part 3)
   Every link inside a ".gallery" list opens its photo full size in a
   pop-up viewer (the "lightbox"). Visitors can use the on-screen buttons
   or the Left / Right / Esc keys.

   Without JavaScript each link simply opens the photo on its own, so the
   gallery still works.
   ========================================================================= */
(function () {
    'use strict';

    function init() {
        var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a'));
        var box = document.getElementById('lightbox');
        if (!links.length || !box) { return; }

        var image = document.getElementById('lightbox-image');
        var caption = document.getElementById('lightbox-caption');
        var count = document.getElementById('lightbox-count');
        var closeButton = document.getElementById('lightbox-close');
        var prevButton = document.getElementById('lightbox-prev');
        var nextButton = document.getElementById('lightbox-next');
        var current = 0;

        function show(index) {
            // wraps around: after the last photo comes the first
            current = (index + links.length) % links.length;
            var link = links[current];
            var thumb = link.querySelector('img');
            image.src = link.getAttribute('href');
            image.alt = thumb ? thumb.alt : '';
            caption.textContent = link.getAttribute('data-caption') || (thumb ? thumb.alt : '');
            count.textContent = (current + 1) + ' of ' + links.length;
        }

        function open(index) {
            show(index);
            document.body.classList.add('no-scroll');
            if (typeof box.showModal === 'function') { box.showModal(); } else { box.setAttribute('open', ''); }
        }

        function close() {
            if (typeof box.close === 'function') { box.close(); } else { box.removeAttribute('open'); }
        }

        links.forEach(function (link, index) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                open(index);
            });
        });

        closeButton.addEventListener('click', close);
        prevButton.addEventListener('click', function () { show(current - 1); });
        nextButton.addEventListener('click', function () { show(current + 1); });

        box.addEventListener('click', function (event) {
            if (event.target === box) { close(); } // click on the dark backdrop
        });
        box.addEventListener('close', function () { document.body.classList.remove('no-scroll'); });
        box.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') { show(current - 1); }
            if (event.key === 'ArrowRight') { show(current + 1); }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
