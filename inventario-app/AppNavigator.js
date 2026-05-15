// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductListScreen from './screens/ProductListScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTintColor: '#5C3D2E',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
        <Stack.Screen 
          name="QRScanner" 
          component={QRScannerScreen} 
          options={{ title: 'Escáner QR' }}
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{ title: 'Detalle del Producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}