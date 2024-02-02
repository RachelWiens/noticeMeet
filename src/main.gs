/**
 * Further improvements:
 *  - Display times in UI in the viewer's actual locale rather than the script owner's (does the LocaleToString run server-side?)
 */

/**
 * Pull out the event fields we want to present to the user.
 */
function formatEvent(event) {
  return {
     "time" : event.getStartTime().getTime(), // Convert to millis since it's illegal to pass Date objects to the client.
     "title" : event.getTitle()
  };
}

/**
 * Returns whether any of the startTimes in the list are within some number of minutes from the current time.
 * The number of minutes is configurable.
 * 
 * @param {Integer[]} startTimes - array of times to check, in millis. It is illegal to pass Date objects directly.
 * @returns {Boolean}
 */
function isAnyTimeWithinNotificationPeriod(startTimes) {
  const now = Date.now();
  const minutesBeforeToNotify = getMinutesToNotify();
  
  for (i in startTimes) {
    // An event is within our notification period if its start time is within a specific number of minutes, backwards or forwards, of now.
    const start = startTimes[i]
    //Logger.log("Time diff between " + start + " and now " + now + " is " + Math.abs(start - now) + " ms." );
    if (Math.abs(start - now) < (1000 * 60 * minutesBeforeToNotify) ) {
      return true;
    }
  }
  return false;
}

/**
 * Get a limited number of events from the user's default calendar, which they have not declined or silenced, between start and end times.
 * 
 *  @param {Date} start - start of window to fetch events for, inclusive.
 *  @param {Date} end - end of window to fetch events for, exclusive.
 *  @returns {CalendarEvent[]}
 */
function getEventsBetween(start, end) {
  const allEvents = CalendarApp.getDefaultCalendar().getEvents(start,  end, {max: 20});
  const silentEventTitles = getSilentEvents();
  // The statusFilters parameter on the API call doesn't seem to filter results according to the current user's status, 
  // so filter out declined events manually.
  const interestedEvents = [];
  for (i in allEvents) {
    const e = allEvents[i];
    if (e.getMyStatus() != CalendarApp.GuestStatus.NO && !silentEventTitles.includes(e.getTitle())) {
      interestedEvents.push(e);
    }
  }
  return interestedEvents;
}

/**
 * Get the events from the user's calendar between now and minutesFromNow.
 * 
 * @param {int} minutesFromNow - the width of window for which to fetch events, starting from now.
 *    If it isn't provided, use the configurable property instead.
 * @returns {CalendarEvent[]}
 */
function getUpcomingEvents(minutesFromNow) {
  if (minutesFromNow === undefined) {
    minutesFromNow = getMinutesForUpcomingEvents();
  }

  const now = new Date();
  const endOfNotificationPeriod = new Date(now.getTime() + (minutesFromNow * 60 * 1000));
  return getEventsBetween(now, endOfNotificationPeriod);
}

/**
 * Helper function that returns past and future events between now plus and minus the configurable notification period.
 * Events are formatted into strings to be easily displayed to users.
 * 
 * @returns list of formatted strings, one per event
 */
function getFormattedEventsInNotificationPeriod() {
  const now = Date.now();
  const minutesBeforeToNotify = getMinutesToNotify() + 1; // Add 1 minute since the getEventsBetween end time is exclusive.
  const start = new Date(now - (minutesBeforeToNotify * 60 * 1000));
  const end = new Date(now + (minutesBeforeToNotify * 60 * 1000));
  const eventsInWIndow = getEventsBetween(start, end);
  return eventsInWIndow.map(formatEvent);
}

/**
 * Get the start times (in ms since the epoch) for events from the user's owned calendars between now and minutesFromNow.
 * 
 * @param {int} minutesFromNow - the width of window for which to fetch events, starting from now.
 *    If it isn't provided, use the configurable property instead.
 * @returns {Integer[]}
 */
function getUpcomingEventsStartTimes(minutesFromNow) {
  const upcomingEvents = getUpcomingEvents(minutesFromNow);
  for (i in upcomingEvents) {
    Logger.log("Upcoming event:" + upcomingEvents[i].getTitle());
  }
  return upcomingEvents.map((e) => e.getStartTime().getTime());
}

/**
 * Get a number of upcoming events over
 * 
 *  @param {int} minutesFromNow the width of window for which to fetch events, starting from now.
 *  @returns array of formatted fields, one element per event.
 */
function getFormattedUpcomingEvents(minutesFromNow) {
  const upcomingEvents = getUpcomingEvents(minutesFromNow);
  return upcomingEvents.map(formatEvent);
}

/**
 * Get "home page", or the notification page.
 * Expects a 'notification' parameter in querystring.
 *
 * @param {CalendarEvent} e - Event passed to doGet, with querystring
 * @returns {String/html} Html to be served
 */
function doGet(e) {
  const faviconUrl = getFaviconUrl();
  const title = getAppTitle();
  if (!e.parameter.notification) {
    // No specific page requested, show the home page
    return HtmlService.createTemplateFromFile('home').evaluate().setTitle(title).setFaviconUrl(faviconUrl);
  }
  // else, show the notification page
  return HtmlService.createTemplateFromFile('notification').evaluate().setTitle(title).setFaviconUrl(faviconUrl);
}
