import * as notificationsData from '../../notifications.json';

const notifications = notificationsData.default;

export function getAllNotificationsByUser(userId) {
  return notifications
    .filter((notification) => notification.author.id === userId)
    .map((notification) => notification.context);
}
