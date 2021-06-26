module.exports = function userModel(sequelize, type) {
    return sequelize.define('users', {
        email: {
            type: type.STRING
        },
        password: {
            type: type.STRING
        },
        role: {
            type: type.STRING
        }
    }, {
        freezeTableName: true
    })
}
