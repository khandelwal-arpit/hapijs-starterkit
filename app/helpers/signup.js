'use strict';

exports.signUpUser = async function (userData) {
    return new Promise(async function (resolve, reject) {
        try {
          let data = await isUserAlreadyExist(userData.email);
          if(data){
            return resolve({statusCode : 409, message : 'User already exist'});
          }else{
             let savedUser = await global.User_create(userData);
             return resolve({statusCode : 201, message : 'Sign up successfully', user : savedUser});
          }
        } catch (error) {
            return reject(error);
        }
    });
};

async function isUserAlreadyExist(email) {
    return new Promise(async function (resolve, reject) {
        try {
            var query = {};
            query.email = email.toLowerCase();
            let user = await global.User_findOne(query);
            if (user) {
                return resolve(user);
            }
            return resolve();
        } catch (error) {
            return reject(error);
        }
    });
}