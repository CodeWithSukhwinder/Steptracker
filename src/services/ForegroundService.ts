import ReactNativeForegroundService from '@supersami/rn-foreground-service';

export class ForegroundService {
  static async start() {
    if (!ReactNativeForegroundService.is_foregroundService_running()) {
      await ReactNativeForegroundService.start({
        id: 144,
        title: 'Step Tracker',
        message: 'Tracking your steps in the background...',
        icon: 'ic_launcher',
        button: false,
      });
    }
  }

  static async stop() {
    if (ReactNativeForegroundService.is_foregroundService_running()) {
      await ReactNativeForegroundService.stop();
    }
  }

  static updateNotification(message: string) {
    if (ReactNativeForegroundService.is_foregroundService_running()) {
      ReactNativeForegroundService.update({
        id: 144,
        title: 'Step Tracker',
        message: message,
        icon: 'ic_launcher',
        button: false,
      });
    }
  }
}
