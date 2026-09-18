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
