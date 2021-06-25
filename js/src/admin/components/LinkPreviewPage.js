/*
 * This file is part of malago/flarum-linkpreview
 *
 *  Copyright (c) 2021 Miguel A. Lago
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */
import ExtensionPage from 'flarum/components/ExtensionPage';
import Button from "flarum/components/Button";
import saveSettings from "flarum/utils/saveSettings";
import Stream from 'flarum/utils/Stream';
import withAttr from 'flarum/utils/withAttr';

export default class UploadPage extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);
        // get the saved settings from the database
        const settings = app.data.settings;

        this.values = {};

        // our package prefix (to be added to every field and checkbox in the setting table)
        this.settingsPrefix = 'malago.linkpreview';

        this.settings = [
    	    'key',
        ];

        this.settings.forEach((key) => (this.values[key] = Stream(settings[this.addPrefix(key)])));

    }

    /**
     * Show the actual ImageUploadPage.
     *
     * @returns {*}
     */
    content() {

        return [
            m('div', {className: 'LinkPreviewPage'}, [
                m('div', { className: 'container' }, [
                    m('form', {onsubmit: this.onsubmit.bind(this)},
                        m('h3', app.translator.trans('malago-linkpreview.admin.title')),

                        this.settings.map(setting => {
                            return m('fieldset', {className: 'LinkPreviewPage-' + setting}, [
                                m('label', {}, app.translator.trans('malago-linkpreview.admin.' + setting + '.title')),
                                m('textarea.FormControl', {
                                    value: this.values[setting]() || null,
                                    placeholder: app.translator.trans('malago-linkpreview.admin.' + setting + '.placeholder'),
                                    oninput: withAttr('value', this.values[setting])
                                })
                            ])
                        }),

                        Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            disabled: !this.changed()
                        }, app.translator.trans('malago-linkpreview.admin.save')),
                    ),
                ]),
            ])
        ];
    }

    /**
     * Checks if the values of the fields and checkboxes are different from
     * the ones stored in the database
     *
     * @returns boolean
     */
    changed() {
        const settingsChecked = this.settings.some(key => this.values[key]() !== app.data.settings[this.addPrefix(key)]);
        return settingsChecked;
    }

    /**
     * Saves the settings to the database and redraw the page
     *
     * @param e
     */
    onsubmit(e) {
        // prevent the usual form submit behaviour
        e.preventDefault();


        // if the page is already saving, do nothing
        if (this.loading) return;

        // prevents multiple savings
        this.loading = true;

        // remove previous success popup
        app.alerts.dismiss(this.successAlert);

        const settings = {};

        // gets all the values from the form
        this.settings.forEach(key => settings[this.addPrefix(key)] = this.values[key]());

        // actually saves everything in the database
        saveSettings(settings)
            .then(() => {
                // on success, show popup
                app.alerts.show({ type: 'success' }, app.translator.trans('core.admin.basics.saved_message'));
            })
            .catch(() => {
            })
            .then(() => {
                // return to the initial state and redraw the page
                this.loading = false;
                window.location.reload();
            });
    }

    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}
