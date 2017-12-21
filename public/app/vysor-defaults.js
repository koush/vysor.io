var vysorDefaultSettings =
// copy everything below into the settings editor. must be valid JSON.
{
  "mousedown": {
    "1": "KEYCODE_HOME",
    "2": "KEYCODE_BACK"
  },
  "keydown": {
    "ArrowDown": "KEYCODE_DPAD_DOWN",
    "ArrowLeft": "KEYCODE_DPAD_LEFT",
    "ArrowRight": "KEYCODE_DPAD_RIGHT",
    "ArrowUp": "KEYCODE_DPAD_UP",
    "Backspace": "KEYCODE_DEL",
    "Delete": "KEYCODE_FORWARD_DEL",
    "Enter": "KEYCODE_ENTER",
    "Escape": "KEYCODE_BACK",
    "F1": "KEYCODE_MENU",
    "F2": "VYSOR_SHOW_TITLE_BAR",
    "Home": "KEYCODE_HOME",
    "Tab": {
      "keyevent": "KEYCODE_TAB",
      "shiftKey": true
    }
  },
  "navigationBar": {
    "style": "background-color: #4696e5",
    "buttons": [
      {
        "class": "fa-chevron-left",
        "event": "KEYCODE_BACK",
        "title": "Back"
      },
      {
        "class": "fa-circle-o",
        "event": "KEYCODE_HOME",
        "title": "Home"
      },
      {
        "class": "fa-navicon",
        "event": "KEYCODE_APP_SWITCH",
        "title": "Recent Tasks"
      }
    ]
  },
  "titleBar": {
    "style": "background-color: #4696e5",
    "buttonGroups": [
      [
        {
          "class": "fa-gear",
          "title": "Open Device Settings",
          "event": "VYSOR_OPEN_DEVICE_SETTINGS"
        },
        {
          "class": "fa-video-camera",
          "title": "Record Screen",
          "event": "VYSOR_RECORD_SCREEN"
        },
        {
          "class": "fa-camera",
          "title": "Take Screenshot",
          "event": "VYSOR_SCREENSHOT"
        }
      ],
      [
        {
          "class": "fa-volume-down",
          "title": "Volume Down",
          "event": "KEYCODE_VOLUME_DOWN"
        },
        {
          "class": "fa-volume-up",
          "title": "Volume Up",
          "event": "KEYCODE_VOLUME_UP"
        }
      ],
      [
        {
          "class": "fa-repeat",
          "title": "Rotate Screen",
          "event": "VYSOR_ROTATE_SCREEN"
        },
        {
          "class": "fa-power-off",
          "title": "Toggle Screen On/Off",
          "event": "KEYCODE_POWER"
        }
      ]
    ]
  },
  "devices": {
    "example-device-serial": {
      "keydown": {
        "F3": "KEYCODE_BACK"
      },
      "navigationBar": {
        "buttons": [
          {
            "class": "fa-circle-o",
            "event": "KEYCODE_HOME",
            "title": "Home"
          }
        ]
      }
    }
  }
}
