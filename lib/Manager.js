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
     * @param float shellVersion
     */
    constructor(dependecies, shellVersion)
    {
        this._api = dependecies['API'] || null;
        this._hotCorner = dependecies['HotCorner'] || null;
        this._settings = dependecies['Settings'] || null;
        
        this._shellVersion = shellVersion;
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
        
        this._settings.connect('changed::activities-button', () => {
            this._applyActivitiesButton(false);
        });
        
        this._settings.connect('changed::app-menu', () => {
            this._applyAppMenu(false);
        });
        
        this._settings.connect('changed::clock-menu', () => {
            this._applyClockMenu(false);
        });
        
        this._settings.connect('changed::keyboard-layout', () => {
            this._applyKeyboardLayout(false);
        });
        
        this._settings.connect('changed::accessibility-menu', () => {
            this._applyAccessibilityMenu(false);
        });
        
        this._settings.connect('changed::aggregate-menu', () => {
            this._applyAggregateMenu(false);
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
        this._applyActivitiesButton(false);
        this._applyAppMenu(false);
        this._applyClockMenu(false);
        this._applyKeyboardLayout(false);
        this._applyAccessibilityMenu(false);
        this._applyAggregateMenu(false);
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
        this._applyActivitiesButton(true);
        this._applyAppMenu(true);
        this._applyClockMenu(true);
        this._applyKeyboardLayout(true);
        this._applyAccessibilityMenu(true);
        this._applyAggregateMenu(true);
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
        // since we use lib::HotCorner on hidden panel we need to
        // apply hot corner on each call of this metod
        this._applyHotCorner(false);
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
        let className = 'just-perfection-no-search';
        
        if (forceOriginal || this._settings.get_boolean('search')) {
            this._api.UIstyleClassRemove(className);
            this._api.searchShow();
        } else {
            this._api.UIstyleClassAdd(className);
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
            this._api.hotCornersDisable();
            this._hotCorner.removeOveriewButton();
        } else {
            this._api.hotCornersEnable();
            // gnome hot corner won't work when the panel is hidden
            // so we use lib::HotCorner instead
            if (!this._api.isPanelVisible()) {
                this._hotCorner.addOveriewButton();
            } else {
                this._hotCorner.removeOveriewButton();
            }
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
        let fallbackClassName = 'just-perfection-gnome3';
        
        if (forceOriginal || !this._settings.get_boolean('theme')) {
            this._api.UIstyleClassRemove(className);
            this._api.UIstyleClassRemove(fallbackClassName);
        } else {
            this._api.UIstyleClassAdd(className);
            if (this._shellVersion < 40) {
                this._api.UIstyleClassAdd(fallbackClassName);
            }
        }
    }
    
    /**
     * apply activites button settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyActivitiesButton(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('activities-button')) {
            this._api.activitiesButtonShow();
        } else {
            this._api.activitiesButtonHide();
        }
    }
    
    /**
     * apply app menu settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyAppMenu(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('app-menu')) {
            this._api.appMenuShow();
        } else {
            this._api.appMenuHide();
        }
    }
    
    /**
     * apply clock menu (aka date menu) settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyClockMenu(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('clock-menu')) {
            this._api.dateMenuShow();
        } else {
            this._api.dateMenuHide();
        }
    }
    
    /**
     * apply keyboard layout settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyKeyboardLayout(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('keyboard-layout')) {
            this._api.keyboardLayoutShow();
        } else {
            this._api.keyboardLayoutHide();
        }
    }
    
    /**
     * apply accessibility menu settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyAccessibilityMenu(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('accessibility-menu')) {
            this._api.accessibilityMenuShow();
        } else {
            this._api.accessibilityMenuHide();
        }
    }
    
    /**
     * apply aggregate menu settings
     *
     * @param bool forceOriginal
     *
     * @return void
     */
    _applyAggregateMenu(forceOriginal)
    {
        if (forceOriginal || this._settings.get_boolean('aggregate-menu')) {
            this._api.aggregateMenuShow();
        } else {
            this._api.aggregateMenuHide();
        }
    }
}

