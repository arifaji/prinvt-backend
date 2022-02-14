const eventService = require('../service/eventService');
const response = require('../util/response');

class EventController {
  static async insertEvent(req, res, next) {
    try {
      const event = await eventService.insertEvents(req);
      response.ok(res, event);
    } catch (error) {
      next(error);
    }
}

  static async getEvents(req, res, next) {
    try {
      const events = await eventService.getAllEventByUserId(req);
      const result = JSON.parse(JSON.stringify(events))
      result.forEach((data) => {
        data.eventImage = 'https://source.unsplash.com/h-ACUrBngrw/1280x720'
        data.eventAvatar = 'https://avatars.dicebear.com/api/initials/john%20doe.svg'
      })
      response.ok(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async getEvent(req, res, next) {
    try {
      const event = await eventService.getEventById(req);
      const result = JSON.parse(JSON.stringify(event))
      result.eventImage = 'https://source.unsplash.com/h-ACUrBngrw/1280x720'
      result.eventAvatar = 'https://avatars.dicebear.com/api/initials/john%20doe.svg'
      response.ok(res, result);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = EventController;