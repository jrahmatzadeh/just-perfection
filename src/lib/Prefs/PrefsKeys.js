/**
 * PrefsKeys Library
 *
 * @author     Javad Rahmatzadeh <j.rahmatzadeh@gmail.com>
 * @copyright  2020-2024
 * @license    GPL-3.0-only
 */

/**
 * prefs keys
 */
export class PrefsKeys
{
    /**
     * Current shell version
     *
     * @type {number|null}
     */
    #shellVersion = null;

    /**
     * class constructor
     *
     * @param {number} shellVersion float in major.minor format
     */
    constructor(shellVersion)
    {
        this.#shellVersion = shellVersion;

        /**
         * holds all keys generated by this.#setKey()
         *
         * @member {Object}
         */
        this.keys = {};

        this.#setDefaults();
    }

    /**
     * set all default keys
     *
     * @returns {void}
     */
    #setDefaults()
    {
        this.#setKey(
            'visibility',
            'panel',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'panel-in-overview',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'activities-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'clock-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'keyboard-layout',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'accessibility-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'quick-settings',
            'GtkSwitch',
            this.#shellVersion >= 43,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'screen-sharing-indicator',
            'GtkSwitch',
            this.#shellVersion >= 43,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'screen-recording-indicator',
            'GtkSwitch',
            this.#shellVersion >= 43,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'search',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'dash',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'dash-separator',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );
        
        this.#setKey(
            'visibility',
            'dash-app-running',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'osd',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'workspace-popup',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'workspace',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'background-menu',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'show-apps-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'workspaces-in-app-grid',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'window-preview-caption',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'window-preview-close-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'ripple-box',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'visibility',
            'world-clock',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'weather',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'calendar',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'events-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'visibility',
            'window-menu-take-screenshot-button',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'icons',
            'panel-notification-icon',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'icons',
            'power-icon',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'icons',
            'window-picker-icon',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'behavior',
            'type-to-search',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'behavior',
            'window-demands-attention-focus',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'behavior',
            'window-maximized-on-create',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'behavior',
            'workspace-switcher-should-show',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'behavior',
            'startup-status',
            'AdwActionRow',
            true,
            {
                default: 1,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'behavior',
            'workspace-wrap-around',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: false,
                superminimal: false,
            }
        );

        this.#setKey(
            'behavior',
            'workspace-peek',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'behavior',
            'overlay-key',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'behavior',
            'double-super-to-appgrid',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: false,
            }
        );

        this.#setKey(
            'behavior',
            'switcher-popup-delay',
            'GtkSwitch',
            true,
            {
                default: true,
                minimal: true,
                superminimal: true,
            }
        );

        this.#setKey(
            'customize',
            'controls-manager-spacing-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 22,
            }
        );

        this.#setKey(
            'customize',
            'workspace-background-corner-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 15,
            }
        );

        this.#setKey(
            'customize',
            'top-panel-position',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'clock-menu-position',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'clock-menu-position-offset',
            'AdwSpinRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'workspace-switcher-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'animation',
            'AdwActionRow',
            true,
            {
                default: 1,
                minimal: 1,
                superminimal: 1,
            }
        );

        this.#setKey(
            'customize',
            'dash-icon-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 1,
                superminimal: 0,
            },
            {
                '1': 16,
                '2': 22,
                '3': 24,
                '4': 32,
                '5': 40,
                '6': 48,
                '7': 56,
                '8': 64,
            }
        );

        this.#setKey(
            'customize',
            'notification-banner-position',
            'AdwActionRow',
            true,
            {
                default: 1,
                minimal: 1,
                superminimal: 1,
            }
        );

        this.#setKey(
            'customize',
            'panel-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'panel-button-padding-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'panel-indicator-padding-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'panel-icon-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'osd-position',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'looking-glass-width',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'looking-glass-height',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'customize',
            'alt-tab-window-preview-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            },
            {
                '0': 0,
                '1': 32,
                '2': 64,
                '3': 128,
                '4': 256,
                '5': 512,
            }
        );

        this.#setKey(
            'customize',
            'alt-tab-small-icon-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            },
            {
                '0': 0,
                '1': 32,
                '2': 64,
                '3': 128,
                '4': 256,
                '5': 512,
            }
        );

        this.#setKey(
            'customize',
            'alt-tab-icon-size',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            },
            {
                '0': 0,
                '1': 32,
                '2': 64,
                '3': 128,
                '4': 256,
                '5': 512,
            }
        );

        this.#setKey(
            'customize',
            'max-displayed-search-results',
            'AdwActionRow',
            true,
            {
                default: 0,
                minimal: 0,
                superminimal: 0,
            }
        );

        this.#setKey(
            'override',
            'theme',
            'GtkSwitch',
            true,
            {
                default: false,
                minimal: true,
                superminimal: true,
            }
        );
    }

    /**
     * set key
     *
     * @param {string} category possible values:
     *   - visibility
     *   - icons
     *   - behavior
     *   - customize
     *   - override
     * @param {string} name should be the same as gsettings key name
     * @param {string} widgetType gtk widget type like 'GtkSwitch'.
     * @param {boolean} supported whether supported in the current shell
     * @param {Object} profiles values for each profile. for example:
     *   {default: true, minimal: false}
     * @param {Object} [maps] for example for combobox you can specify 
     *  if the index is 1 use 32 as value:
     *  {1 : 32}
     *
     * @returns {Object} key object that has been set
     */
    #setKey(category, name, widgetType, supported, profiles, maps)
    {
        let id = name.replace(/-/g, '_');
        let widgetName = widgetType.toLowerCase().replace('gtk', '');

        let widgetId
        = (widgetType === 'AdwActionRow' || widgetType === 'AdwSpinRow')
        ?  `${id}_row`
        : `${id}_${widgetName}`;

        if (maps === undefined) {
            maps = {};
        }

        this.keys[id] = {
            category,
            widgetType,
            name,
            id,
            widgetId,
            supported,
            profiles,
            maps,
        }

        return this.keys[id];
    }

    /**
     * delete key
     *
     * @param {string} id key id
     *
     * @returns {void}
     */
    deleteKey(id)
    {
        delete(this.keys[id]);
    }
};

