import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_ROUTES} from './Routes';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {MAIN_ROUTES.map(route => {
          const {path, element: Component} = route;

          return <Stack.Screen key={path} name={path} component={Component} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
