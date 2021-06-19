# Frontend Mentor - Clock app solution

This is a solution to the [Clock app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/clock-app-LMFaxFwrM). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
    - [Reference design](#reference-design)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Build out a clock application and get it looking as close to the design as possible. Use the following APIs to retrieve the necessary data:

- [World Time API](http://worldtimeapi.org/)
- [Free IP Geolocation API](https://freegeoip.app/)
- [Programming Quotes API](https://programming-quotes-api.herokuapp.com/)
- [Quotable API](https://github.com/lukePeavey/quotable)

Users should be able to:

- View the optimal layout for the site depending on their device's screen size.
- See hover states for all interactive elements on the page.
- View the current time and location information based on their IP address.
- View additional information about the date and time in the expanded state.
- Be shown the correct greeting and background image based on the time of day they're visiting the site.
- Generate random programming quotes by clicking the refresh icon near the quote.

### Screenshot

- [Mobile default](./design/screenshots/mobile-screenshot-default.jpg)
- [Mobile expanded](./design/screenshots/mobile-screenshot-expanded.jpg)
- [Tablet default](./design/screenshots/tablet-screenshot-default.jpg)
- [Tablet expanded](./design/screenshots/tablet-screenshot-expanded.jpg)
- [Desktop default](./design/screenshots/desktop-screenshot-default.jpg)
- [Desktop expanded](./design/screenshots/desktop-screenshot-expanded.jpg)

#### Reference design

![Reference design](./design/reference/preview.jpg)

### Links

- [Solution URL](https://github.com/richardcyrus/fm-clock-app)
- [Live Site URL](https://www.richardcyrus.com/fm-clock-app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [axios](https://axios-http.com/) - Gets around some quirks with the built-in WindowOrWorkerGlobalScope.fetch() method.
- [Luxon](https://moment.github.io/luxon/index.html) - Makes working with the date and time simpler.

### What I learned

- Ad Blockers can prevent `XMLHttpRequests` or `fetch()` from succeeding even when the site otherwise works in a browser or at the command line. This was something I struggled with for the [Free IP Geolocation API](https://freegeoip.app/).
- I switched from using the built in `fetch()` method for HTTP requests to `axios` because `axios` was less picky about the setup.

### Useful resources

- [A Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS: Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Fun with Viewport Units](https://css-tricks.com/fun-viewport-units/)
- [How to Scale SVG](https://css-tricks.com/scale-svg/)
- [SVG Attribute reference &gt; viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)
- [How to make a background blur in CSS with one line of code](https://blog.prototypr.io/how-to-make-a-background-blur-in-css-with-one-line-of-code-e446c7236e60)
- [How to Use CSS Grid for Sticky Headers and Footers](https://css-tricks.com/how-to-use-css-grid-for-sticky-headers-and-footers/)

## Author

- Website - [www.richardcyrus.com](https://www.richardcyrus.com)
- Frontend Mentor - [@richarcyrus](https://www.frontendmentor.io/profile/richarcyrus)
