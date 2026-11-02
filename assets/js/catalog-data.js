/* =========================================================================
   THE USUAL BAKERY - PRODUCT DATA (Part 3)
   The catalog lives here as plain data. products.js reads this array and
   builds the product cards on the page, so adding a product means adding
   one object here - no HTML to copy and paste.

   Prices are in South African Rand (ZAR) and are "from" prices.
   Image paths must match files in the /images folder - change them here
   if your photos have different names.
   ========================================================================= */
(function (global) {
    'use strict';

    var TU = (global.TU = global.TU || {});

    TU.CATEGORIES = {
        birthday: 'Birthday Cakes & Cupcakes',
        wedding: 'Wedding & Anniversary',
        milestone: 'Milestone Celebrations',
        corporate: 'Corporate Events'
    };

    TU.CATALOG = [
        {
            id: 'custom-birthday-cake',
            name: 'Custom Themed Birthday Cake',
            category: 'birthday',
            eventType: 'birthday',
            price: 650,
            priceNote: 'per cake',
            serves: '12 to 20 guests',
            leadDays: 3,
            image: '../assets/images/cake 1.jpg',
            alt: 'Custom themed birthday cake decorated by The Usual bakery',
            description: 'Personalised cake designed around any age or theme you choose.',
            details: 'Choose your flavour, filling and theme. We hand-decorate every cake and can match colours, characters or a photo you send us.',
            tags: ['birthday', 'kids', 'party', 'themed', 'custom']
        },
        {
            id: 'cupcake-tower',
            name: 'Cupcake Tower',
            category: 'birthday',
            eventType: 'birthday',
            price: 950,
            priceNote: 'per tower',
            serves: '24 to 36 guests',
            leadDays: 3,
            image: '../assets/images/Cupcake Tower.jpg',
            alt: 'Tiered cupcake tower dessert display',
            description: 'A tiered display of decorated cupcakes, perfect for dessert tables.',
            details: 'Two to three tiers of decorated cupcakes in the flavours you pick, delivered on a stand you can keep or return.',
            tags: ['cupcakes', 'party', 'dessert table', 'tower']
        },
        {
            id: 'cupcakes-dozen',
            name: 'Cupcakes by the Dozen',
            category: 'birthday',
            eventType: 'birthday',
            price: 240,
            priceNote: 'per dozen',
            serves: '12 cupcakes',
            leadDays: 2,
            image: '../assets/images/cupcake 1.jpg',
            alt: 'Box of a dozen decorated cupcakes',
            description: 'Individually decorated cupcakes, sold in boxes of twelve.',
            details: 'Mix flavours within a box. Great for classrooms, offices or a small celebration at home.',
            tags: ['cupcakes', 'dozen', 'box', 'small order']
        },
        {
            id: 'multi-tier-wedding-cake',
            name: 'Multi-Tier Wedding Cake',
            category: 'wedding',
            eventType: 'wedding',
            price: 3500,
            priceNote: 'from',
            serves: '60 to 100 guests',
            leadDays: 14,
            image: '../assets/images/multi cake.jpg',
            alt: 'Tiered wedding cake with floral decoration',
            description: 'Custom tiered wedding cakes, with tasting sessions available beforehand.',
            details: 'We design your cake with you, from flavour tasting to the final flowers. Delivery and set-up at your venue is available.',
            tags: ['wedding', 'tiered', 'tasting', 'floral', 'bride']
        },
        {
            id: 'anniversary-cake',
            name: 'Anniversary Cake',
            category: 'wedding',
            eventType: 'anniversary',
            price: 780,
            priceNote: 'per cake',
            serves: '12 to 20 guests',
            leadDays: 7,
            image: '../assets/images/Anniversary theme cake.jpg',
            alt: 'Anniversary cake styled to match a wedding cake',
            description: 'Designed to match your original wedding cake style, for any anniversary year.',
            details: 'Bring a photo of your wedding cake and we will recreate its look in a smaller size.',
            tags: ['anniversary', 'couples', 'romantic']
        },
        {
            id: 'wedding-favours',
            name: 'Matching Dessert Favours',
            category: 'wedding',
            eventType: 'wedding',
            price: 216,
            priceNote: 'per dozen',
            serves: '12 favours',
            leadDays: 10,
            image: '../assets/images/multi desserts.jpg',
            alt: 'Cupcake dessert favours for a wedding',
            description: 'Cupcakes and mini treats styled to match your wedding cake.',
            details: 'Individually boxed mini treats your guests can take home, styled to match your cake and colour scheme.',
            tags: ['favours', 'mini', 'wedding', 'gift']
        },
        {
            id: 'coming-of-age-cake',
            name: '21st & Coming-of-Age Cakes',
            category: 'milestone',
            eventType: 'milestone',
            price: 720,
            priceNote: 'per cake',
            serves: '15 to 25 guests',
            leadDays: 3,
            image: '../assets/images/21st Birthday.jpg',
            alt: 'Cake decorated for a 21st birthday',
            description: 'Cakes designed for 21st birthdays and other coming-of-age milestones.',
            details: 'Bold numbers, metallic finishes or a photo montage topper to mark the big day.',
            tags: ['21st', 'birthday', 'milestone', 'key to the door']
        },
        {
            id: 'graduation-cake',
            name: 'Graduation Cakes & Treats',
            category: 'milestone',
            eventType: 'milestone',
            price: 690,
            priceNote: 'per cake',
            serves: '15 to 25 guests',
            leadDays: 3,
            image: '../assets/images/Party Dessert.jpg',
            alt: 'Cake decorated for a graduation',
            description: 'Celebrate the achievement with a custom graduation-themed cake.',
            details: 'Choose your school or university colours, add a graduation cap topper and a personal message.',
            tags: ['graduation', 'matric', 'degree', 'school']
        },
        {
            id: 'retirement-cake',
            name: 'Retirement Cakes',
            category: 'milestone',
            eventType: 'milestone',
            price: 700,
            priceNote: 'per cake',
            serves: '15 to 25 guests',
            leadDays: 3,
            image: '../assets/images/Retirement Cake.jpg',
            alt: 'Cake decorated for a retirement celebration',
            description: 'Cakes for retirement and long-service celebrations.',
            details: 'A fitting thank-you to a colleague or family member, decorated around their hobbies and career.',
            tags: ['retirement', 'long service', 'farewell']
        },
        {
            id: 'mixed-pastry-platter',
            name: 'Mixed Pastry Platter',
            category: 'corporate',
            eventType: 'corporate',
            price: 850,
            priceNote: 'per platter',
            serves: '15 to 20 people',
            leadDays: 5,
            image: '../assets/images/platter.jpg',
            alt: 'Mixed pastry and cupcake platter for an office event',
            description: 'An assortment of pastries and cupcakes, ready for office events.',
            details: 'A mix of our most popular pastries and mini cupcakes, arranged on a platter and delivered to your office.',
            tags: ['platter', 'office', 'meeting', 'pastries', 'catering']
        },
        {
            id: 'branded-cake-topper',
            name: 'Branded Cake Topper',
            category: 'corporate',
            eventType: 'corporate',
            price: 450,
            priceNote: 'from',
            serves: 'Added to any cake',
            leadDays: 7,
            image: '../assets/images/cake topper.jpg',
            alt: 'Cake with a custom branded cake topper',
            description: 'Custom toppers featuring your company branding for product launches.',
            details: 'Send us your logo and brand colours and we will turn them into an edible topper for any cake or cupcake order.',
            tags: ['branded', 'logo', 'launch', 'corporate']
        },
        {
            id: 'bulk-order-delivery',
            name: 'Bulk Order & Delivery',
            category: 'corporate',
            eventType: 'corporate',
            price: 1800,
            priceNote: 'from',
            serves: '50 or more people',
            leadDays: 7,
            image: '../assets/images/bulk orders.jpg',
            alt: 'Bulk order of pastries prepared for a large corporate gathering',
            description: 'Large-quantity orders with delivery available for bigger gatherings.',
            details: 'Conferences, year-end functions and staff days. We plan quantities with you and deliver on the morning of your event.',
            tags: ['bulk', 'conference', 'year-end', 'delivery', 'catering']
        }
    ];
})(window);

/* ---------- Shared helper: format a number as South African Rand ---------- */
(function (global) {
    'use strict';
    var TU = (global.TU = global.TU || {});
    var formatter = null;
    try {
        formatter = new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0
        });
    } catch (e) { /* very old browsers fall back below */ }

    TU.formatPrice = function (amount) {
        return formatter ? formatter.format(amount) : 'R' + Math.round(amount);
    };
})(window);
