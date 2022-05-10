'use strict';

const Joi = require('joi');

// Helper method for finding user details can be called from web and mobile api controller.
exports.findUserDetails = async (userId)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let userDetails = await global.User_findDetails(userId);
            return resolve(userDetails);
        } catch (error) {
            return reject(error);
        }
    });
};