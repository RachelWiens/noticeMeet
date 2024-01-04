# Notice Meet, Senpai!

*Don’t be late!*

Notice Meet is a web app that makes a more visually obvious notification whenever you have meetings coming up in Google Calendar. Its intent is to create a more eye-catching notification than the default desktop notifications, i.e. something that grabs your attention even if you're looking at a different screen.

## How To Use

### One-time Set-up
1. Copy-paste the code from the `src` folder into files with matching names in [Google Apps Script](https://www.google.com/script/start/).
2. Configure the script parameters in the project settings. The list of parameters you need to create is listed at the top of the `src/code.gs` file.
3. Deploy the web app via the Deploy button.
4. Open the deployed web app's URL in your web browser. If requested, grant the app read permission for your calendar.

### Everyday Use
1. Open the deployed web app's URL in your web browser.
2. Leave the tab open for as long as you want to receive notifications.

As long as the tab is left open, a new tab should pop open and grab your browser's focus before each of your meetings. 

## Notes

- The app fetches new events hourly, starting from the page’s load. If you want to be notified for an event someone made less than 1 hour ago, please refresh the page. If you want to change the polling period, edit the `pollIntervalInMinutes` constant in `src/home.html`.
- Not entirely sure how this workflow interacts with Chrome's memory management yet, so there's risk it might stop notifying you if Chrome puts the tab to sleep.
- This project is open to suggestions and contributions!

## FAQ

> Can you play a sound when the notification loads?

Unfortunately no. [Chrome disables playing sounds](https://developer.chrome.com/blog/autoplay/#audiovideo_elements) until the user interacts with the page, and this applies when tabs open or refresh, even if the user interacted with the page in the past.

> The notification page burns my eyes!!! Can you change it?

The notification being eye-catchingly ugly is generally working as intended. The notification also needs to look different from any other program/page you are likely to be working on. You are welcome to submit pull requests suggesting improvements the UI and/or edit the look of the page on your own script to suit your preferences.

> Does this work with calendars other than Google Calendar?

No, but I welcome pull requests.

> I have multiple Google calendars - which calendar does it use?

It uses whichever calendar is considered the primary calendar for the account you grant the web app permissions for.
