/* =========================================================================
   THE USUAL BAKERY - PRODUCT CATALOG (Part 3)
   Used on products.html. It:
     - builds the product cards from the data in products-data.js
       (dynamic content - no product is typed into the HTML by hand)
     - lets visitors search, filter by category and sort the list
     - opens a details pop-up (modal) for any product
     - remembers the search/filter in the web address, so a link like
       products.html?cat=wedding opens already filtered
   ========================================================================= */
(function (global) {
    'use strict';

    var TU = (global.TU = global.TU || {});

    /* ---------- Pure logic (no page needed, so it is easy to test) ---------- */

    // Everything a visitor might search for, joined into one lowercase string
    function searchText(catalog) {
        return [
            catalog.name,
            catalog.description,
            TU.CATEGORIES[catalog.category],
            catalog.serves,
            catalog.tags.join(' ')
        ].join(' ').toLowerCase();
    }

    TU.filterCatalog = function (catalog, options) {
        var query = (options.query || '').trim().toLowerCase();
        var words = query ? query.split(/\s+/) : [];
        var category = options.category || 'all';
        var sort = options.sort || 'featured';

        var result = catalog.filter(function (catalog) {
            if (category !== 'all' && catalog.category !== category) { return false; }
            var text = searchText(catalog);
            // every word typed must appear somewhere in the product's text
            return words.every(function (word) { return text.indexOf(word) !== -1; });
        });

        var sorters = {
            'name-asc': function (a, b) { return a.name.localeCompare(b.name); },
            'name-desc': function (a, b) { return b.name.localeCompare(a.name); },
            'price-asc': function (a, b) { return a.price - b.price; },
            'price-desc': function (a, b) { return b.price - a.price; }
        };
        if (sorters[sort]) { result = result.slice().sort(sorters[sort]); }
        return result;
    };

    /* ---------- Page code ---------- */

    function init() {
        var grid = document.getElementById('catalog-grid');
        if (!grid || !TU.CATALOG) { return; }

        var form = document.getElementById('catalog-controls');
        var searchInput = document.getElementById('catalog-search');
        var categorySelect = document.getElementById('catalog-category');
        var sortSelect = document.getElementById('catalog-sort');
        var countText = document.getElementById('result-count');

        var modal = document.getElementById('catalog-modal');
        var modalImage = document.getElementById('modal-image');
        var modalTag = document.getElementById('modal-category');
        var modalTitle = document.getElementById('modal-title');
        var modalDescription = document.getElementById('modal-description');
        var modalDetails = document.getElementById('modal-details');
        var modalQuote = document.getElementById('modal-quote');
        var modalClose = document.getElementById('modal-close');

        /* Fill the category drop-down from the same data used for the cards */
        Object.keys(TU.CATEGORIES).forEach(function (key) {
            var option = document.createElement('option');
            option.value = key;
            option.textContent = TU.CATEGORIES[key];
            categorySelect.appendChild(option);
        });

        /* Build one product card with the DOM (textContent keeps it XSS-safe) */
        function buildCard(catalog) {
            var card = document.createElement('article');
            card.className = 'product-card';

            var img = document.createElement('img');
            img.src = catalog.image;
            img.alt = catalog.alt;
            img.width = 400;
            img.height = 300;
            img.loading = 'lazy';
            card.appendChild(img);

            var body = document.createElement('div');
            body.className = 'product-card-body';

            var tag = document.createElement('p');
            tag.className = 'product-tag';
            tag.textContent = TU.CATEGORIES[catalog.category];
            body.appendChild(tag);

            var title = document.createElement('h3');
            title.textContent = catalog.name;
            body.appendChild(title);

            var description = document.createElement('p');
            description.textContent = catalog.description;
            body.appendChild(description);

            var price = document.createElement('p');
            price.className = 'product-price';
            var strong = document.createElement('strong');
            strong.textContent = (catalog.priceNote === 'from' ? 'From ' : '') + TU.formatPrice(catalog.price);
            price.appendChild(strong);
            if (catalog.priceNote !== 'from') {
                price.appendChild(document.createTextNode(' ' + catalog.priceNote));
            }
            body.appendChild(price);

            var actions = document.createElement('div');
            actions.className = 'catalog-actions';

            var details = document.createElement('button');
            details.type = 'button';
            details.className = 'btn btn-secondary';
            details.textContent = 'View details';
            details.setAttribute('aria-label', 'View details for ' + catalog.name);
            details.addEventListener('click', function () { openModal(catalog); });
            actions.appendChild(details);

            var quote = document.createElement('a');
            quote.className = 'btn';
            quote.href = 'enquiry.html?product=' + encodeURIComponent(catalog.id);
            quote.textContent = 'Get a quote';
            quote.setAttribute('aria-label', 'Get a quote for ' + catalog.name);
            actions.appendChild(quote);

            body.appendChild(actions);
            card.appendChild(body);
            return card;
        }

        /* Redraw the grid from the current search / filter / sort */
        function render() {
            var query = searchInput.value;
            var category = categorySelect.value;
            var sort = sortSelect.value;
            var results = TU.filterCatalog(TU.CATALOG, { query: query, category: category, sort: sort });

            grid.textContent = ''; // clears the old cards
            results.forEach(function (catalog) { grid.appendChild(buildCard(catalog)); });

            if (results.length === 0) {
                var empty = document.createElement('p');
                empty.className = 'empty-state';
                empty.textContent = query.trim()
                    ? 'No products match \u201c' + query.trim() + '\u201d. Try a different word or clear the filters.'
                    : 'No products in this category yet.';
                grid.appendChild(empty);
            }

            countText.textContent = 'Showing ' + results.length + ' of ' + TU.CATALOG.length + ' products';
            saveToUrl(query, category, sort);
        }

        /* Keep the search in the address bar so it can be bookmarked / shared */
        function saveToUrl(query, category, sort) {
            if (!global.history || !global.history.replaceState) { return; }
            var params = new URLSearchParams();
            if (query.trim()) { params.set('q', query.trim()); }
            if (category !== 'all') { params.set('cat', category); }
            if (sort !== 'featured') { params.set('sort', sort); }
            var text = params.toString();
            try {
                global.history.replaceState(null, '', global.location.pathname + (text ? '?' + text : ''));
            } catch (e) { /* some file:// setups block this - harmless */ }
        }

        function loadFromUrl() {
            var params = new URLSearchParams(global.location.search);
            var cat = params.get('cat');
            var sort = params.get('sort');
            if (params.get('q')) { searchInput.value = params.get('q').slice(0, 60); }
            if (cat && TU.CATEGORIES[cat]) { categorySelect.value = cat; }
            if (sort && sortSelect.querySelector('option[value="' + sort + '"]')) { sortSelect.value = sort; }
        }

        /* ---------- Details modal ---------- */
        function openModal(catalog) {
            modalImage.src = catalog.image;
            modalImage.alt = catalog.alt;
            modalTag.textContent = TU.CATEGORIES[catalog.category];
            modalTitle.textContent = catalog.name;
            modalDescription.textContent = catalog.details;

            modalDetails.textContent = '';
            [
                ['Price', (catalog.priceNote === 'from' ? 'From ' : '') + TU.formatPrice(catalog.price) +
                    (catalog.priceNote === 'from' ? '' : ' ' + catalog.priceNote)],
                ['Serves', catalog.serves],
                ['Order at least', catalog.leadDays + ' days ahead']
            ].forEach(function (row) {
                var dt = document.createElement('dt');
                dt.textContent = row[0];
                var dd = document.createElement('dd');
                dd.textContent = row[1];
                modalDetails.appendChild(dt);
                modalDetails.appendChild(dd);
            });

            modalQuote.href = 'enquiry.html?catalog=' + encodeURIComponent(catalog.id);

            document.body.classList.add('no-scroll');
            if (typeof modal.showModal === 'function') {
                modal.showModal();
            } else {
                modal.setAttribute('open', ''); // very old browsers
            }
        }

        function closeModal() {
            if (typeof modal.close === 'function') { modal.close(); } else { modal.removeAttribute('open'); }
        }

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function (event) {
            if (event.target === modal) { closeModal(); } // click on the dark backdrop
        });
        modal.addEventListener('close', function () { document.body.classList.remove('no-scroll'); });

        /* ---------- Wire up the controls ---------- */
        var timer = null;
        searchInput.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(render, 150); // wait for a pause in typing
        });
        categorySelect.addEventListener('change', render);
        sortSelect.addEventListener('change', render);
        form.addEventListener('submit', function (event) { event.preventDefault(); render(); });
        form.addEventListener('reset', function () { setTimeout(render, 0); });

        loadFromUrl();
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);
