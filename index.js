import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

// Register foreground service task
ReactNativeForegroundService.add_task(() => console.log('Foreground service task running'), {
  delay: 1000,
  onLoop: true,
  taskId: 'BackgroundStepTask',
  onError: (e) => console.log('Error logging:', e),
});

// App registration
AppRegistry.registerComponent(appName, () => App);
