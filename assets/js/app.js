// global axios, luxon

;(function (axios, luxon) {
  'use strict'

  // Make date and time use simpler.
  const DateTime = luxon.DateTime

  // API services URLs
  const apiKey = 'at_akBBhLLm3TteRYnLtJo9EGI0kskCx'
  const clientIPAddressUrl = 'https://api64.ipify.org/?format=json'
  const geoInfoBaseUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`
  const worldTimeApiUrl = 'https://worldtimeapi.org/api/ip'

  const quotableApiUrl =
    'https://api.quotable.io/random?tags=technology|famous-quotes'

  // Buttons for click handlers
  const refreshButton = document.querySelector('.refresh')
  const showDetailsButton = document.querySelector('.disclosure')

  refreshButton.addEventListener('click', getRandomQuote)

  showDetailsButton.addEventListener('click', function () {
    const body = document.querySelector('#body')
    const detailsToggleTextEl = document.querySelector('.disclosure-text')

    if (body.classList.contains('show-details')) {
      body.classList.remove('show-details')
      detailsToggleTextEl.textContent = 'more'
    } else {
      body.classList.add('show-details')
      detailsToggleTextEl.textContent = 'less'
    }
  })

  /**
   * Fetch data from a URL with retries.
   *
   * @param   {String}  url       the URL to fetch data from.
   * @param   {Number}  retries   the number of retries to attempt.
   * @returns {Object}            the response data.
   */
  async function fetchWithRetry(url, retries = 3) {
    let attempt = 0

    while( attempt < retries) {
      try {
        return await axios.get(url)
      } catch (error) {
        attempt++
        if(attempt === retries) {
          console.error(`Retries exceeded with error: `, error)
          // throw error;
        }
      }
    }
  }

  /**
   * Update the body class list and the greeting based on daytime or nighttime.
   *
   * @param   {String}  timePeriod  the class name to apply to the body tag.
   * @param   {String}  greeting    the greeting to display for the user.
   */
  function setDayOrNight(timePeriod, greeting) {
    const body = document.querySelector('#body')
    const greetingTextEl = document.querySelector('#greeting')

    const timePeriodClasses = ['nighttime', 'daytime']

    greetingTextEl.textContent = greeting
    body.classList.remove(...timePeriodClasses)
    body.classList.add(timePeriod)
  }

  function updateQuote(quote, author) {
    const quoteEl = document.querySelector('#quote')
    const quoteAuthorEl = document.querySelector('.quote-author')

    quoteEl.textContent = quote
    quoteAuthorEl.textContent = author
  }

  function updateLocation(city, country, error) {
    const cityNameTextEl = document.querySelector('#city-name')
    const countryTextEl = document.querySelector('#country')

    if (error) {
      cityNameTextEl.textContent =
        'Error getting location. Ad Blockers may prevent the application from working correctly'
    } else {
      cityNameTextEl.textContent = city
      countryTextEl.textContent = country
    }
  }

  function updateTimeData(
    abbreviation,
    timezone,
    dayOfWeek,
    dayOfYear,
    weekNumber,
    time
  ) {
    // Main Panel areas to update.
    const clockEl = document.querySelector('#clock-display')
    const shortTZEl = document.querySelector('#short-timezone')

    // Details Panel areas to update.
    const timezoneNameEl = document.querySelector('#timezone-name')
    const dayOfYearEl = document.querySelector('#day-of-year')
    const dayOfWeekEl = document.querySelector('#day-of-week')
    const weekNumberEl = document.querySelector('#week-number')

    shortTZEl.textContent = abbreviation
    timezoneNameEl.textContent = timezone
    dayOfWeekEl.textContent = dayOfWeek
    dayOfYearEl.textContent = dayOfYear
    weekNumberEl.textContent = weekNumber
    clockEl.textContent = time
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
        const { data } = response
        updateQuote(data.content, data.author)
      })
      .catch((err) => {
        console.error(
          `There was a problem retrieving data from ${quotableApiUrl}:`,
          err
        )
      })
  }

  /**
   * Get location information from the IPIFY Geolocation API.
   */
  function getLocation(clientIP) {
    const geoUrl = `${geoInfoBaseUrl}&ipAddress=${clientIP}`
    axios
      .get(geoUrl)
      .then((response) => {
        const { data } = response
        updateLocation(data.location.city, data.location.country)
      })
      .catch((err) => {
        updateLocation(null, null, true)
        console.error(
          `There was a problem retrieving data from ${clientIPAddressUrl}:`,
          err
        )
      })
  }

  /**
   * Get the main time data for the default view as well as the information
   * for the detail view.
   *
   * Note: This call will be slow if you have an ad-blocker enabled.
   */
  function getTimeData() {
    fetchWithRetry(worldTimeApiUrl)
      .then((response) => {
        const { data } = response

        const dt = DateTime.fromISO(data.datetime)

        updateTimeData(
          data.abbreviation,
          data.timezone,
          data.day_of_week,
          data.day_of_year,
          data.week_number,
          dt.toLocaleString(DateTime.TIME_24_SIMPLE)
        )

        if (dt.hour >= 0 && dt.hour < 5) {
          setDayOrNight('nighttime', 'Good evening')
        } else if (dt.hour >= 5 && dt.hour < 12) {
          setDayOrNight('daytime', 'Good morning')
        } else if (dt.hour >= 12 && dt.hour < 18) {
          setDayOrNight('daytime', 'Good afternoon')
        } else if (dt.hour >= 18) {
          setDayOrNight('nighttime', 'Good evening')
        }
      })
      .catch((err) =>
        console.error(
          `There was a problem retrieving data from ${worldTimeApiUrl}:`,
          err
        )
      )
  }

  /**
   * Get the client's IP address and use that to get location information.button
   */
  function getClientIPAddress() {
    axios
      .get(clientIPAddressUrl)
      .then((response) => response.data.ip)
      .then((clientIP) => {
        return getLocation(clientIP)
      })
  }

  getClientIPAddress()
  getTimeData()
  getRandomQuote()
})(axios, luxon)
