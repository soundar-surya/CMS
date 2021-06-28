module.exports = function registeredEventModel(sequelize, type) {
    return sequelize.define('registeredEvents', {
        email: {
            type: type.STRING
        },
        eventsRegistered: {
            type: type.ARRAY(type.STRING),
            defaultValue: null
        }
    }, {
        freezeTableName: true
    })
}
