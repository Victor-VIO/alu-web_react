import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

const notifications = notificationsData.default;

export const user = new schema.Entity('users');

export const message = new schema.Entity('messages', {}, {
  idAttribute: 'guid',
});

export const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const normalizedData = normalize(notifications, [notification]);

export function getAllNotificationsByUser(userId) {
  return notifications
    .filter((item) => item.author.id === userId)
    .map((item) => item.context);
}
