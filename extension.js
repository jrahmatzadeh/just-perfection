const Main = imports.ui.main;
const St = imports.gi.St;
const ThumbnailsSlider = imports.ui.overviewControls.ThumbnailsSlider.prototype;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;
const backgroundMenu = imports.ui.backgroundMenu;

let osdWindowManagerOriginal;
let startSearchOriginal;
let getAlwaysZoomOutOriginal;
let getNonExpandedWidthOriginal;
let backgroundMenuOriginal;
let wspOriginal;
let overviewButton;
let isInOverviewButton = false;

function initGlobals() {

  // osd
  osdWindowManagerOriginal = Main.osdWindowManager.show;
  
  // search
  startSearchOriginal = Main.overview.viewSelector.startSearch;
  
  // workspace
  getAlwaysZoomOutOriginal = ThumbnailsSlider._getAlwaysZoomOut;
  getNonExpandedWidthOriginal = ThumbnailsSlider.getNonExpandedWidth;
  
  // workspace switcher
  wspOriginal = WorkspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show;
  
  // background menu
  backgroundMenuOriginal = backgroundMenu.BackgroundMenu.prototype.open;
  
  // overview button
  overviewButton = new St.Bin({
    reactive : true,
    can_focus : false,
    track_hover : true,
    height : 2,
    width : 2,
    x : 0,
    y : 0,
  });
  
  overviewButton.connect("enter-event", () => {
  
    if (isInOverviewButton) {
       return false;
    }
  
    isInOverviewButton = true;
    
    if (Main.overview.visible) {
      Main.overview.hide();
    } else {
      Main.overview.show();
    }
  });
  
  overviewButton.connect("leave-event", () => {
    isInOverviewButton = false;
  });
}

function init() {}

function enable() {

  initGlobals();

  // top panel
  Main.panel.hide();
  
  // osd
  Main.osdWindowManager.show = () => {};
  
  // dash
  Main.overview.dash.hide();
  
  // search
  Main.overview.searchEntry.hide();
  Main.overview.viewSelector.startSearch = () => {};
  
  // workspace
  ThumbnailsSlider._getAlwaysZoomOut = () => { return false; };
  ThumbnailsSlider.getNonExpandedWidth = () => { return 0; };
  
  // workspace switcher
  WorkspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show = () => {
    return false;
  };
  
  // disable gesture
  global.stage.get_actions().forEach(a => a.enabled = false);
  
  // disable background menu
  backgroundMenu.BackgroundMenu.prototype.open = () => {};
  
  // overview button
  Main.layoutManager.addChrome(overviewButton, {
    affectsInputRegion : true,
    affectsStruts : false,
    trackFullscreen : true,
  });
}

function disable() {

  // top panel
  Main.panel.show();
  
  // osd
  Main.osdWindowManager.show = osdWindowManagerOriginal;
  
  // dash
  Main.overview.dash.show();
  
  // search
  Main.overview.searchEntry.show(); 
  Main.overview.viewSelector.startSearch = startSearchOriginal;
	
  // workspace
  ThumbnailsSlider._getAlwaysZoomOut = getAlwaysZoomOutOriginal;
  ThumbnailsSlider.getNonExpandedWidth = getNonExpandedWidthOriginal;
  
  // workspace switcher
  WorkspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show = wspOriginal;
  
  // gesture
  global.stage.get_actions().forEach(a => a.enabled = true);
  
  // disable background menu
  backgroundMenu.BackgroundMenu.prototype.open = backgroundMenuOriginal;
  
  // overview button
  Main.layoutManager.removeChrome(overviewButton);
}

