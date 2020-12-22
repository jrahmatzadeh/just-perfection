/**
 * Manager Library
 * 
 * @author     Just Perfection <justperfection.channel@gmail.com>
 * @copyright  2020
 * @license    GNU General Public License v3.0
 */


/**
 * Apply settings to the GNOME Shell 
 */
var Manager = class
{
    /**
     * Class Constructor
     *
     * @param object dependecies
     *   'API' reference to lib::API
     *   'HotCorner' reference to lib::HotCorner
     *   'Settings' instance of Gio::Settings
     */
    constructor(dependecies)
    {
        this._api = dependecies['API'] || null;
        this._hotCorner = dependecies['HotCorner'] || null;
        this._settings = dependecies['Settings'] || null;
    }
    
    /**
     * register all signals for settings
     *
     * @return void
     */
    registerSettingsSignals()
    {
        this._settings.connect('changed::panel', () => {
            this._applyPanel(false);
        });
        
        this._settings.connect('changed::search', () => {
            this._applySearch(false);
        });
        
        this._settings.connect('changed::dash', () => {
            this._applyDash(false);
        });
        
        this._settings.connect('changed::osd', () => {
            this._applyOSD(false);
        });
        
        this._settings.connect('changed::workspace-popup', () => {
            this._applyWorkspacePopup(false);
        });
        
        this._settings.connect('changed::workspace', () => {
            this._applyWorkspace(false);
        });
        
        this._settings.connect('changed::background-menu', () => {
            this._applyBackgroundMenu(false);
        });
        
        this._settings.connect('changed::gesture', () => {
            this._applyGesture(false);
        });
        
        this._settings.connect('changed::hot-corner', () => {
            this._applyHotCorner(false);
        });
        
        this._settings.connect('changed::theme', () => {
            this._applyTheme(false);
        });
    }
    
    
    /**
     * apply everything to the GNOME Shell
     *
     * @return void
     */
    applyAll()
    {
        this._applyPanel(false);
        this._applySearch(false);
        this._applyDash(false);
        this._applyOSD(false);
        this._applyWorkspacePopup(false);
        this._applyWorkspace(false);
        this._applyBackgroundMenu(false);
        this._applyGesture(false);
        this._applyHotCorner(false);
        this._applyTheme(false);
    }
    
    /**
     * revert everything that is done by this class to the GNOME Shell
     *
     * @return void
     */
    revertAll()
    {
        this._applyPanel(true);
        this._applySearch(true);
        this._applyDash(true);
        this._applyOSD(true);
        this._applyWorkspace(true);
        this._applyWorkspacePopup(true);
        this._applyBackgroundMenu(true);
        this._applyGesture(true);
        this._applyHotCorner(true);
        this._applyTheme(true);
    }
    
    /**
     * apply panel settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyPanel(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('panel')) {
            this._api.panelShow();
        } else {
            this._api.panelHide();
        }
    }
    
    /**
     * apply search settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applySearch(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('search')) {
            this._api.searchShow();
        } else {
            this._api.searchHide();
        }
    }
    
    /**
     * apply dash settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyDash(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('dash')) {
            this._api.dashShow();
        } else {
            this._api.dashHide();
        }
    }

    /**
     * apply osd settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyOSD(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('osd')) {
            this._api.OSDEnable();
        } else {
            this._api.OSDDisable();
        }
    }
    
    /**
     * apply workspace popup settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyWorkspacePopup(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('workspace-popup')) {
            this._api.workspacePopupEnable();
        } else {
            this._api.workspacePopupDisable();
        }
    }
    
    /**
     * apply workspace settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyWorkspace(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('workspace')) {
            this._api.workspaceSwitcherShow();
        } else {
            this._api.workspaceSwitcherHide();
        }
    }
    
    /**
     * apply background menu settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyBackgroundMenu(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('background-menu')) {
            this._api.backgroundMenuEnable();
        } else {
            this._api.backgroundMenuDisable();
        }
    }
    
    /**
     * apply gesture settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyGesture(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('gesture')) {
            this._api.gestureEnable();
        } else {
            this._api.gestureDisable();
        }
    }
    
    /**
     * apply hot corner settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyHotCorner(forceOriginal)
    {
        if (forceOriginal || !this._settings.get_boolean('hot-corner')) {
            this._hotCorner.removeOveriewButton();
        } else {
            this._hotCorner.addOveriewButton();
        }
    }
    
    /**
     * apply theme settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyTheme(forceOriginal)
    {
        let className = 'just-perfection';
        
        if (forceOriginal || !this._settings.get_boolean('theme')) {
            this._api.UIstyleClassRemove(className);
        } else {
            this._api.UIstyleClassAdd(className);
        }
    }
}

