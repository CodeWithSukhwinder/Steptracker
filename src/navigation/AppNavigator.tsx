import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserStore } from '../store/userStore';

import { UserSelectScreen } from '../screens/UserSelectScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { HistoryScreen } from '../screens/HistoryScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const activeUserId = useUserStore((state) => state.activeUserId);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#333',
      }}
    >
      {!activeUserId ? (
        <Stack.Screen
          name="UserSelect"
          component={UserSelectScreen}
          options={{ title: 'Select Profile' }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ title: 'Activity History' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
