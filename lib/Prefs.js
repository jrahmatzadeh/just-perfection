/**
 * Prefs Library
 * 
 * @author     Just Perfection <justperfection.channel@gmail.com>
 * @copyright  2020
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
     * @param object dependecies
     *   'Builder' instance of Gtk::Builder
     *   'Settings' instance of Gio::Settings
     *   'GObjectBindingFlags' instance of GObject::BindingFlags
     * @param float shellVersion
     */
    constructor(dependecies, shellVersion)
    {
        this._settings = dependecies['Settings'] || null;
        this._builder = dependecies['Builder'] || null;
        this._GObjectBindingFlags = dependecies['GObjectBindingFlags'] || null;
        
        this._shellVersion = shellVersion;
        
        // @var int initial window size
        this._windowWidth = 200;
        this._windowHeight = 750;
        
        // @var object
        // for structure see self::_setKey()
        this._keys = {};
        
        // setting all the main keys
        
        // visiblity
        this._setKey('visiblity', 'panel', 'GtkSwitch', true);
        this._setKey('visiblity', 'activities-button', 'GtkSwitch', true);
        this._setKey('visiblity', 'app-menu', 'GtkSwitch', true);
        this._setKey('visiblity', 'clock-menu', 'GtkSwitch', true);
        this._setKey('visiblity', 'keyboard-layout', 'GtkSwitch', true);
        this._setKey('visiblity', 'accessibility-menu', 'GtkSwitch', true);
        this._setKey('visiblity', 'aggregate-menu', 'GtkSwitch', true);
        this._setKey('visiblity', 'search', 'GtkSwitch', true);
        this._setKey('visiblity', 'dash', 'GtkSwitch', true);
        this._setKey('visiblity', 'osd', 'GtkSwitch', true);
        this._setKey('visiblity', 'workspace-popup', 'GtkSwitch', true);
        this._setKey('visiblity', 'workspace', 'GtkSwitch', true);
        this._setKey('visiblity', 'background-menu', 'GtkSwitch', true);
        this._setKey('visiblity', 'gesture', 'GtkSwitch', true);
        this._setKey('visiblity', 'hot-corner', 'GtkSwitch', true);
        this._setKey('visiblity', 'window-picker-icon', 'GtkSwitch',
            this._shellVersion >= 40);
        
        // behavior
        this._setKey('behavior', 'type-to-search', 'GtkSwitch', true);
        
        // customize
        this._setKey('customize', 'panel-corner-size', 'GtkComboBoxText', true);
        this._setKey('customize', 'workspace-switcher-size', 'GtkComboBoxText',
            this._shellVersion >= 40);
        
        // override
        this._setKey('override', 'theme', 'GtkSwitch', true);
    }
    
    /**
     * set key
     *
     * @param string category
     * @paramm string name should be the same as gsettings key name
     * @param string widgetType gtk widget type like 'GtkSwitch'.
     * @param bool supported
     *
     * @return void
     */
    _setKey(category, name, widgetType, supported)
    {
        let id = name.replace(/-/g, "_");
        let widgetId = id + '_' + widgetType.toLowerCase().replace('gtk', '');
        
        this._keys[id] = {
            'category' : category,
            'widgetType' : widgetType,
            'name' : name,
            'id' : id,
            'widgetId' : widgetId,
            'supported' : supported,
        }
    }
    
    /**
     * register all signals
     *
     * @paramm string UIFilePath
     * @param string binFolderPath
     * @param string gettextDoamin
     *
     * @return object
     */
    getMainPrefs(UIFilePath, binFolderPath, gettextDomain)
    {
        this._builder.set_translation_domain(gettextDomain);
        this._builder.add_from_file(UIFilePath);
        
        let obj = this._builder.get_object('main_prefs');
        
        this._fixPathOfObjects(binFolderPath);
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
            let csd = this._builder.get_object("csd_box");
            let headerBar = this._builder.get_object("header_bar");
            window.set_titlebar(csd);
            if (this._shellVersion < 40) {
                headerBar.set_title('Just Perfection');
                headerBar.set_show_close_button(true);
            }
            
            this._registerSignals(window);
        });
                
        return obj;
    }
    
    /**
     * fix properties path for builder objects
     *
     * @param string binFolderPath
     *
     * @return void
     */
    _fixPathOfObjects(binFolderPath)
    {
        // since we are using file property on .ui file we need
        // the actual path for the gtkImage::file
        let topimage = this._builder.get_object('topimage');
        topimage.set_from_file(binFolderPath + "/top.svg");
    }
  
    /**
     * register all signals
     *
     * @param GtkWindow window
     *
     * @return void
     */
    _registerSignals(window)
    {
        let searchEntry = this._builder.get_object("search_entry");
        let searchBtn = this._builder.get_object("search_togglebutton");
        let searchBar = this._builder.get_object("searchbar");
        
        for (let [id, key] of Object.entries(this._keys)) {
        
            switch (key.widgetType) {
            
                case 'GtkSwitch':
                    this._builder.get_object(key.widgetId).connect("state-set", (w) => {
                        this._settings.set_boolean(key.name, w.get_active());
                    });
                    break;
                    
                case 'GtkComboBoxText':
                    this._builder.get_object(key.widgetId).connect("changed", (w) => {
                        this._settings.set_int(key.name, w.get_active());
                    });
                    break;
            }
        }
        
        searchEntry.connect("changed", (w) => {
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
            this._GObjectBindingFlags.BIDIRECTIONAL);
        
        searchBar.connect_entry(searchEntry);
    }
  
    /**
     * set current values for all elements
     *
     * @return void
     */
    _setCurrentValues()
    {
        for (let [id, key] of Object.entries(this._keys)) {
            let value = this._settings.get_boolean(key.name);
            this._builder.get_object(key.widgetId).set_active(value);
        }
    }
    
    /**
     * search the query
     *
     * @return void
     */
    _search(q)
    {
        let categories = {};
    
        for (let [id, key] of Object.entries(this._keys)) {
        
            if (typeof categories[key.category] === 'undefined') {
                categories[key.category] = 0;
            }
        
            let text = this._builder.get_object(id + "_txt").get_text();
            let row = this._builder.get_object(id + "_row");
            
            let visible = key.supported && text.toLowerCase().includes(q);
            
            row.visible = visible;
            
            if (visible) {
                categories[key.category]++;
            }
        }
        
        // hide the category when nothing is visible in it
        for (var category in categories) {
            
            let titleElm = this._builder.get_object(category + "_title");
            let frameElm = this._builder.get_object(category + "_frame");
            
            let visible = (categories[category] > 0);
            
            titleElm.visible = visible;
            frameElm.visible = visible;
        }
    }
};

