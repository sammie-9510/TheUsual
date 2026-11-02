/* =========================================================================
   THE USUAL BAKERY - INTERACTIVE MAP (Part 3)
   Used on contact.html. Draws an interactive map with the free Leaflet
   library and OpenStreetMap tiles (no account or API key needed), with a
   marker for each bakery location. Click a marker for the address and a
   directions link.

   TO UPDATE: change the latitude / longitude numbers below to your real
   locations. To find them, right-click the spot in Google Maps and click
   the numbers at the top of the menu to copy them.
   ========================================================================= */
(function () {
    'use strict';

    var LOCATIONS = [
        {
            name: 'The Usual - Main Bakery',
            address: '12 Baker Street, Summerstrand, Gqeberha',
            lat:  -33.99177,
            lng: 25.65720
        },
        {
            name: 'The Usual - Newton Park Branch',
            address: '45 Rink Street, Newton Park, Gqeberha',
            lat: -33.94556,
            lng: 25.56500
        }
    ];

    function init() {
        var mapBox = document.getElementById('map-canvas');
        if (!mapBox) { return; }

        var note = document.getElementById('map-note');

        // If the Leaflet file could not load (offline, blocked), say so politely.
        // The "Open in Google Maps" links under the map still work.
        if (typeof L === 'undefined') {
            if (note) { note.textContent = 'The interactive map could not load. Use the links below to open each location in Google Maps.'; }
            return;
        }

        var map = L.map(mapBox, { scrollWheelZoom: false }); // stops the page getting "stuck" while scrolling

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // A simple brand-coloured pin made with CSS (see .map-pin in style.css)
        var pin = L.divIcon({
            className: 'map-pin-wrapper',
            html: '<span class="map-pin"></span>',
            iconSize: [30, 42],
            iconAnchor: [15, 38],
            popupAnchor: [0, -36]
        });

        var bounds = [];
        LOCATIONS.forEach(function (place) {
            // Build the pop-up with DOM nodes (not an HTML string) so no text is ever treated as code
            var content = document.createElement('div');
            var title = document.createElement('strong');
            title.textContent = place.name;
            var address = document.createElement('p');
            address.textContent = place.address;
            var link = document.createElement('a');
            link.href = 'https://www.google.com/maps/dir/?api=1&destination=' + place.lat + ',' + place.lng;
            link.textContent = 'Get directions';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            content.appendChild(title);
            content.appendChild(address);
            content.appendChild(link);

            L.marker([place.lat, place.lng], { icon: pin, title: place.name, alt: place.name })
                .addTo(map)
                .bindPopup(content);
            bounds.push([place.lat, place.lng]);
        });

        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 }); // shows both markers at once

        // Pressing Escape or clicking elsewhere closes the pop-up (Leaflet default); nothing more needed.
        if (note) { note.textContent = 'Click a pin for the address and directions. Use the + and - buttons to zoom.'; }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
