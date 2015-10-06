/*global define */
define(['can', 'can/util/fixture'], function (can, fixture) {
    'use strict';

    fixture('POST /users', function () {
        return {};
    });

    return can.Model.extend({
        create: 'POST /users'
    }, {
        fullName: can.compute(function () {
            return this.name + ' ' + this.lastName;
        })
    });
});