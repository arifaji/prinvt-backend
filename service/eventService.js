const { Event, validate: validateEvents } = require('../models/event');
const _ = require('lodash');
const { httpStatus } = require('../util/enums');
const { ErrorHandler } = require('../util/errorHandler');

class EventService {
  static async insertEvents(req) {
    const payload = _.get(req, 'body');
    payload.createdBy = req.user._id
    const { error } = validateEvents(payload);
    if (error) {
      throw new ErrorHandler(httpStatus.bad, error.details[0].message);
    }
    const { createdBy, eventName, eventDetail, startDate, endDate, province, city, detailLocation, isMultiScan } = payload
    const newevent = new Event({
      createdBy, eventName, eventDetail, startDate, endDate, province, city, detailLocation, isMultiScan
    });
    await newevent.save()
    return newevent
  }

  static async getAllEventByUserId(req) {
    const createdBy = req.user._id;
    const events = await Event.find({ createdBy }).exec();
    return events;
  }

  static async getEventById(req) {
    const event = await Event.findById(req.params.id);
    return event;
  }
};

module.exports = EventService;