import React from 'react';
import { I18nManager } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  return <AppNavigator />;
}
