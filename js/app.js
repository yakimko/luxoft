/*global require */
require.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        can: '../node_modules/can/dist/amd/can'
    }
});

require([
    'jquery',
    'can/view/mustache',
    'can/route',
    '../models/user',
    '../controls/user-create',
    '../components/user-app'
], function ($, can, route, User, UserCreate) {
    'use strict';

    $(function () {
        route(':filter');

        $('#userapp').html(can.view('app-template'));

        new UserCreate('#usercreate');

        route.ready();
    });
});