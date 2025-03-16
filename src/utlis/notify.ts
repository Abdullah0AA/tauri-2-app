// src/utils/notify.ts
import { NotificationProps } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

// Define valid notification types
type NotificationType = 'success' | 'error' | 'info'

// Function to show a notification with an optional title
export const notify = (
  type: NotificationType,
  message: string,
  title?: string, // Optional title parameter
): void => {
  const colors: Record<NotificationType, NotificationProps['color']> = {
    success: 'green',
    error: 'red',
    info: 'blue',
  }

  showNotification({
    title: title ?? type.charAt(0).toUpperCase() + type.slice(1).toUpperCase(), // Default title based on type
    message,
    color: colors[type],
    autoClose: 3000, // Auto-close after 3 seconds
  })
}
