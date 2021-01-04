import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Splash,
  Home,
  Shop,
  Bag,
  Favorites,
  Profile,
  MyOrder,
  ShippingAddress,
  SettingsProfile,
  DetailPage,
  ReviewPage,
  Review,
} from '../screens';
import {BottomNavigator} from '../components';
import {FONT_BOLD} from '../utils/constans';

import Auth from './Auth';
import MainProfile from './Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Bag" component={Bag} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const ProfileScreen = () => {
  return <>{false ? <MainProfile /> : <Auth />}</>;
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="ReviewPage" component={Review} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
