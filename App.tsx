import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/config/i18n';
import ProductDetailPage from './src/screens/ProductDetailPage';
import ShoppingCart from './src/screens/ShoppingCart';
import HomePage from './src/screens/Home';
import ConversationPage from './src/screens/ConversationPage';
import ChatScreen from './src/screens/ChatScreen';
import OrderItems from './src/screens/OrderItems';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetailPage"
            component={ProductDetailPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConversationPage"
            component={ConversationPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderItems"
            component={OrderItems}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}

export default App;
