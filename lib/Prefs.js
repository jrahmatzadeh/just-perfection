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
     */
    constructor(dependecies)
    {
        this._settings = dependecies['Settings'] || null;
        this._builder = dependecies['Builder'] || null;
        
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
        this._registerSignals();
        this._setCurrentValues();
        
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
     * @return void
     */
    _registerSignals()
    {
        for (let key of this._switchKeys) {
            let id = key.replace("-", "_") + "_switch";
            this._builder.get_object(id).connect("state-set", (w) => {
                this._settings.set_boolean(key, w.get_active());
            });
        }
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
            let id = key.replace("-", "_") + "_switch";
            this._builder.get_object(id).set_active(value);
        }
    }
};

