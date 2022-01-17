const Joi = require('joi');
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventName: {
    type: String
  },
  eventDetail: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  detailLocation: {
    type: String
  },
  isMultiScan: {
    type: Boolean
  }
});

const Event = mongoose.model('Event', EventSchema);

function validateEvent(payload) {
  const schema = Joi.object({
    createdBy: Joi.objectId().required(),
    eventName: Joi.string().required(),
    eventDetail: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    detailLocation:Joi.string().required(),
    isMultiScan: Joi.boolean().required()
  });

  return schema.validate(payload);
}

exports.Event = Event; 
exports.validate = validateEvent;