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
     *   'InterfaceSettings' reference to Gio::Settings for 'org.gnome.desktop.interface'
     *   'SearchController' reference to ui::searchController
     *   'ViewSelector' reference to ui::viewSelector
     *   'WorkspaceThumbnail' reference to ui::workspaceThumbnail
     * @param float shellVersion
     */
    constructor(dependecies, shellVersion)
    {
        this._main = dependecies['Main'] || null;
        this._backgroundMenu = dependecies['BackgroundMenu'] || null;
        this._overviewControls = dependecies['OverviewControls'] || null;
        this._workspaceSwitcherPopup = dependecies['WorkspaceSwitcherPopup'] || null;
        this._interfaceSettings = dependecies['InterfaceSettings'] || null;
        this._searchController = dependecies['SearchController'] || null;
        this._viewSelector = dependecies['ViewSelector'] || null;
        this._workspaceThumbnail = dependecies['WorkspaceThumbnail'] || null;
        
        this._shellVersion = shellVersion;
        this._originals = {};
        
        // bool
        // true means seach entry is visible, false otherwise
        this._searchEntryVisible = true;
        
        // float
        // last workspace switcher size
        this._workspaceSwitcherLastSize
        = (this._workspaceThumbnail && this._shellVersion >= 40)
        ? this._workspaceThumbnail.MAX_THUMBNAIL_SCALE
        : 0.0;
    }
    
    /**
     * prepare everything needed for API
     *
     * @return void
     */
    open()
    {
        this.UIstyleClassAdd(this._getAPIClassname('shell-version'));
    }
    
    /**
     * remove everything from GNOME Shell been added by this class 
     *
     * @return void
     */
    close()
    {
        this.UIstyleClassRemove(this._getAPIClassname('shell-version'));
        this._fixLonelyOverview(true);
        this._startSearchSignal(false);
    }
    
    /**
     * get the css classname for API
     *
     * @param string type possible types
     *  shell-version
     *  lonely-oveview
     *  no-search
     *  no-workspace
     *  no-panel
     *  panel-corner
     *  no-window-picker-icon
     *  type-to-search
     *  no-power-icon
     *
     * @return string
     */
    _getAPIClassname(type)
    {
        let starter = 'just-perfection-api-';
        
        let possibleTypes = [
            'shell-version',
            'lonely-oveview',
            'no-search',
            'no-workspace',
            'no-panel',
            'panel-corner',
            'no-window-picker-icon',
            'type-to-search',
            'no-power-icon',
        ];
        
        if (!possibleTypes.includes(type)) {
            return ''
        }
        
        if (type === 'shell-version') {
            let shellVerMajor = Math.trunc(this._shellVersion);
            return starter + 'gnome' + shellVerMajor;
        }
        
        return starter + type;
    }
    
    /**
     * helps the GNOME Shell 40 window picker workspaces stay side by side
     * when all the overview elements are disabled
     *
     * @param bool revert true means revert the fix, false means add the fix
     *
     * @return void
     */
    _fixLonelyOverview(revert)
    {
        // @TODO fix when we are closer to the GNOME Shell 40 release
        // lets step back until we are closer to the GNOME Shell 40 release
        // at this point we are seeing so much changes on window picker
        // .controls-manager in css can have background image but it makes
        // the whole experience more confusing. Maybe adding a layer with opacity
        // on that image can make it better but that shouldn't be an option only
        // for lonely overview mode. It should be an option for normal mode too.
        // and make the other window pickers available to the current view.
        // currently when we are in loneley overview we don't see too much of
        // the other window pickers as GNOME Shell 40 intented.
        return;
        
        if (this._shellVersion < 40) {
            return;
        }
        
        let className = this._getAPIClassname('lonely-oveview');
        
        if (revert) {
            this.UIstyleClassRemove(className);
            return;
        }
        
        let searchVisible = this._main.overview.searchEntry.visible;
        let dashVisible = this._main.overview.dash.visible;
        let workspaceSwitcherVisible = this.isWorkspaceSwitcherVisible();
        
        if (!searchVisible && !dashVisible && !workspaceSwitcherVisible) {
            this.UIstyleClassAdd(className);
        } else {
            this.UIstyleClassRemove(className);
        }
    }
    
    /**
     * allow shell theme to do whatever it likes to panel corner
     *
     * @return void
     */
    panelCornerSetDefault()
    {
        let classnameStarter = this._getAPIClassname('panel-corner');
        
        for (let size = 0; size <= 60; size++) {
            this.UIstyleClassRemove(classnameStarter + size);
        }
    }
    
    /**
     * change panel corner size
     *
     * @param int size 0 to 60
     *
     * @return void
     */
    panelCornerSetSize(size)
    {
        this.panelCornerSetDefault();
        
        if (size > 60 || size < 0) {
            return;
        }
    
        let classnameStarter = this._getAPIClassname('panel-corner');
        
        this.UIstyleClassAdd(classnameStarter + size);
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
        
        this.UIstyleClassRemove(this._getAPIClassname('no-panel'));
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
        
        // when panel is hidden and search entry is visible,
        // the search entry gets too close to the top, so we fix it with margin
        // on GNOME 3 we need to have top and bottom margin for correct proportion
        // but on GNOME 40 we don't need to keep proportion but give it more
        // top margin to keep it less close to top
        this.UIstyleClassAdd(this._getAPIClassname('no-panel'));
    }
    
    /**
     * check whether panel is visible
     *
     * @return bool
     */
    isPanelVisible()
    {
        return this._main.panel.visible;
    }
    
    /**
     * show dash
     *
     * @return void
     */
    dashShow()
    {
        this._main.overview.dash.show();
        
        if (this._shellVersion >= 40) {
            this._main.overview.dash.height = -1;
            // reset icon size
            this._main.overview.dash._maxWidth = -1;
        } else {
            this._main.overview.dash.width = -1;
            this._main.overview.dash._maxHeight = -1;
        }
        
        this._fixLonelyOverview(false);
    }
    
    /**
     * hide dash
     *
     * @return void
     */
    dashHide()
    {
        this._main.overview.dash.hide();
        
        if (this._shellVersion >= 40) {
            this._main.overview.dash.height = 0;
        } else {
            this._main.overview.dash.width = 0;
        }
        
        this._fixLonelyOverview(false);
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
     * @param string classname
     *
     * @return void
     */
    UIstyleClassAdd(classname)
    {
        this._main.layoutManager.uiGroup.add_style_class_name(classname);
    }
    
    /**
     * remove class name from UI group
     *
     * @param string classname
     *
     * @return void
     */
    UIstyleClassRemove(classname)
    {
        this._main.layoutManager.uiGroup.remove_style_class_name(classname);
    }
    
    /**
     * check whether UI group has class name
     *
     * @param string classname
     *
     * @return bool
     */
    UIstyleClassContain(classname)
    {
        return this._main.layoutManager.uiGroup.has_style_class_name(classname);
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
     * @param bool fake true means it just needs to do the job but don't need to
     *  change the search visiblity status
     *
     * @return void
     */
    searchEntryShow(fake)
    {
        this.UIstyleClassRemove(this._getAPIClassname('no-search'));
        
        this._main.overview.searchEntry.show();
        this._fixLonelyOverview(false);
        
        if (!fake) {
            this._searchEntryVisible = true;
        }
    }
    
    /**
     * hide search
     *
     * @param bool fake true means it just needs to do the job but don't need to
     *  change the search visiblity status
     *
     * @return void
     */
    searchEntryHide(fake)
    {
        this.UIstyleClassAdd(this._getAPIClassname('no-search'));
        
        this._main.overview.searchEntry.hide();
        this._fixLonelyOverview(false);
        
        if (!fake) {
            this._searchEntryVisible = false;
        }
    }

    /**
     * enable start search
     *
     * @return void
     */
    startSearchEnable()
    {
        this._startSearchSignal(true);
        
        if (!this._originals['startSearch']) {
            return;
        }
        
        let viewSelector
        = this._main.overview.viewSelector || this._main.overview._overview.viewSelector;
        
        if (this._shellVersion >= 40 && this._searchController) {
            this._searchController.SearchController.prototype.startSearch
            = this._originals['startSearch'];
        } else {
            viewSelector.startSearch = this._originals['startSearch'];
        }
    }
    
    /**
     * disable start search
     *
     * @return void
     */
    startSearchDisable()
    {
        this._startSearchSignal(false);
        
        let viewSelector
        = this._main.overview.viewSelector || this._main.overview._overview.viewSelector;
        
        if (!this._originals['startSearch']) {
            this._originals['startSearch']
            = (this._shellVersion >= 40 && this._searchController)
            ? this._searchController.SearchController.prototype.startSearch
            : viewSelector.startSearch;
        }
        
        if (this._shellVersion >= 40 && this._searchController) {
            this._searchController.SearchController.prototype.startSearch = () => {};
        } else {
            viewSelector.startSearch = () => {};
        }
    }

    /**
     * add search signals that needs to be show search entry when the
     * search entry is hidden
     *
     * @param bool add true means add the signal, false means remove the signal
     *
     * @return void
     */
    _startSearchSignal(add)
    {
        let controller
        = this._main.overview.viewSelector ||
          this._main.overview._overview.viewSelector || 
          this._main.overview._overview.controls._searchController;
    
        // remove
        if (!add) {
            if (this._searchActiveSignal) {
                controller.disconnect(this._searchActiveSignal);
                this._searchActiveSignal = null;
            }
            return;
        }
        
        // add
        if (this._searchActiveSignal) {
            return;
        }
    
        let bySearchController = this._shellVersion >= 40;

        let signalName = (bySearchController) ? 'notify::search-active' : 'page-changed';

        this._searchActiveSignal = controller.connect(signalName, () => {
        
            if (this._searchEntryVisible) {
                return;
            }
        
            let inSearch
            = (bySearchController)
            ? controller.searchActive
            : (controller.getActivePage() === this._viewSelector.ViewPage.SEARCH);
            
            if (inSearch) {
                this.UIstyleClassAdd(this._getAPIClassname('type-to-search'));
                this.searchEntryShow(true);
            } else {
                this.UIstyleClassRemove(this._getAPIClassname('type-to-search'));
                this.searchEntryHide(true);
            }
        });
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
        if (this._shellVersion < 40) {
        
            if (!this._originals['getAlwaysZoomOut'] ||
                !this._originals['getNonExpandedWidth'])
            {
                return;
            }
            
            let TSProto = this._overviewControls.ThumbnailsSlider.prototype;
            
            TSProto._getAlwaysZoomOut = this._originals['getAlwaysZoomOut'];
            TSProto.getNonExpandedWidth = this._originals['getNonExpandedWidth'];
        }
        
        // it should be before setting the switcher size
        // because the size can be changed by removing the api class
        this.UIstyleClassRemove(this._getAPIClassname('no-workspace'));
        
        if (this._workspaceSwitcherLastSize) {
            this.workspaceSwitcherSetSize(this._workspaceSwitcherLastSize, false);
        } else {
            this.workspaceSwitcherSetDefaultSize();
        }
        
        this._fixLonelyOverview(false);
    }
    
    /**
     * hide workspace switcher
     *
     * @return void
     */
    workspaceSwitcherHide()
    {
        if (this._shellVersion < 40) {
        
            let TSProto = this._overviewControls.ThumbnailsSlider.prototype;
        
            if (!this._originals['getAlwaysZoomOut']) {
                this._originals['getAlwaysZoomOut'] = TSProto._getAlwaysZoomOut;
            }
            
            if (!this._originals['getNonExpandedWidth']) {
                this._originals['getNonExpandedWidth'] = TSProto.getNonExpandedWidth;
            }
            
            TSProto._getAlwaysZoomOut = () => {
                return false;
            };
            TSProto.getNonExpandedWidth = () => {
                return 0;
            };
        }
        
        this.workspaceSwitcherSetSize(0.0, true);
        
        // on GNOME 3.38
        //   fix extra space that 3.38 leaves for no workspace with css
        // on GNOME 40
        //   we can hide the workspace only with css by scale=0 and
        //   no padding
        this.UIstyleClassAdd(this._getAPIClassname('no-workspace'));
        
        this._fixLonelyOverview(false);
    }
    
    /**
     * check whether workspace switcher is visible
     *
     * @return bool
     */
    isWorkspaceSwitcherVisible()
    {
        return !this.UIstyleClassContain(this._getAPIClassname('no-workspace'));
    }
    
    /**
     * set workspace switcher to its default size
     *
     * @return void
     */
    workspaceSwitcherSetDefaultSize()
    {
        if (this._shellVersion < 40) {
            return;
        }
        
        if (typeof this._originals['MAX_THUMBNAIL_SCALE'] === 'undefined') {
            return;
        }
        
        let size = this._originals['MAX_THUMBNAIL_SCALE'];
        
        if (this.isWorkspaceSwitcherVisible()) {
            this._workspaceThumbnail.MAX_THUMBNAIL_SCALE = size;
        }
        
        this._workspaceSwitcherLastSize = size;
    }
    
    /**
     * set workspace switcher size
     *
     * @param float size
     * @param bool fake true means don't change this._workspaceSwitcherLastSize,
     *   false otherwise
     *
     * @return void
     */
    workspaceSwitcherSetSize(size, fake)
    {
        if (this._shellVersion < 40) {
            return;
        }
        
        if (typeof this._originals['MAX_THUMBNAIL_SCALE'] === 'undefined') {
            this._originals['MAX_THUMBNAIL_SCALE']
            = this._workspaceThumbnail.MAX_THUMBNAIL_SCALE;
        }
        
        if (this.isWorkspaceSwitcherVisible()) {
            this._workspaceThumbnail.MAX_THUMBNAIL_SCALE = size;
        }
        
        if (!fake) {
            this._workspaceSwitcherLastSize = size;
        }
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
    
    /**
     * show activities button
     *
     * @return void
     */
    activitiesButtonShow()
    {
        if (!this.isLocked()) {
            this._main.panel.statusArea['activities'].container.show();
        }
    }
    
    /**
     * hide activities button
     *
     * @return void
     */
    activitiesButtonHide()
    {
        this._main.panel.statusArea['activities'].container.hide();
    }
    
    /**
     * show app menu
     *
     * @return void
     */
    appMenuShow()
    {
        if (!this.isLocked()) {
            this._main.panel.statusArea['appMenu'].container.show();
        }
    }
    
    /**
     * hide app menu
     *
     * @return void
     */
    appMenuHide()
    {
        this._main.panel.statusArea['appMenu'].container.hide();
    }
    
    /**
     * show date menu
     *
     * @return void
     */
    dateMenuShow()
    {
        if (!this.isLocked()) {
            this._main.panel.statusArea['dateMenu'].container.show();
        }
    }
    
    /**
     * hide date menu
     *
     * @return void
     */
    dateMenuHide()
    {
        this._main.panel.statusArea['dateMenu'].container.hide();
    }
    
    /**
     * show keyboard layout
     *
     * @return void
     */
    keyboardLayoutShow()
    {
        this._main.panel.statusArea['keyboard'].container.show();
    }
    
    /**
     * hide keyboard layout
     *
     * @return void
     */
    keyboardLayoutHide()
    {
        this._main.panel.statusArea['keyboard'].container.hide();
    }
    
    /**
     * show accessibility menu
     *
     * @return void
     */
    accessibilityMenuShow()
    {
        this._main.panel.statusArea['a11y'].container.show();
    }
    
    /**
     * hide accessibility menu
     *
     * @return void
     */
    accessibilityMenuHide()
    {
        this._main.panel.statusArea['a11y'].container.hide();
    }
    
    /**
     * show aggregate menu
     *
     * @return void
     */
    aggregateMenuShow()
    {
        this._main.panel.statusArea['aggregateMenu'].container.show();
    }
    
    /**
     * hide aggregate menu
     *
     * @return void
     */
    aggregateMenuHide()
    {
        this._main.panel.statusArea['aggregateMenu'].container.hide();
    }
    
    /**
     * set 'enableHotCorners' original value
     *
     * @return void
     */
    _setEnableHotCornersOriginal()
    {
        if (typeof this._originals['enableHotCorners'] !== 'undefined') {
            return;
        }
        
        this._originals['enableHotCorners']
        = this._interfaceSettings.get_boolean('enable-hot-corners');
    }
    
    /**
     * enable hot corners
     *
     * @return void
     */
    hotCornersEnable()
    {
        this._setEnableHotCornersOriginal();
        this._interfaceSettings.set_boolean('enable-hot-corners', true);
    }
    
    /**
     * disable hot corners
     *
     * @return void
     */
    hotCornersDisable()
    {
        this._setEnableHotCornersOriginal();
        this._interfaceSettings.set_boolean('enable-hot-corners', false);
    }
    
    /**
     * set the hot corners to default value
     *
     * @return void
     */
    hotCornersDefault()
    {
        this._setEnableHotCornersOriginal();
        
        this._interfaceSettings.set_boolean('enable-hot-corners',
            this._originals['enableHotCorners']);
    }
    
    /**
     * check whether lock dialog is currently showing
     *
     * @return bool;
     */
    isLocked()
    {
        if (this._main.sessionMode.currentMode === 'unlock-dialog') {
            return true;
        }
        
        return false;
    }
    
    /**
     * enable window picker icon
     *
     * @return void
     */
    windowPickerIconEnable()
    {
        if (this._shellVersion < 40) {
            return;
        }
        
        this.UIstyleClassRemove(this._getAPIClassname('no-window-picker-icon'));
    }
    
    /**
     * disable window picker icon
     *
     * @return void
     */
    windowPickerIconDisable()
    {
        if (this._shellVersion < 40) {
            return;
        }
        
        this.UIstyleClassAdd(this._getAPIClassname('no-window-picker-icon'));
    }
    
    /**
     * show power icon
     *
     * @return void
     */
    powerIconShow()
    {
        this.UIstyleClassRemove(this._getAPIClassname('no-power-icon'));
    }
    
    /**
     * hide power icon
     *
     * @return void
     */
    powerIconHide()
    {
        this.UIstyleClassAdd(this._getAPIClassname('no-power-icon'));
    }
    
    /**
     * move panel position
     *
     * @param string position 'top', 'bottom'
     *
     * @return void
     */
    panelSetPosition(position)
    {
        if (!this._originals['panelHeight']) {
            this._originals['panelHeight'] = this._main.panel.height;
        }
    
        if (position === 'top') {
            if (this._workareasChangedSignal) {
                global.display.disconnect(this._workareasChangedSignal);
            }
            this._main.layoutManager.panelBox.set_position(0, 0);
            return;
        }
        
        let pMonitor = this._main.layoutManager.primaryMonitor;
        let y = pMonitor.height - this._originals['panelHeight'];
        
        this._main.layoutManager.panelBox.set_position(0, y);
        
        if (!this._workareasChangedSignal) {
            this._workareasChangedSignal
            = global.display.connect('workareas-changed', () => {
                this.panelSetPosition('bottom');
            });
        }
    }
}

