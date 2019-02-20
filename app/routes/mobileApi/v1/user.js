'use strict';

exports.plugin = {  
    pkg: require('../../../../package.json'),
    name : 'user_routes_v1',
    register: async (server, options) => {
        const Controllers = {
            user: {
                user: require('../../../controllers/api/user')
            }
        };
        const basePath = '/api/v1/';
        server.route([
            {
                method: 'GET',
                path: basePath + 'userDetails',
                config: Controllers.user.user.getUserDetails
            }
        ]);
    
    }
};
