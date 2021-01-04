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
     * @param string gettextDoamin
     *
     * @return object
     */
    getMainPrefs(UIFilePath, gettextDomain)
    {
        this._builder.set_translation_domain(gettextDomain);
        this._builder.add_from_file(UIFilePath);
        
        let obj = this._builder.get_object('main_prefs');
        
        this._register_signals();
        this._set_current_values();
        
        obj.show_all();
        
        return obj;
    }
  
    /**
     * register all signals
     *
     * @return void
     */
    _register_signals()
    {
        let SignalHandlers = {};
  
        for (let key of this._switchKeys) {
            let signal = key.replace("-", "_") + "_switch_state_set";
            SignalHandlers[signal] = (w) => {
                this._settings.set_boolean(key, w.get_active());
            };
        }
    
        this._builder.connect_signals_full((builder, object, signal, handler) => {
            object.connect(signal, SignalHandlers[handler].bind(this));
        });
    }
  
    /**
     * set current values for all elements
     *
     * @return void
     */
    _set_current_values()
    {
        for (let key of this._switchKeys) {
            let value = this._settings.get_boolean(key);
            let id = key.replace("-", "_") + "_switch";
            this._builder.get_object(id).set_active(value);
        }
    }
};

