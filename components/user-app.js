/* global define */
define([
    'can',
    'can/component',
    '../models/user',
    'can/route',
    'can/list/sort'
], function (can, Component, User, route, sortPlugin) {
    'use strict';

    var users = [
        {
            id: 1,
            status: 2,
            name: 'qwerty',
            lastName: '123',
            email: 'mail@mail.com',
            someUnknownData: 'XXX-XX-1231',
            address: 'some country, some city, some street, some building',
            phoneNumberBusiness: '(111) 222-33-44',
            phoneNumberHome: '(222) 333-44-55',
            accounts: [
                {
                    number: 'A2534535345',
                    description: 'fhwjfwefhwbeh bh ebfhwebf hjwef wef'
                }
            ],
            notes: [
                {
                    text: 'save the world',
                    time: '00:00 21 December 2012'
                },
                {
                    text: 'have a lunch',
                    time: '12:00 12 October 2015'
                }
            ]
        },
        {
            id: 2,
            status: 1,
            name: 'asdasd',
            lastName: '345',
            email: '',
            someUnknownData: '',
            address: '',
            phoneNumberHome: '(333) 444-55-66',
            phoneNumberBusiness: '',
            accounts: [
                {
                    number: 'C35353535353',
                    description: 'jwnjnjjfuweifhuwnejnkjn we newjkn jw'
                },
                {
                    number: 'P6456464',
                    description: 'nkdwkhefuhweufhwu hweufwkeuf kwe fkw'
                }
            ],
            notes: [
                {
                    text: 'go to school',
                    time: '08:00 1 September 2016'
                }
            ]
        }
    ];

    return Component.extend({
        tag: 'user-app',
        scope: {
            sort: true,
            User: User,
            users: new User.List(users),
            displayList: can.compute(function () {
                var filter = route.attr('filter'),
                    users = this.attr('users');

                if (filter) {
                    users = this.attr('users').filter(function (user) {
                        return user.attr('fullName').indexOf(filter) !== -1
                            || user.attr('address').indexOf(filter) !== -1
                            || user.attr('phoneNumberBusiness').indexOf(filter) !== -1
                            || user.attr('phoneNumberHome').indexOf(filter) !== -1
                            || user.attr('accounts').filter(function (account) {
                                return account.attr('number').toLowerCase().indexOf(filter.toLowerCase()) !== -1
                            }).attr('length');
                    });
                }

                users.sort('fullName');

                if (!this.attr('sort')) {
                    users.reverse();
                }

                return users;
            }),
            filterUsers: function (e, $el) {
                route.attr('filter', $el.val().trim());
            },
            sortUsers: function () {
                this.attr('sort', !this.attr('sort'));
            }
        },
        events: {
            '{User} created': function (Construct, ev, user) {
                this.scope.attr('users').push(user);
            },
            '{can.route} filter': function (route, ev, filter) {
                this.scope.attr('filter', filter);
            }
        },
        helpers: {
            hasManyAccounts: function (options) {
                var accountsLength = options.context.attr('accounts')
                    ? options.context.attr('accounts').attr('length')
                    : 0;

                return accountsLength > 1 ? (accountsLength + ' accounts: ').bold() : '';
            },
            hasManyNotes: function (options) {
                var notesLength = options.context.attr('notes')
                    ? options.context.attr('notes').attr('length')
                    : 0;

                return notesLength > 1 ? ('+' + notesLength + ' more').bold() : '';
            }
        }
    });
});