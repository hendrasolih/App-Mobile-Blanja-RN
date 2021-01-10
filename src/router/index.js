import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Splash,
  Home,
  Bag,
  Favorites,
  DetailPage,
  Review,
  Search,
} from '../screens';
import {BottomNavigator} from '../components';
import {FONT_BOLD} from '../utils/constans';

import Shop from './Shop';
import Auth from './Auth';
import MainProfile from './Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../screens/Notification';

const getToken = async () => {
  try {
    console.log('ini');
    const token = await AsyncStorage.getItem('token1');
    if (token !== null) {
      // value previously stored
      console.log(token);
      console.log('Successs');
      return true;
    } else {
      console.log('token null');
      return false;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
getToken();
console.log(`ini tester`);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={ShopPage} />
      <Tab.Screen name="Bag" component={Bag} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const ShopPage = () => {
  return <Shop />;
};

const ProfileScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const token = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('67');
      setIsLogin(true);
    } else {
      console.log('69');
      setIsLogin(false);
    }
  };
  token();
  console.log(isLogin);
  return <>{isLogin ? <MainProfile /> : <Auth />}</>;
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
        headerMode="none"
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="ReviewPage" component={Review} />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
