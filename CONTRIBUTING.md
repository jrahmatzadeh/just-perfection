# Rules for Contribution

- Respect 100 characters margin.

- The indentation is 4 characters. Don't use tab for indentation.

- Avoid unnecessary comments. The code should be self explanatory.

- Write a simple and readable code.

- All functions and methods should be testable inside *lib* folder.

- Curly brackets for function, class, method and CSS class should be in new line.

- Class name, function, method names and variables should be camel cased.

- Only main files are allowed in the src folder (such as extension.js, prefs.js, stylesheet.css, metadata.json).

- Singleton is not allowed for any files inside *lib* folder.

- Class constructor shouldn't do much. It is preferred to only use dependency injection if it is necessary.

- All image files should be inside *bin* folder.

- SVG and Image files should be released under GPLv3 license.

- Overriding GNOME Shell theme is accepted and your style should be applied when the parent has *just-perfection* class in it (or starts with *just-perfection-*). But avoid styling top panel.

- All *ui* files should be inside *ui* folder.

- All changes related to the GNOME Shell should pass through API (lib/API.js). Also API acts as compatibility layer.

## Translation

- You can find main translation file (pot file) in *po/main.pot*. That's the translation reference file.

- Initial language translation for current languages has been translated via online services. Feel free to edit that.

*This file may be updated in the future. Any change should be applied to all files in this repository.*
