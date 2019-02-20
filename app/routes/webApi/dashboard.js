'use strict';
exports.plugin = {  
    pkg: require('../../../package.json'),
    name : 'dashboard_routes',
    register: async (server, options) => {
        const Controllers = {
            dashboard: {
                dashboard: require('../../controllers/web/dashboard')
            }
        };
        server.route([
            {
                method: 'GET',
                path: '/dashboard',
                config: Controllers.dashboard.dashboard.showDashboard
            }
        ]);
    }
};

