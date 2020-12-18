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
     *   'Main' reference to ui::main
     *   'BackgroundMenu' reference to ui::backgroundMenu
     *   'ThumbnailsSlider' reference to ui::overviewControls::ThumbnailsSlider
     *   'WorkspaceSwitcherPopup' reference to ui::workspaceSwitcherPopup
     *   'Settings' reference to Gio::Settings
     *   'HotCorner' reference to lib::HotCorner
     */
    constructor(dependecies)
    {
        this._main = dependecies['Main'] || null;
        this._backgroundMenu = dependecies['BackgroundMenu'] || null;
        this._thumbnailsSlider = dependecies['ThumbnailsSlider'] || null;
        this._workspaceSwitcherPopup = dependecies['WorkspaceSwitcherPopup'] || null;
        this._settings = dependecies['Settings'] || null;
        this._hotCorner = dependecies['HotCorner'] || null;
        
        this._originals = {};
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
            this._main.panel.show();
        } else {
            this._main.panel.hide();
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
        if (!this._originals['startSearch']) {
            this._originals['startSearch']
            = this._main.overview.viewSelector.startSearch;
        }
    
        if (forceOriginal || this._settings.get_boolean('search')) {
            this._main.overview.searchEntry.show();
            this._main.overview.viewSelector.startSearch
            = this._originals['startSearch'];
        } else {
            this._main.overview.searchEntry.hide();
            this._main.overview.viewSelector.startSearch = () => {};
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
            this._main.overview.dash.show();
        } else {
           this._main.overview.dash.hide();
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
        if (!this._originals['osdWindowManager']) {
            this._originals['osdWindowManager']
            = this._main.osdWindowManager.show;
        }
    
        if (forceOriginal || this._settings.get_boolean('osd')) {
            this._main.osdWindowManager.show = this._originals['osdWindowManager'];
        } else {
            this._main.osdWindowManager.show = () => {};
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
        if (!this._originals['workspaceSwitcherPopup']) {
            this._originals['workspaceSwitcherPopup']
            = this._workspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show;
        }
    
        if (forceOriginal || this._settings.get_boolean('workspace-popup')) {
            this._workspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show
            = this._originals['workspaceSwitcherPopup'];
        } else {
            this._workspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show = () => {
               return false;
            };
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
        if (!this._originals['getAlwaysZoomOut']) {
            this._originals['getAlwaysZoomOut']
            = this._thumbnailsSlider.prototype._getAlwaysZoomOut;
        }
        
        if (!this._originals['getNonExpandedWidth']) {
            this._originals['getNonExpandedWidth']
            = this._thumbnailsSlider.prototype.getNonExpandedWidth;
        }
    
        if (forceOriginal || this._settings.get_boolean('workspace')) {
            this._thumbnailsSlider.prototype._getAlwaysZoomOut
            = this._originals['getAlwaysZoomOut'];
            this._thumbnailsSlider.prototype.getNonExpandedWidth
            = this._originals['getNonExpandedWidth'];
        } else {
            this._thumbnailsSlider.prototype._getAlwaysZoomOut = () => {
                return false;
            };
            this._thumbnailsSlider.prototype.getNonExpandedWidth = () => {
                return 0;
            };
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
        if (!this._originals['backgroundMenu']) {
            this._originals['backgroundMenu']
            = this._backgroundMenu.BackgroundMenu.prototype.open;
        }
    
        if (forceOriginal || this._settings.get_boolean('background-menu')) {
            this._backgroundMenu.BackgroundMenu.prototype.open
            = this._originals['backgroundMenu'];
        } else {
            this._backgroundMenu.BackgroundMenu.prototype.open = () => {};
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
            global.stage.get_actions().forEach(a => a.enabled = true);
        } else {
            global.stage.get_actions().forEach(a => a.enabled = false);
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
            this._main.layoutManager.uiGroup.remove_style_class_name(className);
        } else {
            this._main.layoutManager.uiGroup.add_style_class_name(className);
        }
    }
}

