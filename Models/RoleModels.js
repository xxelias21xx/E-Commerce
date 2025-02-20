const MongoCone = require('mongoose');

const RoleData = new MongoCone.Schema({
        roles: {
            type: String,
            required: true,
            unique: true
        }
    })
const Role=MongoCone.model('Roles',RoleData);
module.exports = Role;