module.exports = function eventModel(sequelize, type) {
    return sequelize.define('events', {
        eventName: {
            type: type.STRING
        },
        startsOn: {
            type: type.STRING
        },
        endsOn: {
            type: type.STRING
        },
        totalHrs: {
            type: type.INTEGER
        },
        instructor: {
            type: type.STRING
        }
    }, {
        freezeTableName: true
    })
}
