'use strict';

exports.plugin = {  
    pkg: require('../../../package.json'),
    name : 'api_routes',
    register: async (server, options) => {
        const Controllers = {
            webapi: {
                users: require('../../controllers/web/user')
            }
        };
        server.route([
            {
                method: 'GET',
                path: '/profile',
                config: Controllers.webapi.users.showProfile
            },
            {
                method: 'POST',
                path: '/profile',
                config: Controllers.webapi.users.editProfile
            }
        ]);
    }
};
