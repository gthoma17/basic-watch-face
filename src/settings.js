/*
 * Settings UI for Basic Watch Face
 * Allows switching between 12-hour and 24-hour time formats
 */

import {} from "piu/MC";
import Preference from "preference";

const settingsStyle = new Style({
  font: "24px Open Sans",
  color: "black",
  horizontal: "left",
  vertical: "middle"
});

const titleStyle = new Style({
  font: "bold 28px Open Sans",
  color: "black",
  horizontal: "center",
  vertical: "middle"
});

const SettingsApplication = Application.template($ => ({
  skin: new Skin({ fill: "white" }),
  contents: [
    Column($, {
      top: 0, bottom: 0, left: 0, right: 0,
      contents: [
        // Title
        Label($, {
          top: 20, height: 40,
          string: "Watch Face Settings",
          style: titleStyle
        }),
        
        // Spacer
        Content($, { height: 20 }),
        
        // Toggle for 12/24 hour format
        Container($, {
          left: 20, right: 20, height: 60,
          active: true,
          skin: new Skin({ 
            fill: ["transparent", "#E0E0E0"],
            stroke: "black",
            borders: { left: 1, right: 1, top: 1, bottom: 1 }
          }),
          contents: [
            Row($, {
              left: 10, right: 10, top: 0, bottom: 0,
              contents: [
                Label($, {
                  left: 0, right: 0,
                  string: "Use 24-Hour Format",
                  style: settingsStyle
                }),
                Label($, {
                  anchor: "TOGGLE_LABEL",
                  width: 60,
                  string: "OFF",
                  style: new Style({
                    font: "20px Open Sans",
                    color: "blue",
                    horizontal: "right",
                    vertical: "middle"
                  })
                })
              ]
            })
          ],
          Behavior: class extends Behavior {
            onCreate(container, data) {
              this.data = data;
              this.updateToggle();
            }
            
            onTouchEnded(container) {
              // Toggle the setting
              const current = Preference.get("settings", "use24HourFormat") === "true";
              Preference.set("settings", "use24HourFormat", current ? "false" : "true");
              this.updateToggle();
            }
            
            updateToggle() {
              const use24Hour = Preference.get("settings", "use24HourFormat") === "true";
              const label = this.data["TOGGLE_LABEL"];
              if (label) {
                label.string = use24Hour ? "ON" : "OFF";
              }
            }
          }
        }),
        
        // Instructions
        Content($, { height: 20 }),
        Text($, {
          left: 20, right: 20,
          string: "Toggle to switch between 12-hour and 24-hour time display formats.",
          style: new Style({
            font: "16px Open Sans",
            color: "#666666",
            horizontal: "left"
          })
        })
      ]
    })
  ]
}));

export default function() {
  return new SettingsApplication({}, {
    displayListLength: 2048,
    touchCount: 1
  });
}
