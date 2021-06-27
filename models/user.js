module.exports = function userModel(sequelize, type) {
    return sequelize.define('users', {
        email: {
            type: type.STRING
        },
        password: {
            type: type.STRING
        },
        roles: {
            type: type.ARRAY(type.STRING),
            defaultValue: null
        },
        permissions: {
            type: type.ARRAY(type.STRING),
            defaultValue: null
        }
    }, {
        freezeTableName: true
    })
}
