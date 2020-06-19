import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/react-hooks';

import Feed from './screens/Feed';
import Thread from './screens/Thread';
import NewStatus from './screens/NewStatus';

import { Button } from './components/Button';
import { client } from './graphql/client';

const AppStack = createStackNavigator();
const ModalStack = createStackNavigator();

const AppNavigatorStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Feed"
      // screenOptions={{ headerTitle: 'Home' }}
      headerMode="float"
    >
      <AppStack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation, route }) => ({
          title: 'Home',
          headerTitle: 'Home',
          headerTintColor: '#fff',
          // headerStyle: {
          //   backgroundColor: route.params.color || '#fff',
          //   borderBottomColor: route.params.color || '#fff',
          // },
          headerRight: () => (
            <Button
              text="New Status"
              onPress={() => navigation.navigate('NewStatus')}
            />
          ),
        })}
      />
      <AppStack.Screen name="Thread" component={Thread} />
    </AppStack.Navigator>
  );
};

const ModalNavigatorStack = () => {
  return (
    <NavigationContainer>
      <ModalStack.Navigator mode="modal" headerMode="none">
        <ModalStack.Screen
          name="App"
          component={AppNavigatorStack}
          options={({ navigation, route }) => ({
            title: 'Home',
          })}
        />
        <ModalStack.Screen
          name="NewStatus"
          component={NewStatus}
          options={({ route }) => ({
            title: 'New Status',
            headerTitle: 'New Status',
          })}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

const App = ModalNavigatorStack;

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
