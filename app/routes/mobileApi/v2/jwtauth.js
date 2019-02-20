'use strict';

exports.plugin = {  
    pkg: require('../../../../package.json'),
    name : 'jwtauth_routes_v2',
    register: async (server, options) => {
        const Controllers = {
            auth: {
                login: require('../../../controllers/api/jwtlogin'),
            }
        };
        const basePath = '/api/v2/';
        server.route([
            {
                method: 'POST',
                path: basePath + 'login',
                config: Controllers.auth.login.postCredentials
            }
        ]);
    }
};
