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
        
        this._switchKeys = [
            'panel',
            'activities-button',
            'app-menu',
            'clock-menu',
            'keyboard-layout',
            'accessibility-menu',
            'aggregate-menu',
            'search',
            'dash',
            'osd',
            'workspace-popup',
            'workspace',
            'background-menu',
            'gesture',
            'hot-corner',
            'theme',
            'window-picker-icon',
            'type-to-search',
        ];
        
        this._comboBoxTextKeys = [
            'panel-corner-size',
            'workspace-switcher-size',
        ];
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
     * check whether the feauture is supported in current shell version 
     *
     * @return bool
     */
    _isSupported(name)
    {
        if (name === 'window-picker-icon' && this._shellVersion < 40) {
            return false;
        }
        
        if (name === 'workspace-switcher-size' && this._shellVersion < 40) {
            return false;
        }
        
        return true;
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
    
        for (let key of this._switchKeys) {
            let id = key.replace(/-/g, "_") + "_switch";
            this._builder.get_object(id).connect("state-set", (w) => {
                this._settings.set_boolean(key, w.get_active());
            });
        }
        
        for (let key of this._comboBoxTextKeys) {
            let id = key.replace(/-/g, "_") + "_comboboxtext";
            this._builder.get_object(id).connect("changed", (w) => {
                this._settings.set_int(key, w.get_active());
            });
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
        for (let key of this._switchKeys) {
            let value = this._settings.get_boolean(key);
            let id = key.replace(/-/g, "_") + "_switch";
            this._builder.get_object(id).set_active(value);
        }
        
        for (let key of this._comboBoxTextKeys) {
            let value = this._settings.get_int(key);
            let id = key.replace(/-/g, "_") + "_comboboxtext";
            this._builder.get_object(id).set_active(value);
        }
    }
    
    /**
     * search the query
     *
     * @return void
     */
    _search(q)
    {
        let keys = this._switchKeys.concat(this._comboBoxTextKeys);
        
        for (let key of keys) {

            let starter = key.replace(/-/g, "_");
            let text = this._builder.get_object(starter + "_txt").get_text();
            let row = this._builder.get_object(starter + "_row");
            
            row.visible = text.toLowerCase().includes(q) && this._isSupported(key);
        }
    }
};

