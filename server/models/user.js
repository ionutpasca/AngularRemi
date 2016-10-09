var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    facebook:{
        id: String,
        token: String,
        email: String,
        name: String,
        profilePicture: String
    }
});

userSchema.methods.generateHash = function(password){
    var salt = bcrypt.genSaltSync(10);
    return bcru .hashSync(password, salt, null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);