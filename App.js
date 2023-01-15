import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/Component/AppNavigator/AppNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
