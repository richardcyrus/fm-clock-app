(function () {
  "use strict";

  // Make date and time use simpler.
  const DateTime = luxon.DateTime;

  // API services URLs
  const freegeoipUrl = "https://freegeoip.app/json/";
  const worldTimeApiUrl = "https://worldtimeapi.org/api/ip";
  const quotableApiUrl =
    "https://api.quotable.io/random?tags=technology|famous-quotes";

  // Buttons for click handlers
  const refreshButton = document.querySelector(".refresh");
  const showDetailsButton = document.querySelector(".disclosure");

  const body = document.querySelector("#body");

  // Main Panel areas to update.
  const quoteEl = document.querySelector("#quote");
  const quoteAuthorEl = document.querySelector(".quote-author");
  const greetingTextEl = document.querySelector("#greeting");
  const clockEl = document.querySelector("#clock-display");
  const shortTZEl = document.querySelector("#short-timezone");
  const cityNameTextEl = document.querySelector("#city-name");
  const countryTextEl = document.querySelector("#country");
  const detailsToggleTextEl = document.querySelector(".disclosure-text");

  // Details Panel areas to update.
  const timezoneNameEl = document.querySelector("#timezone-name");
  const dayOfYearEl = document.querySelector("#day-of-year");
  const dayOfWeekEl = document.querySelector("#day-of-week");
  const weekNumberEl = document.querySelector("#week-number");

  refreshButton.addEventListener("click", getRandomQuote);

  showDetailsButton.addEventListener("click", function () {
    if (body.classList.contains("show-details")) {
      body.classList.remove("show-details");
      detailsToggleTextEl.textContent = "more";
    } else {
      body.classList.add("show-details");
      detailsToggleTextEl.textContent = "less";
    }
  });

  /**
   * Update the body class list and the greeting based on daytime or nighttime.
   *
   * @param   {String}  timePeriod  the class name to apply to the body tag.
   * @param   {String}  greeting    the greeting to display for the user.
   */
  function setDayOrNight(timePeriod, greeting) {
    const timePeriodClasses = ["nighttime", "daytime"];

    greetingTextEl.textContent = greeting;
    body.classList.remove(...timePeriodClasses);
    body.classList.add(timePeriod);
  }

  /**
   * Get a quote from the Quotable API and display it on the page.
   *
   * Called when the page loads and when the user clicks the refresh icon.
   */
  function getRandomQuote() {
    axios
      .get(quotableApiUrl)
      .then((response) => {
        const data = response.data;
        quoteEl.textContent = data.content;
        quoteAuthorEl.textContent = data.author;
      })
      .catch((err) => {
        console.error(
          `There was a problem retrieving data from ${quotableApiUrl}:`,
          err
        );
      });
  }

  /**
   * Get location information from the Free IP Geolocation API.
   *
   * Note: this call will fail if you have an ad-blocker enabled.
   */
  function getLocation() {
    axios
      .get(freegeoipUrl)
      .then((response) => {
        const data = response.data;

        cityNameTextEl.textContent = data.city;
        countryTextEl.textContent = data.country_code;
      })
      .catch((err) =>
        console.error(
          `There was a problem retrieving data from ${freegeoipUrl}:`,
          err
        )
      );
  }

  /**
   * Get the main time data for the default view as well as the information
   * for the detail view.
   *
   * Note: This call will be slow if you have an ad-blocker enabled.
   */
  function getTimeData() {
    axios
      .get(worldTimeApiUrl)
      .then((response) => {
        const data = response.data;

        shortTZEl.textContent = data.abbreviation;
        timezoneNameEl.textContent = data.timezone;
        dayOfWeekEl.textContent = data.day_of_week;
        dayOfYearEl.textContent = data.day_of_year;
        weekNumberEl.textContent = data.week_number;

        const dt = DateTime.fromISO(data.datetime);
        clockEl.textContent = dt.toLocaleString(DateTime.TIME_24_SIMPLE);

        if (dt.hour >= 5 && dt.hour < 12) {
          setDayOrNight("daytime", "Good morning");
        } else if (dt.hour >= 12 && dt.hour < 18) {
          setDayOrNight("daytime", "Good afternoon");
        } else if (dt.hour >= 18) {
          setDayOrNight("nighttime", "Good evening");
        }
      })
      .catch((err) =>
        console.error(
          `There was a problem retrieving data from ${worldTimeApiUrl}:`,
          err
        )
      );
  }

  getRandomQuote();
  getLocation();
  getTimeData();
})();
