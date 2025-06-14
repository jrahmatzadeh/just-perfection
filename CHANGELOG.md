# Changelog

All notable changes to this project will be documented in this file.

We go to the next version after each release on the
[GNOME Shell Extensions website](https://extensions.gnome.org/).

## [Unreleased]

### Added

- Window Menu Visibility.

### Fixed

- Avoid showing support notifications immediately after login.
- Startup freeze on NixOS.
- The page icon in preferences window for GNOME Shell 48.

## [34.0] - 2025-02-02

### Removed

- The monthly notification support.

## [33.0] - 2025-02-02

### Fixed

- The monthly notification support calculation.
- German Translation by [@uwe-ss](https://gitlab.gnome.org/uwe-ss).

## [32.0] - 2025-02-01

### Added

- Airplane Mode Toggle Button Visibility in Quick Settings.
- GNOME Shell 48 Support.
- More Crypto Donations (XRP, Solana, Cardano, BNB, Stellar, USDC, LTC, Shiba Inu and LBRY).
- Support Notifier.

### Fixed

- Looking Glass `_resize()` issue.

## [31.0] - 2025-01-06

### Added

- Accent Color for Icons.
- Crypto Support to the Preferences Window.
- Invert Calendar Column Items.
- Night Light Toggle Button Visibility in Quick Settings.
- Workspace Switcher Click Always Goes to The Main View.
- Ukrainian Translation by [@vovkiv](https://gitlab.gnome.org/vovkiv).

### Fixed

- Search margin when using high display scale factor and panel in overview feature.
- Slowest animation.
- The dash app running indicator visibility (GNOME Shell 46 and 47).
- The Looking Glass Position Using Inspector in Overview.
- The Workspaces Shadow in App Grid When the Search is Disabled.

## [30.0] - 2024-07-31

### Added

- GNOME Shell 47 Support.

## [29.0] - 2024-07-06

### Added

- Dark Mode Toggle Button Visibility in Quick Settings.
- Maximum Displayed Search Results feature (GNOME Shell 45 and higher).
- Gresources compiled file for the preferences window to load faster.

### Fixed

- Alt-Tab Switcher list Item Background Color for Shell Theme Override (GNOME Shell 46).
- Hidden panel timeout priority on Wayland.
- Panel Menu not Showing Up On Bottom Panel When the Height is Larger than the Screen Height.
- The dash app running indicator visibility.
- Workspace Popup visibility CPU usage.
- Japanese Translation by [@gnuey56](https://gitlab.gnome.org/gnuey56).

### Changed

- The clock menu position widget to `AdwSpinRow`.
- The panel height maximum size to 64.

## [28.0 Lear] - 2024-03-06

### Added

- Buy Me a Coffee donation link.
- GNOME Shell 46 Support.
- Option to maximize windows on creation by [@droserasprout](https://gitlab.gnome.org/droserasprout).

### Fixed

- The world clock visibility coming back after reboot or install change.

### Removed

- Window Picker Shell Theme Override.
- Search Shell Theme Override.
- Workspace Animation Shell Theme Override.
- Dash Background Shell Theme Override.

## [27.0 Durer] - 2023-09-14

### Changed

- The world clocks visibility from CSS to JS.

### Added

- "Almost none" option to animation speed feature (GNOME Shell 45).
- GNOME Shell 45 Support.
- Japanese Translation by [@gnuey56](https://gitlab.gnome.org/gnuey56).

### Removed

- Activities button icon feature (GNOME Shell 45).
- App menu indicator (GNOME Shell 45).

## [26.0 Rosa] - 2023-08-07

### Fixed

- Remove not defined.

## [25.0 Rosa] - 2023-08-07

### Changed

- The behavior of the panel is shown only in the overview.
  Rather than sliding in from the top, it is now rendered behind the workspaces
  by [Schneegans](https://gitlab.gnome.org/Schneegans).

### Fixed

- a11y error in GNOME Shell mobile.
- Activities button error in GNOME Shell mobile.
- Marked as an urgent signal for window demand attention focus feature.
- Panel flickering when its position is at the bottom.
- `.set_icon_size` is not a function error (Date Menu).
- Unwanted padding on the disabled power icon.
- Unwanted shadow for workspace in the app grid.

### Added

- Dash app running visibility.
- Disable the overlay key.
- EGO donations.
- Workspace peek (GNOME Shell 42 and higher).

### Removed

- GNOME Shell support (3.36, 3.38, 40 and 41 no longer getting new features).

## [24.0 Hals] - 2023-03-01

### Changed

- Window preview close button for super minimal profile (to disabled).

### Added

- GNOME Shell 44 support.
- Transparent dash background for shell theme override (GNOME Shell 4x only).

## [23.0 Goya] - 2023-02-10

### Changed

- Clock menu offset maximum to 20.
- Fastest animation speed (twice as fast as before).

### Fixed

- App menu label visibility compatibility issue with open whether extension.
- Hidden workspace switcher padding in overview.
- Keep the clock menu position when another widget is added to the panel.
- Looking Glass API conflicts with the "Dash to Panel" extension.
- Looking Glass error when primary monitor doesn't exist.
- Window preview gap when window picker close button is disabled.
- Workspace boxes top margin in the app grid when the search entry is disabled.
- Italian translation by [@svityboy](https://gitlab.gnome.org/svityboy).

### Added

- More dash icon size (16px, 22px, 24px, 40px and 56px).
- Overview spacing size.
- Screen recording indicator visibility.
- Screen sharing indicator visibility.
- Switcher popup delay by [@koplo199](https://gitlab.gnome.org/koplo199).

## [22.0 Millet] - 2022-09-10

### Fixed

- Dash app button visibility height.
- Looking glass error after unlock.

### Added

- App menu label visibility.
- GNOME Shell 43 support.
- Quick settings menu visibility.

### Removed

- Aggregate menu for GNOME Shell 43 and higher.

## [21.0 Reynolds] - 2022-08-06

### Changed

- Prefs compatibility layer checking to GTK and Adw instead of GNOME Shell version.

### Fixed

- Application button visibility in Ubuntu 22.04.
- Prefs window size for scaled displays.
- Prefs window size for small displays in GNOME Shell 42.
- Racy prefs window size.
- Window caption going out of display area when dash is disabled in GNOME Shell 40 and higher.
- Russian translation by [@librusekus35790](https://gitlab.gnome.org/librusekus35790).
- Spanish translation by [@Luci](https://gitlab.gnome.org/Luci).

### Added

- Alt-Tab window preview icon size.
- Alt-Tab window preview size.
- Alt-Tab icon size.
- Dash separator visibility.
- Looking glass size by [@AdvendraDeswanta](https://gitlab.gnome.org/AdvendraDeswanta).
- OSD position.
- Take the screenshot button in the window menu visibility.

### Removed

- Gesture API for GNOME Shell 40 and higher.
- List box separators for GNOME Shell 40 and 41 (EOS).
- Prefs intro.

## [20.0 Hayez] - 2022-04-01

### Fixed

- Dynamic workspaces getting disabled by workspace popup.
- Flickering panel after Unlock.
- Notification banner position on GNOME Shell 42.
- Window demands attention focus on GNOME Shell 42.
- French translation by [@GeoffreyCoulaud](https://gitlab.gnome.org/GeoffreyCoulaud).
- Italian translation by [@svityboy](https://gitlab.gnome.org/svityboy).

### Added

- Events visibility in the clock menu.
- Calendar visibility in the clock menu.
- Dutch translation by [@Vistaus](https://gitlab.gnome.org/Vistaus).

## [19.0 Ancher] - 2022-03-02

### Fixed

- Blurry search entry on GNOME Shell themes with "box-shadow".
- Prefs file chooser recursion.
- SecondaryMonitorDisplay error on GNOME Shell 42.
- Shell theme overrides OSD on GNOME Shell 42.
- Shell theme overrides the workspace switcher on GNOME Shell 42.
- Workspace popup visibility in GNOME Shell 42.

### Added

- Libadwaita for GNOME Shell 42 prefs.
- Panel icon size.
- Panel world clock visibility.
- Weather visibility.

## [18.0 Roslin] - 2022-02-12

### Fixed

- GNOME 3.x prefs error.

## [17.0 Roslin] - 2022-02-11

### Fixed

- Emitting panel show when panel is visible.
- Looking glass not showing up.
- Looking glass position on startup when panel is hidden.
- Prefs height going off the screen in small displays.
- Prefs lunching url freeze on Wayland.
- Prefs padding in GNOME Shell 42.
- Prefs UI Improvement by [@muqtxdir](https://gitlab.gnome.org/muqtxdir).
- Startup animation for hiding panel when panel is disabled.
- Type to search when text entry content is replaced with another content.
- Window goes under panel after unlock on Wayland.
- Window picker caption visibility issue on Pop Shell.
- Galician translation by [@frandieguez](https://gitlab.gnome.org/frandieguez).

### Added

- Bottom to notification banner position.

### Removed

- Panel corner size option for GNOME Shell 42.

## [16.0 Rembrandt] - 2021-11-15

### Fixed

- Animation jump when search entry is disabled and entering app grid.
- Clock menu revealing in lockscreen when the position is left or right.
- Startup status for Ubuntu.
- Workspace switcher visibility in GNOME Shell 41.

### Removed

- Hot corner for GNOME Shell 41.
- Hot corner library for all supported Shell versions.

### Added

- Double supper to app grid for GNOME Shell 40 and 41.
- Panel corner size when panel is disabled.
- Panel visibility in overview when panel is disabled.
- Prefs window intro.
- Profile selector to the prefs window.
- Ripple box.

## [15.0 Magnetized] - 2021-09-22

### Fixed

- unlock recursion error.

### Added

- Hot corner support for GNOME Shell 41.

## [14.0 Magnetized] - 2021-09-22

### Changed

- Repo folder structure to have better organization.

### Fixed

- Bottom panel position for multi monitors by [@harshadgavali](https://gitlab.gnome.org/harshadgavali).
- First swipe up in desktop startup status.
- Looking glass position on bottom panel.
- Maximized window gap on Wayland.
- Search entry animation for type to search when search entry is disabled.
- Search entry API to avoid conflicting with other extensions.
- Window picker caption border on disable.
- Window picker disapearing on wayland with shell theme override.
- Galician translation by [@frandieguez](https://gitlab.gnome.org/frandieguez).
- Spanish translation by [@DiegoIvanME](https://gitlab.gnome.org/DiegoIvanME).

### Removed

- Donation popover in prefs.
- Hot corner for GNOME Shell 41.

### Added

- GNOME Shell 41 support.
- Panel indicator padding size.
- Window picker close button visibility.

## [13.0 Ring] - 2021-08-10

### Changed

- Search button position in prefs window.

### Fixed

- Accessing dash in case the original dash has been removed by third party extensions.
- API.monitorGetInfo for "pMonitor is null" error.
- Dropdown align in preferences dialog.
- Startup status blocking shortcut keys.
- Unwanted window demands attention focus.
- Russian translation by [@librusekus35790](https://gitlab.gnome.org/librusekus35790).

### Removed

- Settings and Translation library and using ExtensionUtils instead.

### Added

- Panel button padding size.
- Panel height.
- Window picker caption visibility.
- Workspace background corner size in overview.
- Workspace wraparound (modified version of WorkspaceSwitcherWrapAround by [@war1025](https://github.com/war1025)).

## [12.0 Queen Red] - 2021-06-29

### Changed

- Lighter background color for switcher list (alt+tab) in override theme.
- Workspace switcher max size now maxed out to 30%.

### Fixed

- Combobox scroll issue on GTK4.
- Window demands attention focus notification popup.
- French translation by [@GeoffreyCoulaud](https://gitlab.gnome.org/GeoffreyCoulaud).
- Russian translation by [@librusekus35790](https://gitlab.gnome.org/librusekus35790).

### Added

- Always show workspace switcher on dynamic workspaces.
- More descriptions to the preferences dialog.
- Notification banner position.
- Startup status for GNOME Shell 40.
- Workspace animation background color for shell theme override.
- Workspaces visibility in app grid by [@fmuellner](https://gitlab.gnome.org/fmuellner).
- Chinese (Taiwan) translation by [@r0930514](https://gitlab.com/r0930514).

## [11.0 Whisper] - 2021-05-20

### Changed

- App gesture now only works on GNOME 3.36 and 3.38.
- Donation icon to GTK4 non-compatible icon sets.
- Shell theme override is now disabled by default.
- Workspace switcher size for GNOME Shell 40 is now maxed out to 15%.

### Fixed

- Gap when panel position is at the bottom and shell override theme happens.
- Panel menu margin when panel is in bottom.
- Window picker icon visibility on drag.
- Workspace switcher size for multi monitor setup.
- Arabic translation by [@AliGalal](https://gitlab.com/AliGalal).
- Chinese translation by [@wsxy162](https://gitlab.com/wsxy162).
- Italian translation by [@l3nn4rt](https://gitlab.com/l3nn4rt).
- Swedish translation by [@MorganAntonsson](https://gitlab.com/MorganAntonsson).

### Added

- Activities button icon.
- Dash icon size.
- Window demands attention focus.

## [10.0] - 2021-03-26

### Changed

- Organized prefs UI for icons and behavior.
- Removed quotes and side bar image from prefs UI.

### Fixed

- Fake hot corner primary monitor position.
- Horizontal scroll in prefs.
- Primary Monitor Panel Position.
- Arabic translation by [@karem34](https://gitlab.com/karem34).
- Russian translation by [@librusekus35790](https://gitlab.com/librusekus35790).

### Added

- Clock menu position.
- Disable animation or change the animation speed.
- Disable applications button in dash.
- Disable app menu icon.
- Disable panel arrow in GNOME 3.36 and 3.38.
- Disable panel notification icon.
- No results found for prefs window.
- Brazilian Portuguese translation by [@Zelling](https://gitlab.com/Zelling).
- Catalan translation by [@juxuanu](https://gitlab.com/juxuanu).
- Galician translation by [@frandieguez](https://gitlab.com/frandieguez).

## [9.0] - 2021-03-06

### Changed

- Prefs interface.

### Fixed

- Default value for hot corner on extension disable.
- GNOME Shell 40.beta version.

### Added

- Disable power icon.
- Panel position.
- Support to prefs window.

## [8.0] - 2021-02-22

### Changed

- Holding back lonely overview until the final GNOME 40 release.

### Fixed

- Dash override theme on GNOME Shell 40 beta.
- Focus for find entry on prefs.
- Search controller for GNOME Shell 40 beta.
- Start search for GNOME Shell 40 beta.
- Workspace switcher enable related to workspace switcher size.
- Nepali translation filename by [@IBA4](https://gitlab.com/IBA4).

## [7.0] - 2021-02-12

### Fixed

- GNOME Shell 40 hidden side by side workspace preview.
- GNOME Shell 40 search padding when panel is disabled.
- Initial prefs window size.

### Added

- GNOME Shell 40 window picker icon visibility to the settings.
- GNOME Shell 40 workspace switcher size to the settings.
- Panel corner size to the settings.
- Search feature to the settings.
- Type to Search to the settings.
- Nepali translation by [@IBA4](https://gitlab.com/IBA4).
- Spanish translation by [@oscfdezdz](https://gitlab.com/oscfdezdz).

## [6.0] - 2021-01-29

### Fixed

- GNOME Shell 3.38 extra padding on no workspace switcher.
- GNOME Shell 40 and GTK4 support for prefs.
- GNOME Shell 40 support for search entry.
- GNOME Shell 40 support for workspace switcher.

## [5.0] - 2021-01-05

### Added

- Accessibility Menu visibility to the settings.
- Activities button visibility to the settings.
- App menu visibility to the settings.
- Clock menu visibility to the settings.
- Keyboard Layout visibility to the settings.
- System Menu (Aggregate Menu) visibility to the settings.

### Changed

- OSD in settings to "On Screen Display (OSD)".

### Fixed

- Hot corner when top panel is visible.
- Padding on no dash.
- Search top padding on no top panel.

## [4.0] 2020-12-25

### Added

- API to decouple all libraries from using GNOME Shell ui directly.
- Automate build process by [@daPhipz](https://gitlab.com/daPhipz).
- CHANGELOG.md file.
- Compatibility layer for API.
- Translation automation script by [@daPhipz](https://gitlab.com/daPhipz).

### Changed

- Default settings to enable.
- Displaying error for generate-mo.sh by [@daPhipz](https://gitlab.com/daPhipz).
- German translation by [@M4he](https://gitlab.com/M4he).

### Fixed

- Top padding on no search and no top panel.

## [3.0] - 2020-12-21

### Added

- CONTRIBUTING.md file.
- Decoupled library from GNOME Shell ui.
- Extension logo.
- Initial Translations.
- Prefs as extension settings.

## [2.0] - 2020-11-18

### Fixed

- Destroy hot corner on disable.


### Added

- Disable app gesture.
- Disable background menu.
- Hide dash.
- Hide search.
- Hide top panel.
- Hide workspace switcher.
- Hot corner to toggle overview visibility.

