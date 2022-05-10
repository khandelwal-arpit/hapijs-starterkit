'use strict';

const Mongoose = require('mongoose');
const Glob = require('glob');

async function User_findDetails(userId) {
    let found = await global.UserModel.findOne(
        {_id : Mongoose.Types.ObjectId(userId)},
        '-password -salt -__v -resetPasswordExpires -resetPasswordToken'
        );
    return found;
}

async function User_create(userData) {
    let user = new global.UserModel(userData);
    let savedUser = await user.save();
    return savedUser;
}

async function User_findOne(query) {
    let user = await global.UserModel.findOne(query);
    return user;
}

async function User_findByIdAndUpdate(id, update, options) {
    let user = await global.UserModel.findByIdAndUpdate(id, update, options);
    return user;
}

exports.plugin = {  
    register: (plugin, options) => {
        Mongoose.set('useCreateIndex', true);
        Mongoose.connect(options.uri, { useNewUrlParser: true }, function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        // When the connection is connected
        Mongoose.connection.on('connected', function() {
            console.log('Mongo Database connected');
        });
        // When the connection is disconnected    
        Mongoose.connection.on('disconnected', function() {
            console.log(' Mongo Database disconnected');
        });
        // If the node process ends, close the mongoose connection     
        process.on('SIGINT', function() {
            Mongoose.connection.close(function() {
                console.log('Mongo Database disconnected through app termination');
                process.exit(0);
            });
        });
        // Load models 
        var models = Glob.sync('app/models/*.js');
        models.forEach(function(model) {
            require('../' + model);
        });
        global.UserModel = Mongoose.model('User');
        global.User_findDetails = User_findDetails;
        global.User_create = User_create;
        global.User_findOne = User_findOne;
        global.User_findByIdAndUpdate = User_findByIdAndUpdate;
    },
    pkg: require('../package.json'),
    name : 'mongoose'
};
