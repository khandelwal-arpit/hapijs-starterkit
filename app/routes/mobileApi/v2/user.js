'use strict';

exports.plugin = {  
    pkg: require('../../../../package.json'),
    name : 'user_routes_v2',
    register: async (plugin, options) => {
        const Controllers = {
            user: {
                user: require('../../../controllers/api/user')
            }
        };
        const basePath = '/api/v2/';
        plugin.route([
            {
                method: 'GET',
                path: basePath + 'userDetails',
                config: Controllers.user.user.getUserDetails
            }
        ]);
    }
};
