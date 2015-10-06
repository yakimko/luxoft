/* global define */
define([
    'can',
    'can/control',
    '../models/user'
], function (can, Control, User) {
    return Control.extend({
        show: function () {
            this.element.html(can.view('create-template'));

            this.element.slideDown(200);
        },
        hide: function () {
            this.element.slideUp(200);
        },
        '{document} #new-client click': function () {
            this.show();
        },
        createUser: function () {
            var form = this.element.find('form'),
                values = can.deparam(form.serialize());

            if (values.name.trim()) {
                values.accounts = [];
                values.notes = [];

                new User(values).save();
                this.hide();
            }
        },
        '.save click': function () {
            this.createUser();
        },
        '.cancel click': function () {
            this.hide();
        }
    });
});