/**
 * API Library
 * 
 * @author     Just Perfection <justperfection.channel@gmail.com>
 * @copyright  2020
 * @license    GNU General Public License v3.0
 */


/**
 * API to avoid calling GNOME Shell directly
 * and make all parts compatible with different GNOME Shell versions 
 */
var API = class
{
    /**
     * Class Constructor
     *
     * @param object dependecies
     *   'Main' reference to ui::main
     *   'BackgroundMenu' reference to ui::backgroundMenu
     *   'OverviewControls' reference to ui::overviewControls
     *   'WorkspaceSwitcherPopup' reference to ui::workspaceSwitcherPopup
     *   'Settings' reference to Gio::Settings
     * @paramm string shellVersion
     */
    constructor(dependecies, shellVersion)
    {
        this._main = dependecies['Main'] || null;
        this._backgroundMenu = dependecies['BackgroundMenu'] || null;
        this._overviewControls = dependecies['OverviewControls'] || null;
        this._workspaceSwitcherPopup = dependecies['WorkspaceSwitcherPopup'] || null;
        
        this._shellVersion = shellVersion;
        this._originals = {};
    }
    
    /**
     * show panel
     *
     * @return void
     */
    panelShow()
    {
        if (!this._originals['panelHeight']) {
            return;
        }
        
        this._main.panel.show();
        this._main.panel.height = this._originals['panelHeight'];
    }
    
    /**
     * hide panel
     *
     * @return void
     */
    panelHide()
    {
        if (!this._originals['panelHeight']) {
            this._originals['panelHeight'] = this._main.panel.height;
        }
        
        this._main.panel.hide();
        this._main.panel.height = 0;
    }
    
    /**
     * show dash
     *
     * @return void
     */
    dashShow()
    {
        this._main.overview.dash.show();
    }
    
    /**
     * hide dash
     *
     * @return void
     */
    dashHide()
    {
        this._main.overview.dash.hide();
    }
    
    /**
     * enable gesture
     *
     * @return void
     */
    gestureEnable()
    {
        global.stage.get_actions().forEach(a => a.enabled = true);
    }
    
    /**
     * disable gesture
     *
     * @return void
     */
    gestureDisable()
    {
        global.stage.get_actions().forEach(a => a.enabled = false);
    }
    
    /**
     * add class name to the UI group
     *
     * @param string className
     *
     * @return void
     */
    UIstyleClassAdd(className)
    {
        this._main.layoutManager.uiGroup.add_style_class_name(className);
    }
    
    /**
     * remove class name from UI group
     *
     * @param string className
     *
     * @return void
     */
    UIstyleClassRemove(className)
    {
        this._main.layoutManager.uiGroup.remove_style_class_name(className);
    }
    
    /**
     * enable background menu
     *
     * @return void
     */
    backgroundMenuEnable()
    {
        if (!this._originals['backgroundMenu']) {
            return;
        }
        
        this._backgroundMenu.BackgroundMenu.prototype.open
        = this._originals['backgroundMenu'];
    }
    
    /**
     * disable background menu
     *
     * @return void
     */
    backgroundMenuDisable()
    {
        if (!this._originals['backgroundMenu']) {
            this._originals['backgroundMenu']
            = this._backgroundMenu.BackgroundMenu.prototype.open;
        }
        
        this._backgroundMenu.BackgroundMenu.prototype.open = () => {};
    }
    
    /**
     * show search
     *
     * @return void
     */
    searchShow()
    {
        if (!this._originals['startSearch']) {
            return;
        }
    
        this._main.overview.viewSelector.startSearch = this._originals['startSearch'];
        this._main.overview.searchEntry.show();
    }
    
    /**
     * hide search
     *
     * @return void
     */
    searchHide()
    {
        if (!this._originals['startSearch']) {
            this._originals['startSearch']
            = this._main.overview.viewSelector.startSearch;
        }
        
        this._main.overview.viewSelector.startSearch = () => {};
        this._main.overview.searchEntry.hide();
    }

    /**
     * enable OSD
     *
     * @return void
     */
    OSDEnable()
    {
        if (!this._originals['osdWindowManager']) {
            return;
        }
        
        this._main.osdWindowManager.show = this._originals['osdWindowManager'];
    }
    
    /**
     * disable OSD
     *
     * @return void
     */
    OSDDisable()
    {
        if (!this._originals['osdWindowManager']) {
            this._originals['osdWindowManager']
            = this._main.osdWindowManager.show;
        }
    
        this._main.osdWindowManager.show = () => {};
    }
    
    /**
     * enable workspace popup
     *
     * @return void
     */
    workspacePopupEnable()
    {
        if (!this._originals['workspaceSwitcherPopup']) {
            return;
        }
    
        this._workspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show
        = this._originals['workspaceSwitcherPopup'];
    }
    
    /**
     * disable workspace popup
     *
     * @return void
     */
    workspacePopupDisable()
    {
        if (!this._originals['workspaceSwitcherPopup']) {
            this._originals['workspaceSwitcherPopup']
            = this._workspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show;
        }
        
        this._workspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show = () => {
           return false;
        };
    }
    
    /**
     * show workspace switcher
     *
     * @return void
     */
    workspaceSwitcherShow()
    {
        if (!this._originals['getAlwaysZoomOut'] ||
            !this._originals['getNonExpandedWidth'])
        {
            return;
        }
    
        this._overviewControls.ThumbnailsSlider.prototype._getAlwaysZoomOut
        = this._originals['getAlwaysZoomOut'];
        this._overviewControls.ThumbnailsSlider.prototype.getNonExpandedWidth
        = this._originals['getNonExpandedWidth'];
    }
    
    /**
     * hide workspace switcher
     *
     * @return void
     */
    workspaceSwitcherHide()
    {
        if (!this._originals['getAlwaysZoomOut']) {
            this._originals['getAlwaysZoomOut']
            = this._overviewControls.ThumbnailsSlider.prototype._getAlwaysZoomOut;
        }
        
        if (!this._originals['getNonExpandedWidth']) {
            this._originals['getNonExpandedWidth']
            = this._overviewControls.ThumbnailsSlider.prototype.getNonExpandedWidth;
        }
    
        this._overviewControls.ThumbnailsSlider.prototype._getAlwaysZoomOut = () => {
            return false;
        };
        this._overviewControls.ThumbnailsSlider.prototype.getNonExpandedWidth = () => {
            return 0;
        };
    }
    
    /**
     * toggle overview visiblity
     *
     * @return void
     */
    overviewToggle()
    {
        this._main.overview.toggle();
    }
    
    /**
     * add element to stage
     *
     * @param object element
     *
     * @return void
     */
    chromeAdd(element)
    {
        this._main.layoutManager.addChrome(element, {
            affectsInputRegion : true,
            affectsStruts : false,
            trackFullscreen : true,
        });
    }
    
    /**
     * remove element from stage
     *
     * @param object element
     *
     * @return void
     */
    chromeRemove(element)
    {
        this._main.layoutManager.removeChrome(element);
    }
}

