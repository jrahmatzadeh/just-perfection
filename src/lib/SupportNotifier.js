/**
 * Support Notifier Library
 *
 * @author     Javad Rahmatzadeh <j.rahmatzadeh@gmail.com>
 * @copyright  2020-2025
 * @license    GPL-3.0-only
 */

const TYPE = {
    NEVER: 0,
    NEW_RELEASE: 1,
    MONTHLY: 2,
};

/**
 * Support Notifier
 */
export class SupportNotifier
{
    /**
     * Current shell version
     *
     * @type {number|null}
     */
    #shellVersion = null;

    /**
     * Current extension version
     *
     * @type {number|null}
     */
    #extensionVersion = null;

    /**
     * Instance of Gio.Settings
     *
     * @type {Settings|null}
     */
    #settings = null;

    /**
     * Instance of current Extension
     *
     * @type {Extension|null}
     */
    #extension = null;

    /**
     * Class Constructor
     *
     * @param {Object} dependencies
     *   'MessageTray' reference to ui::messageTray
     *   'GLib' reference to GLib
     *   'Gio' reference to Gio
     * @param {number} shellVersion float in major.minor format
     * @param {number} extensionVersion integer
     * @param {Object} extension Extension
     */
    constructor(dependencies, shellVersion, extensionVersion, extension)
    {
        this._messageTray = dependencies['MessageTray'] || null;
        this._glib = dependencies['GLib'] || null;
        this._gio = dependencies['Gio'] || null;
        this.#settings = dependencies['Settings'] || null;

        this.#shellVersion = shellVersion;
        this.#extensionVersion = extensionVersion;
        this.#extension = extension;

        this.#registerSettingsSignals();
    }

    /**
     * register all signals for settings
     *
     * @returns {void}
     */
    #registerSettingsSignals()
    {
        this.#settings.connect('changed::support-notifier-type', () => {
            this.restart();
        });
    }

    /**
     * start support notifier service
     *
     * @returns {void}
     */
    start()
    {
        let type = this.#settings.get_int('support-notifier-type');

        if (type === TYPE.NEW_RELEASE) {
            if (!this.#isShownForCurrentVersion()) {
                this.#showNotification();
            }
        } else if (type === TYPE.MONTHLY) {
            if (this._monthly_timeout) {
                this._glib.source_remove(this._monthly_timeout);
            }
            this._monthly_timeout = this._glib.timeout_add_seconds(
                this._glib.PRIORITY_LOW,
                300,
                () => {
                    if (!this.#isShownOneMonthAgo()) {
                        this.#showNotification();
                    }
                    return this._glib.SOURCE_CONTINUE;
                }
            );
        }
    }

    /**
     * stop support notifier service
     *
     * @returns {void}
     */
    stop()
    {
        if (this._monthly_timeout) {
            this._glib.source_remove(this._monthly_timeout);
            this._monthly_timeout = null;
        }
    }

    /**
     * restart support notifier service
     *
     * @returns {void}
     */
    restart()
    {
        this.stop();
        this.start();
    }

    /**
     * whether the notification showed for the current extension version
     *
     * @returns {boolean}
     */
    #isShownForCurrentVersion()
    {
        let showedVersion = this.#settings.get_int('support-notifier-showed-version');

        return this.#extensionVersion <= showedVersion;
    }

    /**
     * whether a month passed relative to the last notification show
     *
     * @returns {boolean}
     */
    #isShownOneMonthAgo()
    {
        let showedTime = this.#settings.get_uint64('support-notifier-showed-time');

        let showedDate = new Date(showedTime);
        let now = Date.now();
        let oneMonthBeforeNow = now - 2592000;

        return oneMonthBeforeNow < showedDate;
    }

    /**
     * show notification
     * 
     * @param {string} title
     * @param {string} body
     *
     * @returns {void}
     */
    #showNotification()
    {
        if (this.#shellVersion < 46) {
            return;
        }

        let title = "Support Just Perfection Extension";
        let body = "The future of the Just Perfection extension depends on your support! " +
            "Your donation will help add new features and updates. " +
            "Please consider making a donation." +
            "\r\r" +
            "<i>Crypto donations are preferred since there are no platform fees, " +
            "and 100% of your donation is received directly.</i>";

        const source = this._messageTray.getSystemSource();

        source.title = 'Just Perfection Extension';
        source.iconName = 'application-x-addon-symbolic';

        const notification = new this._messageTray.Notification({
            source,
            title,
            body,
            useBodyMarkup: true,
            resident: true,
            iconName: 'emblem-favorite-symbolic',
            urgency: this._messageTray.Urgency.CRITICAL
        });

        notification.addAction('Buy Me a Coffee', () => {
            this._gio.AppInfo.launch_default_for_uri('https://www.buymeacoffee.com/justperfection', null);
            notification.destroy();
        });

        notification.addAction('Donate Crypto', () => {
            this.#extension.openPreferences();
            notification.destroy();
        });

        notification.addAction('Remind me later!', () => {
            this.#settings.set_int('support-notifier-type', TYPE.MONTHLY);
            notification.destroy();
        });

        source.addNotification(notification);

        this.#settings.set_int('support-notifier-showed-version', this.#extensionVersion);
        this.#settings.set_uint64('support-notifier-showed-time', Date.now());
    }
}