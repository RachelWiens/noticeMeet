/**
 * Property getters and setters. 
 * 
 * Make sure to create and fill out the following script parameters in your project's settings:
 *   - MINUTES_FOR_UPCOMING_EVENTS: Controls how far forward your event list on the homepage shows. Doesn't impact polling frequency or notification behaviour. 
 *   - APP_TITLE: The title of the application. Used as the name of the browser tab.
 *   - FAVICON_URL: The URL of the favicon image.
 * 
 * Note: To get the URL of an image hosted on Google Drive, see https://www.labnol.org/google-drive-image-hosting-220515#alternate-approach.
 */

/**
 * Get the URL for the Google Apps Script running as a WebApp.
 * 
 * @returns {String}
 */
function getScriptUrl() {
 return ScriptApp.getService().getUrl();
}

/**
 * Get the minute-sized width of window for which to fetch upcoming events, starting from now. 
 * 
 * @returns {Number}
 */
function getMinutesForUpcomingEvents() {
  var minutes = PropertiesService.getScriptProperties().getProperty("MINUTES_FOR_UPCOMING_EVENTS");
  return Number(minutes);
}

/**
 * Get how many minutes before the event starts we should notify the user. 
 * 
 * @returns {Number}
 */
function getMinutesToNotify() {
  const defaultMinutes = 3;
  var userConfiguredMinutes = PropertiesService.getUserProperties().getProperty("MINUTES_BEFORE_TO_NOTIFY");
  if (userConfiguredMinutes === null) {
    return defaultMinutes;
  } else {
    return Number(userConfiguredMinutes);
  }
}

/**
 * Get the title of the web app.
 * 
 * @returns {String}
 */
function getAppTitle() {
  return PropertiesService.getScriptProperties().getProperty("APP_TITLE");
}

/**
 * Get the favicon URL.
 * 
 * @returns {String}
 */
function getFaviconUrl() {
  return PropertiesService.getScriptProperties().getProperty("FAVICON_URL");
}

/**
 * Set how many minutes before the event starts we should notify this user.
 * 
 * @param {Number} - minutes
 */
function setMinutesToNotify(minutes) {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('MINUTES_BEFORE_TO_NOTIFY', minutes);
}
