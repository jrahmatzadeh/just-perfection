const Me = imports.misc.extensionUtils.getCurrentExtension();
const {Settings, Manager, HotCorner} = Me.imports.lib;
const {Gio, St} = imports.gi;

const Main = imports.ui.main;
const BackgroundMenu = imports.ui.backgroundMenu;
const ThumbnailsSlider = imports.ui.overviewControls.ThumbnailsSlider;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;

let manager;


function init()
{
}

function enable()
{
    let schemasFolderPath = Me.dir.get_child("schemas").get_path();
    let schemaID = Me.metadata['schema-id'];

    let settings = Settings.getSettings(Gio, schemaID, schemasFolderPath);
    let hotCorner = new HotCorner.HotCorner({ 'Main': Main, 'St': St});
  
    manager = new Manager.Manager({
        'Main': Main,
        'BackgroundMenu': BackgroundMenu,
        'ThumbnailsSlider': ThumbnailsSlider,
        'WorkspaceSwitcherPopup': WorkspaceSwitcherPopup, 
        'Settings': settings,
        'HotCorner': hotCorner,
    });
        
    manager.registerSettingsSignals();
    manager.applyAll();
}

function disable()
{
    manager.revertAll();
    manager = null;
}

