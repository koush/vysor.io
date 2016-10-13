var vysorDefaultSettings =
// copy everything below into the settings editor. must be valid JSON.
{
  "keydown": {
    "ArrowDown": "KEYCODE_DOWN",
    "ArrowLeft": "KEYCODE_LEFT",
    "ArrowRight": "KEYCODE_RIGHT",
    "ArrowUp": "KEYCODE_UP",
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
    "buttons": [
      {
        "class": "fa fa-lg fa-chevron-left",
        "event": "KEYCODE_BACK",
        "title": "Back"
      },
      {
        "class": "fa fa-lg fa-circle-o",
        "event": "KEYCODE_HOME",
        "title": "Home"
      },
      {
        "class": "fa fa-lg fa-navicon",
        "event": "KEYCODE_APP_SWITCH",
        "title": "Recent Tasks"
      }
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
            "class": "fa fa-lg fa-circle-o",
            "event": "KEYCODE_HOME",
            "title": "Home"
          }
        ]
      }
    }
  }
}
