# Notice Meet, Senpai!

*Don’t be late!*

Notice Meet is a web app that makes a more visually obvious notification whenever you have meetings coming up in Google Calendar. Its intent is to create a more eye-catching notification than the default desktop notifications, i.e. something that grabs your attention even if you're looking at a different screen.

## How To Use

### One-time Set-up
1. Copy-paste the code into a matching file hierarchy in [Google Apps Script](https://www.google.com/script/start/).
2. Configure the script parameters in the project settings.
3. Deploy the web app via the Deploy button.

### Regular Use
1. Open the deployed web app's URL in your web browser.
2. If requested, grant the app read permission for your calendar.
3. Leave the tab open.

As long as the tab is left open, a new tab should pop open and grab your browser's focus ~3 minutes before each of your meetings. If you regularly work in full-screen native applications (e.g. IntelliJ), having a 2nd screen with Chrome open on it is recommended. The notification will open a new tab that steals focus from whatever else is open on your web browser but it can’t steal focus from entirely separate programs.

## Notes

- The app fetches new events hourly, starting from the page’s load. If you want to be notified for an event someone made less than 1 hour ago, please refresh the page.
- Currently the notification window is ~3min before. The intent is to make both that and the notification image and background colour user configurable in a future update.
- Not entirely sure how this workflow interacts with Chrome's memory management yet, so there's risk it might stop notifying you if Chrome puts the tab to sleep.
- This project is open to suggestions and contributions!

## FAQ

*Q. Can you play a sound when the notification loads?*

A. Unfortunately no. [Chrome disables playing sounds](https://developer.chrome.com/blog/autoplay/#audiovideo_elements) until the user interacts with the page, and this applies when tabs open or refresh, even if the user interacted with the page in the past.

*Q. The notification page burns my eyes!!! Can you change it?*

A. The notification being eye-catchingly ugly is generally working as intended. The notification also needs to look different from any other program/page you are likely to be working on. You are welcome to submit pull requests suggesting improvements the UI and/or edit the look of the page on your own script to suit your preferences.

*Q. Does this work with calendars other than Google Calendar?*

A. No and I have no plans to implement support for other calendar apps, but I welcome pull requests.

*Q. I have multiple Google calendars - which calendar does it use?*

A. It uses whichever calendar is considered the primary calendar for the account you grant the web app permissions for.
