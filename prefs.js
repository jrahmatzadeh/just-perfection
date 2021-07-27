const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const {Prefs} = Me.imports.lib;
const {Gtk, Gio, GObject} = imports.gi;

const Config = imports.misc.config;
const ShellVersion = parseFloat(Config.PACKAGE_VERSION);


function init () {}

function buildPrefsWidget ()
{
    let gettextDomain = Me.metadata['gettext-domain'];
    let UIFilePath = Me.dir.get_child("ui").get_path() + '/prefs.ui';
    let binFolderPath = Me.dir.get_child("bin").get_path();
    
    ExtensionUtils.initTranslations(gettextDomain);

    let builder = new Gtk.Builder();
    let settings = ExtensionUtils.getSettings(Me.metadata['settings-schema']);
    let prefs = new Prefs.Prefs({
        'Builder': builder,
        'Settings': settings,
        'GObjectBindingFlags' : GObject.BindingFlags,
        'Gtk': Gtk,
        'Gio': Gio,
    }, ShellVersion);
    
    return prefs.getMainPrefs(UIFilePath, binFolderPath, gettextDomain);
}

