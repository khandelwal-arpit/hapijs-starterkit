'use strict';

exports.plugin = {  
    pkg: require('../../../../package.json'),
    name : 'signup_routes_v1',
    register: async (server, options) => {
        const Controllers = {
            auth: {
                signup: require('../../../controllers/api/signup')
            }
        };
        const basePath = '/api/v1/';
        server.route([
            {
                method: 'POST',
                path: basePath + 'signUp',
                config: Controllers.auth.signup.userSignUp
            }
        ]);
    
    }
};
