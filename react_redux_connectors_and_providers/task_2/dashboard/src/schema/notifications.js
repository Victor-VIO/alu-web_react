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
  const { notifications: notificationsById, messages } = normalizedData.entities;

  return normalizedData.result.reduce((contexts, id) => {
    const item = notificationsById[id];
    if (item.author === userId) {
      contexts.push(messages[item.context]);
    }
    return contexts;
  }, []);
}

export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}
