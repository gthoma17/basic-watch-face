/*
 * Basic Watch Face
 * A simple watch face that displays the current time in large font
 * with configurable 12hr/24hr format
 */

import {} from "piu/MC";
import Timeline from "piu/Timeline";
import Preference from "preference";

// Constants
const SCREEN_WIDTH = 240;
const SCREEN_HEIGHT = 240;
const WHITE = "white";
const BLACK = "black";
const TIME_FONT = "bold 48px Open Sans";

// Settings management
class Settings {
  static get use24HourFormat() {
    return Preference.get("settings", "use24HourFormat") === "true";
  }
  
  static set use24HourFormat(value) {
    Preference.set("settings", "use24HourFormat", value ? "true" : "false");
  }
}

// Styles
const timeStyle = new Style({
  font: TIME_FONT,
  color: BLACK,
  horizontal: "center",
  vertical: "middle"
});

const containerStyle = new Style({
  color: WHITE
});

// Time formatting
function formatTime(date, use24Hour) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  if (!use24Hour) {
    hours = hours % 12;
    if (hours === 0) hours = 12;
  }
  
  const hoursStr = (hours < 10 && use24Hour) ? `0${hours}` : `${hours}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
  return `${hoursStr}:${minutesStr}`;
}

// Watch face application
const WatchFaceApplication = Application.template($ => ({
  skin: new Skin({ fill: WHITE }),
  contents: [
    Container($, {
      top: 0, bottom: 0, left: 0, right: 0,
      style: containerStyle,
      contents: [
        Label($, {
          anchor: "TIME",
          style: timeStyle,
          string: ""
        })
      ],
      Behavior: class extends Behavior {
        onCreate(container, data) {
          this.data = data;
          this.updateTime();
          
          // Update every minute
          container.interval = 60000;
          container.start();
        }
        
        onTimeChanged(container) {
          this.updateTime();
        }
        
        onDisplaying(container) {
          this.updateTime();
        }
        
        updateTime() {
          const now = new Date();
          const use24Hour = Settings.use24HourFormat;
          const timeString = formatTime(now, use24Hour);
          
          const timeLabel = this.data["TIME"];
          if (timeLabel) {
            timeLabel.string = timeString;
          }
        }
      }
    })
  ]
}));

// Export the application
export default function() {
  return new WatchFaceApplication({}, {
    displayListLength: 2048,
    touchCount: 1
  });
}
