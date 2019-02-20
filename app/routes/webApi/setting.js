'use strict';

exports.plugin = {  
    pkg: require('../../../package.json'),
    name : 'setting_routes',
    register: async (server, options) => { 
        const Controllers = {
            webapi: {
                users: require('../../controllers/web/setting')
            }
        };
        server.route([
            {
                method: 'GET',
                path: '/setting',
                config: Controllers.webapi.users.setting
            },
            {
                method: 'POST',
                path: '/password',
                config: Controllers.webapi.users.changePassword
            },
            {
                method: 'GET',
                path: '/forgot',
                config: Controllers.webapi.users.showForgotPassword
            },
            {
                method: 'POST',
                path: '/forgot',
                config: Controllers.webapi.users.sendPasswordResetLink
            },
            {
                method: 'GET',
                path: '/reset/{token}',
                config: Controllers.webapi.users.showResetPassword
            },
            {
                method: 'POST',
                path: '/reset',
                config: Controllers.webapi.users.resetPassword
            }
        ]);
    }
};
