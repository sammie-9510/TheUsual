# The Usual | Web Development Project (WEDE5020)

## Student Information

- Name and Surname: Esamisipho Ndiko
- Student number: ST10531476
- Web Development (WEDE5020) Part 1
---
## Project Overview
- Part 1 of this POE is about planning building a basic website for a chosen business. It started 
with creating a proposal that covers the site layout using wireframes and a site map, budget, and
schedule plan on completing the website. To save and submit the work, a new repository was made on
GitHub and linked to the project via Visual Studio Code. Lastly using only plain HTML, a structure
of the website we created 5 pages, index.html (Home page of the website), catalog.html (showing
the variety of option provided by the business), enquirt.html (order page for customers), 
about.html (information page sharing stories, values and team), and contact.html (this provided
information about business location, opening hours and quick message form).
---
## Website Goals and Objectives
- Goals: showcasing the cake and cupcake catalog, generating order leads, and providing contact
information for customization.
- KPIs: Number of monthly form submissions, website traffic, and the volume of catalog PDF downloads
---
## Key Features and Functionality
- Homepage: An image of a custom cake, a brief introduction, and a clear view of the catalog.
- About Us: The history of the founder and the story about the bakery, the bakery’s baking
philosophy, and an image of the first kitchen the bakery started in.
- Catalog: A visual gallery of cakes, cupcakes, and party platters, categorized by event type.
- Enquiry: A detailed web form allowing customers to select event dates, type of event, upload
inspiration images, and request quotes.
- Contact: General contact information, operating hours, and a map showing the location of the bakery.
---
## Timeline and Milestones
- Week 1: Identify what the bakery needs and define the main goals for the website.
- Week 2: Sketch the layout wireframes and map out how all the pages will connect.
- Week 3: Write the HTML, CSS, and JavaScript code to make the web pages.
- Week 4: Fix errors so web browsers can read and process the code correctly.
- Week 5: Test the website on different devices and screens to find and fix any broken links or
  bugs.
- Week 6: Upload the finished website files to the GitHub repository for final submission
- Week 7: Update the project notes and plan how to add new cake items or prices in the future.
---
## SiteMap
<img width="988" height="379" alt="Screenshot 2026-08-14 162750" src="https://github.com/user-attachments/assets/cb69ab57-c08e-46c2-93db-1bf922ab3af7" />

---
## References
- Chaffey, D. and Ellis-Chadwick, F., 2019. Digital Marketing: Strategy, Implementation and 
Practice. 7th ed. Harlow: Pearson Education.
- Duckett, J., 2011. HTML and CSS: Design and Build Websites. Indianapolis, IN: John Wiley & Sons.
- Garrett, J.J., 2011. The Elements of User Experience: User-Centered Design for the Web and 
Beyond. 2nd ed. Berkeley, CA: New Riders.
- Robbins, J.N., 2012. Learning Web Design: A Beginner's Guide to HTML, CSS, JavaScript, and Web Graphics. 4th ed. Sebastopol, CA: O'Reilly Media.


---
# README Update - Part 2

## Project Part 2 - CSS Styling for Desktop Soluction and Responsive Design
### Overview of Part 2

In Part 1 we built five plain HTML pages for "The Usual" bakery website (index.html, about.html,
catalog.html, eququiry.html and contact.html). These pages had no styling or JavaScript.

In Part 2 we added a separate CSS file (css/style.css) and linked it to every page. This gave the
website a full desktop design with colours, fonts, layout and hover effect. We then made the
design work well on tablets and mobile phones.

## What was implemeneted

### External Stylesheet
- We created one CSS file called style.css and linked it from the head of all five HTML pages.
- The same relative path (css/style.css) is used on every page so the styling stays consistent.

### Base Style - Design Tokens
- We set the website colorsonce using CSS custom properties on the :root selector (soft
  buttercream yellow, pastel pink, dark chocolate brown and a cream background). These
  match the colors planned in Part 1.
- We added a simple CSS reset so margins, padding and box-sizing work the same in all
  browsers.
- We set a default font family, base font size and line-height on the body element.

### Fonts & Styling
- Selected Nunito for easy-to-read body text and Dancing Script for decoative heading that mimic
  cake icing.
- Used relative font sizes (rem) so text scales correctly based on user settings.
- Styled buttons with rounded pill shapes, show shadows, and visual feedback when hovered,
  focused, or clicked.

### Layouts & Structure
- Built multi-column layouts (headers, text-and-image split sections, forms, location
  details) using Flexbox.
- Used a reusable .split class for the home hero and "About Us" sections to avoid
  writing duplicate CSS.
- Styled product tables with row hover hightlights
- Designed two-column form structures that automatically collapse to s single column
  on mobile devices

### Updated File Structure
TheUsualBakery/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css          (new in Part 2)
└── images/

### Responsive Design
<img width="1907" height="935" alt="Screenshot 2026-09-18 160355" src="https://github.com/user-attachments/assets/79a2518e-debf-4c71-9b28-1d21d3babe2b" />

<img width="1916" height="917" alt="Screenshot 2026-09-18 160511" src="https://github.com/user-attachments/assets/071c7cd1-decf-41f6-a59e-40211126b2aa" />

### Changelog
| Date          | Change |
|---------------|--------|
| 10 Sep 2026   | Added external stylesheet (`css/style.css`) and linked it from all five HTML pages. |
| 11 Sep 2026   | Defined the site’s colour palette and typography as reusable CSS custom properties, and applied a CSS reset for consistent cross-browser rendering. |
| 13 Sep 2026   | Restructured the homepage hero and About Us history sections into a two-column media/content layout using Flexbox. |
| 14 Sep 2026   | Wrapped the catalog and product tables in a scrollable container for small screens; removed the border/cellpadding/cellspacing attributes used in Part 1 now that CSS controls that styling. |
| 15 Sep 2026   | Rebuilt the Enquiry and Contact forms with labelled field groups (`.field` / `.form-grid`) for a responsive two-column layout on desktop. |
| 16 Sep 2026   | Added hover, focus and active states for navigation links and buttons. |
| 16 Sep 2026   | Implemented two responsive breakpoints (900px tablet, 600px mobile) and fixed a flex-basis bug that was adding unwanted blank space when layouts stacked on mobile. |
| 16 Sep 2026   | Added a working responsive image example (`srcset`/`sizes`) on the homepage hero photo. |
| 17 Sep 2026   | Redesigned the site header to a simplified single-row layout (logo left, navigation right, thin divider) based on a supplied visual reference; removed the tagline text from the header row. |
| 18 Sep 2026   | Redesigned the site Enquiry page and redesigned the Contact Us page. |

### References
Font Awesome (2024) Font Awesome 6 Free. Available at: https://fontawesome.com (Accessed: 17 September 2026).

Google Fonts (n.d.) *Nunito*. Available at: https://fonts.google.com/specimen/Nunito (Accessed: 11 September 2026).

Google Fonts (n.d.) *Dancing Script*. Available at: https://fonts.google.com/specimen/Dancing+Script (Accessed: 11 September 2026).

Mozilla Developer Network (2024) Using CSS custom properties (variables). Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties (Accessed: 14 September 2026).

Mozilla Developer Network (2024) Responsive images. Available at: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images (Accessed: 14 September 2026).

Mozilla Contributors (n.d.) *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout (Accessed: 16 September 2026).

Mozilla Contributors (n.d.) *Using CSS Custom Properties (Variables)*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties (Accessed: 16 September 2026).

Mozilla Contributors (n.d.) *Media Queries*. Available at: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries (Accessed: 16 September 2026).

Mozilla Contributors (n.d.) *Responsive Images*. Available at: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images (Accessed: 16 September 2026).


W3Schools (2024) CSS Media Queries. Available at: https://www.w3schools.com/css/css3_mediaqueries.asp (Accessed: 15 September 2026).



# PART 3 - README Update

## Project Overview
“The Usual” is a made-up family bakery in Gqeberha (Port Elizabeth). It is built on more than 70 
years of recipes, warmth and community spirit. The website shows the bakery’s story, a catalog of 
custom cakes and pastries that people can search, a tool that gives a price estimate, and contact 
details with a map you can use. Part 1 built the HTML structure. Part 2 added the CSS styling and 
made the site work on all screen sizes. Part 3 (this update) adds JavaScript features, search 
engine optimisation (SEO), checked forms and putting the site online.

## Website Goals
-	Help visitors find the right cake fast, using search, filters and sorting.
-	Turn visitors into customers with an enquiry form that gives an instant price estimate and checks
	if the date is free.
-	Show up in local searches (like “custom cakes Gqeberha”) using on-page SEO and structured data.
-	Work on every screen size, with a keyboard, and with a screen reader.
  
## Main Features
- Five pages: Home, About Us, Products, Enquiry and Contact (plus robots.txt and sitemap.xml for
  search engines).
- A product catalog that JavaScript builds from a data file. It has live search, a category filter,
  sorting and a details pop-up.
-	A photo gallery with a lightbox (previous/next buttons that work with keyboard and swipe).
-	An enquiry form with checks on the answers, a price estimate, a date check and sending without
  reloading the page (AJAX). It also has an FAQ accordion.
-	A contact form that writes a ready-to-send email, and an interactive Leaflet map that shows both
  bakery locations.
-	Fade-in effects as you scroll, a back-to-top button, a skip-to-content link, and support for
  people who turn off animations.

## Part 3 – What Was Done
1. Working on Feedback
This is the feedback I got on the marking rubrics so far, and what I did about each point. Each fix
is also written as a dated entry in the changelog below.

| Rubric item and score |	Feedback received	| What I changed |
|-----------------------|-------------------|----------------|
Knowledge: Comments – “Requirements not met” (2 / 5) | “Provide sufficient usage of comments inyour code.” |	I added plenty of comments in all three languages. HTML: 42 comments across the fivepages before, 210 now, so every section,group of form fields, pop-up, script tag and closing tagis explained. CSS: 64 comment blocks before, 192 now, so every rule says what it does and why.JavaScript: every named function (61 out of 61) has a comment above it, plus comments on theimportant steps like the form checks, the estimate rules and the AJAX request. |
Knowledge: Feedback for Part 1 – 0 / 10	| “Missing records of improvements from part 1.” |	This README now has a “Record of Improvements from Part 1” section and dated changelog entries. They link each improvement to the feedback that caused it. |

Record of Improvements from Part 1
This section lists each improvement I made because of Part 1 feedback, where you can see it, and when I did it.

| Part 1 feedback |	Improvement made |	Where to see it |	Date |
|-----------------|------------------|------------------|------|
Not enough comments in the code (Comments, 2 / 5) | Added comments that explain every part of the Part 1 HTML (header, navigation, sections, tables, forms, footer). I kept the same standard in the CSS and JavaScript I added later |	All .html files; css/style.css; js/ files |	2026-11-02 |

Some other changes to the Part 1 pages (like replacing the product tables with cards built by 
JavaScript, and rebuilding the forms) were made because Part 2 and Part 3 asked for them, not 
because of feedback. They are listed in the changelog below.

### 2 Interactive elements
-	Accordion: This is the ordering FAQ on enquiry.html. The buttons use aria-expanded and aria-
controls. Only one answer is open at a time, and the height slides open using CSS transitions that 
JavaScript controls (js/main.js).
-	Modal (pop-up): Each product has a “View details” pop-up made with the built-in <dialog> element. 
This means Esc, focus and the dark background work without extra code (js/products.js).
-	Gallery: Six photos on the home page open full size. They have previous/next buttons, 
Left/Right/Esc keys, a caption and a counter (js/gallery.js). If JavaScript is off, each link just 
opens the photo.
-	Map: contact.html uses the Leaflet library with OpenStreetMap tiles (no API key needed). Both 
locations have a custom CSS pin and a pop-up with a “Get directions” link (js/map.js). Plain Google 
Maps links under the map are a backup.
-	Animation: Sections fade up as you scroll to them (IntersectionObserver), cards lift when you 
hover, and pop-ups grow in. All movement is turned off for visitors who prefer reduced motion.
-	DOM manipulation: The product cards, the category drop-down, the estimate result, the email 
preview and the back-to-top button are all made with document.createElement and filled with 
textContent (never innerHTML). This also stops script injection.

### 3 Dynamic content
- js/products-data.js holds 12 products as data. js/products.js builds the cards from that data. To 
add a product, you only add one object – there is no HTML to copy.
-	Search checks every word you type against the product name, description, category, serving size 
and tags. The category filter and the six sort options (featured, name A–Z/Z–A, price low–high/high–
low) all work together.
-	The search settings are saved in the web address (for example products.html?
cat=wedding&sort=price-desc). This lets people bookmark a filtered view, and the category links on 
the home page open the right filter.
-	“Get a quote” on a product opens the enquiry form with the event type and message already filled 
in.
### 4 On-page SEO
Keyword research: I picked local search terms that show people are ready to buy. I did not measure 
how often people search for them. Once the site is live, check this with Google Keyword Planner or 
Search Console.

| Keyword / phrase | Page |	Where it is used |
|------------------|------|------------------|
custom cakes Gqeberha / Port Elizabeth | Home | Title, meta description, h1, hero text |
custom birthday cakes Gqeberha | Products | Meta description, category names, product text |
wedding cakes Gqeberha | Products | Category names, product descriptions, image alt text |
cupcakes Gqeberha | Products |Product names and descriptions |
corporate pastry platters | Products | Category names, product descriptions |
cake quote Gqeberha | Enquiry | Title, h1, meta description |
family bakery Gqeberha / bakery Summerstrand |About, Contact | Titles, headings, address and schema data |

- Title tags and meta descriptions. Every page has its own title (about 50–60 characters) and meta
  description (about 130–160 characters), a canonical link and a favicon.
- Header tags. Each page has exactly one h1 that describes the page. Sections use h2 and sub-
sections use h3. The logo is no longer an h1 (the automated tests checked this).
- Image optimisation. Images have clear file names (like wedding-cake-tiered.jpg), useful alt
text, width and height attributes so the page does not jump around, lazy loading below the fold,
and srcset on the hero image.
- URL structure. Page names are short and easy to read (about.html, products.html, enquiry.html,
contact.html). Filters use clear parameters (?cat=wedding).
- Internal linking. Text links join related pages, category links go to the filtered catalog, the
footer lists all pages, and there is a “skip to content” link and a marker for the current page in
the menu.
- Mobile-friendliness. The layout from Part 2 adjusts to screen size. There is a viewport tag and
large tap targets. I tested at phone, tablet and desktop widths, and no page scrolls sideways.

### 4 Off-page SEO
These items need actions outside the code. What is already built into the site comes first, then 
the plan.
- Social media (built in). Open Graph and Twitter Card tags make shared links show a title, 
description and image. The footer links point to the bakery’s social profiles (placeholders until 
real addresses are added).
- Local SEO (built in). Bakery structured data (JSON-LD) has the address, coordinates, phone and 
opening hours for both locations on the Contact page, and for the main bakery on the Home page.
- Backlinks and local listings. This is a plan and is not done yet. Claim a Google Business 
Profile for each branch, using the same name, address and phone number as the website. List the 
bakery in Gqeberha business directories and wedding-supplier lists. Ask local suppliers, schools 
and event venues to link to the site. Post new cake photos on Facebook and Instagram with a link 
back to the catalog.

### 5 Extra SEO items
- robots.txt and sitemap.xml. robots.txt lets all crawlers in and points to the sitemap. 
sitemap.xml lists all five pages with their last-changed dates and priorities.
- Page speed. Google Fonts now load with a <link> and preconnect instead of a CSS @import. All 
scripts use defer. Images below the fold use loading="lazy". The hero image is marked high 
priority. Leaflet only loads on the Contact page. The CSS and JS are small plain files with no 
frameworks.
- Security. Subresource Integrity (SRI) hashes on the Leaflet files mean a changed CDN file will 
not run. External links use rel="noopener noreferrer". There are no inline scripts or event 
handlers. All dynamic text goes in with textContent. A hidden honeypot field catches spam bots. 
Every form checks its input. A _headers file is also included (written for Netlify). It sets 
Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-
Policy and HSTS. GitHub Pages ignores this file, so these headers are not active on the live site.

### 6 Form features and checks
Both forms use HTML5 attributes (required, type, minlength, maxlength, pattern, min/max) as the 
first line of defence. Then JavaScript (js/validation.js) takes over. It gives clearer messages, 
keeps the checks in one shared place, and re-checks a field live as the user fixes it.

| Field | Rule |
|-------|------|
| Name	| Required, 2–60 characters, only letters, spaces, hyphens and apostrophes |
| Email | Required, valid format, up to 100 characters |
| Phone | South African format (041 000 0001, 0821234567 or +27 82 123 4567). Required on the enquiry form, optional on the contact form |
| Event date | Required, a real calendar date, not in the past, within 24 months |
| Guests | Required, a whole number from 1 to 500 |
| Inspiration image | Optional. JPG, PNG, WebP or GIF, up to 5 MB |
| Message | Enquiry: optional, up to 1000 characters. Contact: required, 10–800 characters, with a live character counter |
| Select boxes | Event type, collection/delivery and type of message must be chosen |
