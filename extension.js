const Me = imports.misc.extensionUtils.getCurrentExtension();
const {API, Settings, Manager, HotCorner} = Me.imports.lib;
const {Gio, St} = imports.gi;

const Main = imports.ui.main;
const BackgroundMenu = imports.ui.backgroundMenu;
const OverviewControls = imports.ui.overviewControls;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;
const Config = imports.misc.config;

let manager;


function init()
{
}

function enable()
{
    let schemasFolderPath = Me.dir.get_child("schemas").get_path();
    let schemaID = Me.metadata['schema-id'];

    let interfaceSettings = new Gio.Settings({schema_id: 'org.gnome.desktop.interface'});

    let api = new API.API({
        'Main': Main,
        'BackgroundMenu': BackgroundMenu,
        'OverviewControls': OverviewControls,
        'WorkspaceSwitcherPopup': WorkspaceSwitcherPopup,
        'InterfaceSettings' : interfaceSettings,
    }, Config.PACKAGE_VERSION);
    
    let settings = Settings.getSettings(Gio, schemaID, schemasFolderPath);
    let hotCorner = new HotCorner.HotCorner({ 'API': api, 'St': St });
    
    manager = new Manager.Manager({
        'API': api,
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

