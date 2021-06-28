const {Event, RegisteredEvents} = require('../config/dbConfig')

let isEmpty = field => !field

async function eventCreationService(req, res){
    const {eventName, startsOn, endsOn, totalHrs} = req.body
    const {email: instructor} = req.user

    try {
        await Event.create({
            eventName, startsOn, endsOn, totalHrs, instructor
        })
        res.status(200).send(JSON.stringify({message: 'Your event has been created successfully.'}))

    } catch(e) {
        console.log(e)
        res.status(500).send(JSON.stringify({message: 'Something went wrong. Try again later'}))
    }
    
}

async function eventModificationService(req, res) {
    const {email: instructor} = req.user
    const {eventName, startsOn, endsOn, totalHrs} = req.body
    const modifiedFields = {}

    // find out the modified fields and store it in obj
    if(isEmpty(eventName)) {
        res.status(400).send(JSON.stringify({message: 'Event name should not be blank.'}))
    } 
    if(!isEmpty(startsOn)) {
        modifiedFields.startsOn = startsOn
    } 
    if(!isEmpty(endsOn)) {
        modifiedFields.endsOn = endsOn
    }
    if(!isEmpty(totalHrs)) {
        modifiedFields.totalHrs = totalHrs
    } 

    // check whether the event exist 
    const isExist = await Event.findOne({where: {instructor, eventName}})
    if(!isExist) {
        res.status(406).send(JSON.stringify({message: `Event doesn't isExist.`}))
    } else {
        try{
            // if so, update it
            await Event.update( {...modifiedFields}, {where: {instructor, eventName}})
            res.status(200).send({message: 'Modifications have been made successfully'})
        } catch(e) {
            res.status(500).send()
        }
    }

}

async function eventCancellationService(req, res) {
    const {email: instructor} = req.user
    const {eventName} = req.body

    if(isEmpty(eventName)) {
        res.status(400).send(JSON.stringify({message: 'Event name should not be blank.'}))
    }
    else{
        const isExist = await Event.findOne({where: {instructor, eventName}})
        if(!isExist) {
            res.status(406).send(JSON.stringify({message: `Event doesn't isExist.`}))
        } else {
                try{
                    await Event.destroy({where: {instructor, eventName}})
                    res.status(400).send(JSON.stringify({message: 'Your event has been cancelled successfully.'}))
                } catch(e) {
                    console.log(e);
                    res.status(500).send()
                } }
    }
}

async function getAvailableEvents(req, res) {
    let responseObject = []
    try{
        let events = await Event.findAll()
        for(let event of events) {
            let {eventName, startsOn, endsOn, totalHrs, instructor} = event.dataValues
            responseObject.push({eventName, startsOn, endsOn, totalHrs, instructor})
        }
        res.send(JSON.stringify({Events: responseObject}))
    } catch(e) {
        res.status(500).send(JSON.stringify({message: 'something went wrong'}))
    }
}

async function eventRegisterationService(req, res) {
    let {email} = req.user
    let {eventName} = req.body

    const isEventExist = await Event.findOne({where: {eventName}})
    if(!isEventExist) {
        res.status(406).send(JSON.stringify({message: `Event doesn't exist`}))
    }
    else {
        try{
            const isExist = await RegisteredEvents.findOne({where: {email}})
            if(isExist) {
                let {dataValues:{eventsRegistered}} = isExist
                await RegisteredEvents.update( {eventsRegistered: [...eventsRegistered, eventName]}, {where: {email}})
                res.status(200).send(JSON.stringify({message: 'Event registeration successful.'}))
            }
            else{
                await RegisteredEvents.create({email, eventsRegistered: [eventName]})
                res.status(200).send(JSON.stringify({message: 'Event registeration successful.'}))
            }
        } catch(e) {
            console.log(e);
            res.status(500).send(JSON.stringify({message: 'something went wrong'}))
        } 
    }
}

async function getRegisteredEvents(req, res) {
    const {email} = req.user

    try{
        let events = await RegisteredEvents.findAll()
        let {dataValues: {eventsRegistered}} = events[0]
        res.status(200).send(JSON.stringify({data: {eventsRegistered}}))
    } catch(e) {
        res.status(500).send(JSON.stringify({message: 'something went wrong'}))
    }

}

module.exports = {
    eventCreationService,
    eventModificationService,
    eventCancellationService,
    getAvailableEvents,
    eventRegisterationService,
    getRegisteredEvents
}

