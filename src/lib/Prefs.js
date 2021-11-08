/**
 * Prefs Library
 *
 * @author     Javad Rahmatzadeh <j.rahmatzadeh@gmail.com>
 * @copyright  2020-2021
 * @license    GNU General Public License v3.0
 */

/**
 * prefs widget for showing prefs window
 */
var Prefs = class
{
    /**
     * class contructor
     *
     * @param {Object} dependecies
     *   'Builder' instance of Gtk::Builder
     *   'Settings' instance of Gio::Settings
     *   'GObjectBindingFlags' instance of GObject::BindingFlags
     *   'Gtk' reference to Gtk
     *   'Gio' reference to Gio
     * @param {number} shellVersion float in major.minor format
     */
    constructor(dependecies, shellVersion)
    {
        this._settings = dependecies['Settings'] || null;
        this._builder = dependecies['Builder'] || null;
        this._gobjectBindingFlags = dependecies['GObjectBindingFlags'] || null;
        this._gtk = dependecies['Gtk'] || null;
        this._gio = dependecies['Gio'] || null;

        this._shellVersion = shellVersion;

        /**
         * holds Gtk.DropDown items that are
         * created inside this._convertComboBoxTextToDropDown()
         * object key is widget id
         *
         * @member {Object}
         */
        this._dropdowns = {};

        /**
         * initial window size
         *
         * @member {number}
         */
        this._windowWidth = 500;
        this._windowHeight = 750;

        /**
         * holds all required urls
         *
         * @member {Object}
         */
        this._url = {
            bug_report: 'https://gitlab.gnome.org/jrahmatzadeh/just-perfection/-/issues',
            patreon: 'https://www.patreon.com/justperfection',
        };

        /**
         * holds all keys generated by this._setKey()
         *
         * @member {Object}
         */
        this._keys = {};

        // setting all the main keys

        this._setKey(
            'visiblity',
            'panel',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'panel-in-overview',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'activities-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'app-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'clock-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'keyboard-layout',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'accessibility-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'aggregate-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'search',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'dash',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'osd',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'workspace-popup',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'workspace',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'background-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'show-apps-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'workspaces-in-app-grid',
            'GtkSwitch',
            this._shellVersion >= 40,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'window-preview-caption',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'visiblity',
            'window-preview-close-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'visiblity',
            'ripple-box',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'icons',
            'app-menu-icon',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'icons',
            'panel-notification-icon',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'icons',
            'power-icon',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'icons',
            'window-picker-icon',
            'GtkSwitch',
            this._shellVersion >= 40,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'icons',
            'panel-arrow',
            'GtkSwitch',
            this._shellVersion < 40,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'icons',
            'activities-button-icon-path',
            'GtkEntry',
            true,
            {
                default: '',
                minimal: '',
                superMinimal: '',
            }
        );

        this._setKey(
            'icons',
            'activities-button-icon-monochrome',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'icons',
            'activities-button-label',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'behavior',
            'type-to-search',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'behavior',
            'hot-corner',
            'GtkSwitch',
            this._shellVersion < 41,
            {
                default: false,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'behavior',
            'gesture',
            'GtkSwitch',
            this._shellVersion < 40,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'behavior',
            'window-demands-attention-focus',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: true,
                superMinimal: true,
            }
        );

        this._setKey(
            'behavior',
            'workspace-switcher-should-show',
            'GtkSwitch',
            this._shellVersion >= 40,
            {
                default: false,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'behavior',
            'startup-status',
            'GtkComboBoxText',
            this._shellVersion >= 40,
            {
                default: 1,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'behavior',
            'workspace-wrap-around',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: false,
                superMinimal: false,
            }
        );

        this._setKey(
            'behavior',
            'double-super-to-appgrid',
            'GtkSwitch',
            this._shellVersion >= 40,
            {
                default: true,
                minimal: true,
                superMinimal: false,
            }
        );

        this._setKey(
            'customize',
            'workspace-background-corner-size',
            'GtkComboBoxText',
            this._shellVersion >= 40,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'top-panel-position',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'panel-corner-size',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'clock-menu-position',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'clock-menu-position-offset',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'workspace-switcher-size',
            'GtkComboBoxText',
            this._shellVersion >= 40,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'animation',
            'GtkComboBoxText',
            true,
            {
                default: 1,
                minimal: 1,
                superMinimal: 1,
            }
        );

        this._setKey(
            'customize',
            'dash-icon-size',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 1,
                superMinimal: 0,
            },
            {
                '1': 32,
                '2': 48,
                '3': 64,
            }
        );

        this._setKey(
            'customize',
            'notification-banner-position',
            'GtkComboBoxText',
            true,
            {
                default: 1,
                minimal: 1,
                superMinimal: 1,
            }
        );

        this._setKey(
            'customize',
            'panel-size',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'panel-button-padding-size',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'customize',
            'panel-indicator-padding-size',
            'GtkComboBoxText',
            true,
            {
                default: 0,
                minimal: 0,
                superMinimal: 0,
            }
        );

        this._setKey(
            'override',
            'theme',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: true,
                superMinimal: true,
            }
        );
    }

    /**
     * set key
     *
     * @param {string} category possible values:
     *   - visiblity
     *   - icons
     *   - behavior
     *   - customize
     *   - override
     * @param {string} name should be the same as gsettings key name
     * @param {string} widgetType gtk widget type like 'GtkSwitch'.
     * @param {boolean} supported whether supported in the current shell
     * @param {Object} profiles values for each profile. for example:
     *   {default: true, minimal: false}
     * @param {Object} [maps] for example for combobox you can specify 
     *  if the index is 1 go use 32 as value:
     *  {1 : 32}
     *
     * @returns {Object} key object that has been set
     */
    _setKey(category, name, widgetType, supported, profiles, maps)
    {
        let id = name.replace(/-/g, '_');
        let widgetName = widgetType.toLowerCase().replace('gtk', '');
        let widgetId = `${id}_${widgetName}`;

        if (maps === undefined) {
            maps = {};
        }

        this._keys[id] = {
            category,
            widgetType,
            name,
            id,
            widgetId,
            supported,
            profiles,
            maps,
        }

        return this._keys[id];
    }

    /**
     * register all signals
     *
     * @param {string} UIFolderPath folder path to ui folder
     * @param {string} binFolderPath bin folder path
     * @param {string} gettextDomain gettext domain
     *
     * @returns {Object}
     */
    getMainPrefs(UIFolderPath, binFolderPath, gettextDomain)
    {
        // changing the order here can change the elements order in ui 
        let uiFilenames = [
            'main',
            'no-results-found',
            'override',
            'visibility',
            'icons',
            'behavior',
            'customize',
        ];

        this._builder.set_translation_domain(gettextDomain);
        for (let uiFilename of uiFilenames) {
            this._builder.add_from_file(`${UIFolderPath}/${uiFilename}.ui`);
        }

        let obj = this._builder.get_object('main_prefs');
        let prefsBox = this._builder.get_object('main_prefs_in_box');

        for (let uiFilename of uiFilenames) {
            if (uiFilename === 'main') {
                continue;
            }
            let elementId = uiFilename.replace(/-/g, '_');
            prefsBox.append(this._builder.get_object(elementId));
        }

        this._convertComboBoxTextToDropDown();
        this._fixIconObjects();
        this._setCurrentValues();

        // applying search here makes all the supported elements by current
        // shell version be visible and other not
        this._search('');

        obj.connect('realize', () => {

            let window = (this._shellVersion < 40) ? obj.get_toplevel() : obj.get_root();

            // default window size
            window.default_width = this._windowWidth;
            window.set_size_request(this._windowWidth, this._windowHeight);
            if (this._shellVersion < 40) {
                window.resize(this._windowWidth, this._windowHeight);
            }

            // csd
            let headerBar = this._builder.get_object('header_bar');
            window.set_titlebar(headerBar);
            if (this._shellVersion < 40) {
                headerBar.set_title('Just Perfection');
                headerBar.set_show_close_button(true);
            }

            this._registerSignals(window);
        });

        return obj;
    }

    /**
     * fix images that holding icons for GTK4
     *
     * @returns {void}
     */
    _fixIconObjects()
    {
        if (this._shellVersion < 40) {
            return;
        }

        let icons = [
            'menu_icon',
            'search_icon',
        ];

        icons.forEach(id => {
            let elm = this._builder.get_object(id);
            let parent = elm.get_parent();
            let iconName = elm.get_icon_name();
            let iconSize = elm.get_icon_size();

            elm.hide();
            parent.icon_name = iconName;
            parent.icon_size = iconSize;
        });
    }

    /**
     * convert all comboboxes to drop down and hold them inside this._dropdowns
     *
     * @returns {void}
     */
    _convertComboBoxTextToDropDown()
    {
        if (this._shellVersion < 40) {
            return;
        }

        for (let [, key] of Object.entries(this._keys)) {
            if (key.widgetType === 'GtkComboBoxText') {
                let widget = this._builder.get_object(key.widgetId);
                let parent = widget.get_parent();

                let items = [];
                widget.set_active(0);
                let selectedIndex = 0;
                while (widget.get_active_text() !== null) {
                    items.push(widget.get_active_text());
                    selectedIndex++;
                    widget.set_active(selectedIndex);
                }

                let dropdown = this._gtk.DropDown.new_from_strings(items);

                delete this._keys[key.id];

                let newKey = this._setKey(
                    key.category,
                    key.name,
                    'GtkDropDown',
                    key.supported,
                    key.profiles,
                    key.maps
                );

                this._dropdowns[newKey.widgetId] = dropdown;

                dropdown.set_valign(this._gtk.Align.CENTER);

                widget.hide();
                parent.append(dropdown);
            }
        }
    }

    /**
     * register all signals
     *
     * @param {Gtk.Window} window prefs dialog
     *
     * @returns {void}
     */
    _registerSignals(window)
    {
        let searchEntry = this._builder.get_object('search_entry');
        let searchBtn = this._builder.get_object('search_togglebutton');
        let searchBar = this._builder.get_object('searchbar');
        let fileChooser = this._builder.get_object('file_chooser');
        let activitiesButtonIconPath = {
            button: this._builder.get_object('activities_button_icon_path_button'),
            entry: this._builder.get_object('activities_button_icon_path_entry'),
            empty: this._builder.get_object('activities_button_icon_path_empty_button'),
        };

        for (let [, key] of Object.entries(this._keys)) {

            switch (key.widgetType) {

                case 'GtkSwitch':
                    this._builder.get_object(key.widgetId).connect('state-set', (w) => {
                        this._settings.set_boolean(key.name, w.get_active());
                    });
                    break;

                case 'GtkComboBoxText':
                    this._builder.get_object(key.widgetId).connect('changed', (w) => {
                        let index = w.get_active();
                        let value = (index in key.maps) ? key.maps[index] : index; 
                        this._settings.set_int(key.name, value);
                    });
                    break;

                case 'GtkDropDown':
                    this._dropdowns[key.widgetId].connect('notify::selected-item', (w) => {
                        let index = w.get_selected();
                        let value = (index in key.maps) ? key.maps[index] : index; 
                        this._settings.set_int(key.name, value);
                    });
                    break;

                case 'GtkEntry':
                    this._builder.get_object(key.widgetId).connect('changed', (w) => {
                        this._settings.set_string(key.name, w.text);
                    });
                    break;
            }
        }

        searchEntry.connect('changed', (w) => {
            this._search(w.get_text());
        });

        if (this._shellVersion < 40) {
            window.connect('key-press-event', (w, e) => {
                return searchBar.handle_event(e);
            });
        } else {
            searchBar.set_key_capture_widget(window);
        }

        searchBtn.bind_property('active', searchBar, 'search-mode-enabled',
            this._gobjectBindingFlags.BIDIRECTIONAL);

        searchBar.connect_entry(searchEntry);

        activitiesButtonIconPath['entry'].connect('changed', (w) => {
            this._setFileChooserValue('activities_button_icon_path', w.text);
        });

        activitiesButtonIconPath['empty'].connect('clicked', () => {
            this._setFileChooserValue('activities_button_icon_path', '');
        });

        activitiesButtonIconPath['button'].connect('clicked', (w) => {
            this.currentFileChooserEntry = activitiesButtonIconPath['entry'];

            let uri = activitiesButtonIconPath['entry'].text;
            let file = this._gio.File.new_for_uri(uri);
            let fileExists = file.query_exists(null);
            if (fileExists) {
                let fileParent = file.get_parent();
                fileChooser.set_current_folder(
                    (this._shellVersion >= 40) ? fileParent : fileParent.get_path());
            }

            fileChooser.set_transient_for(window);
            fileChooser.show();
        });

        fileChooser.connect('response', (w, response) => {
            if (response !== this._gtk.ResponseType.ACCEPT) {
                return;
            }
            let fileURI = w.get_file().get_uri();
            this.currentFileChooserEntry.text = fileURI;
        });

        let actionGroup = new this._gio.SimpleActionGroup();

        let action1 = new this._gio.SimpleAction({name: 'show-bug-report'});
        action1.connect('activate', () => {
            this._gio.AppInfo.launch_default_for_uri(
                this._url.bug_report,
                window.get_display().get_app_launch_context());
        });

        let action2 = new this._gio.SimpleAction({name: 'show-patreon'});
        action2.connect('activate', () => {
            this._gio.AppInfo.launch_default_for_uri(
                this._url.patreon,
                window.get_display().get_app_launch_context());
        });

        actionGroup.add_action(action1);
        actionGroup.add_action(action2);

        window.insert_action_group('prefs', actionGroup);
    }

    /**
     * set file chooser button value
     *
     * @param {string} id element starter id
     * @param {string} uri file address
     *
     * @returns {void}
     */
    _setFileChooserValue(id, uri)
    {
        let preview = this._builder.get_object(`${id}_preview`);
        let emptyButton = this._builder.get_object(`${id}_empty_button`);
        let entry = this._builder.get_object(`${id}_entry`);

        if (!entry) {
            return;
        }

        let file = this._gio.File.new_for_uri(uri);
        let fileExists = file.query_exists(null);
        let uriPrepared = (fileExists) ? uri : '';

        let visible = uriPrepared !== '';

        entry.text = uriPrepared;
        emptyButton.visible = visible;

        preview.clear();

        if (fileExists) {
            let gicon = this._gio.icon_new_for_string(file.get_path());
            if (this._shellVersion < 40) {
                preview.set_from_gicon(gicon, 1);
            } else {
                preview.set_from_gicon(gicon);
            }
        } else {
            preview.icon_name = 'document-open-symbolic';
        }
    }

    /**
     * set current values for all elements
     *
     * @returns {void}
     */
    _setCurrentValues()
    {
        for (let [, key] of Object.entries(this._keys)) {

            let elm
            = (key.widgetType === 'GtkDropDown')
            ? this._dropdowns[key.widgetId]
            : this._builder.get_object(key.widgetId);

            switch (key.widgetType) {

                case 'GtkSwitch':
                    elm.set_active(this._settings.get_boolean(key.name));
                    break;

                case 'GtkComboBoxText':
                case 'GtkDropDown':
                    let index = this._settings.get_int(key.name);
                    for (let k in key.maps) {
                        if (key.maps[k] === index) {
                            index = k;
                            break;
                        }
                    }
                    if (key.widgetType === 'GtkDropDown') {
                        elm.set_selected(index);
                    } else {
                        elm.set_active(index);
                    }
                    break;

                case 'GtkEntry':
                    elm.text = this._settings.get_string(key.name);
                    this._setFileChooserValue(key.id, elm.text);
                    break;
            }
        }
    }

    /**
     * search the query
     *
     * @param {string} q query
     *
     * @returns {void}
     */
    _search(q)
    {
        let categories = {};
        let noResultsFoundVisiblity = true;

        for (let [, key] of Object.entries(this._keys)) {

            if (categories[key.category] === undefined) {
                categories[key.category] = 0;
            }

            let text = this._builder.get_object(`${key.id}_txt`).get_text();
            let row = this._builder.get_object(`${key.id}_row`);

            let visible = key.supported && text.toLowerCase().includes(q);

            row.visible = visible;

            if (visible) {
                categories[key.category]++;
                noResultsFoundVisiblity = false;
            }
        }

        // hide the category when nothing is visible in it
        for (var category in categories) {
            let titleElm = this._builder.get_object(`${category}_title`);
            let frameElm = this._builder.get_object(`${category}_frame`);
            let visible = categories[category] > 0;

            titleElm.visible = visible;
            frameElm.visible = visible;
        }

        let notFound = this._builder.get_object('no_results_found');
        notFound.visible = noResultsFoundVisiblity;
    }
};

