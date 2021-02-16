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
  Filter,
  Checkout,
  Success,
  SettingsProfile,
  Login,
  Register,
  ForgotPass,
  Otp,
  ResetPass,
  Chat,
  FilterBrand,
  ChatRoom,
  ShippingAddress,
  AddColor,
  AddSize,
  Catalog,
  EditAddress,
} from '../screens';
import {BottomNavigator} from '../components';
import {FONT_BOLD} from '../utils/constans';

//redux
import {useSelector} from 'react-redux';

//cotext
import {SocketProvider} from '../utils/Context/SocketProvider';

import Shop from './Shop';
import MainProfile from './Profile';
import Notification from '../screens/Notification';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const level = useSelector((state) => state.auth.level);
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={ShopPage} />
      {level === 'Customer' && <Tab.Screen name="Bag" component={Bag} />}
      {/* {level === 'Customer' && (
        <Tab.Screen name="Favorites" component={Favorites} />
      )} */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const ShopPage = () => {
  return <Shop />;
};

const ProfileScreen = () => {
  return <MainProfile />;
};

const Router = ({navigation}) => {
  return (
    <SocketProvider>
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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{title: ''}}
        />
        <Stack.Screen name="otp" component={Otp} />
        <Stack.Screen name="ResetPass" component={ResetPass} nav={navigation} />
        <Stack.Screen
          name="SettingsProfile"
          component={SettingsProfile}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: FONT_BOLD,
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen
          name="DetailPage"
          component={DetailPage}
          options={{title: 'Detail Page'}}
        />
        <Stack.Screen
          name="ReviewPage"
          component={Review}
          options={{
            title: 'Rating & Review',
          }}
        />
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
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat List"
          component={ChatRoom}
          options={{title: 'Chat List'}}
        />
        <Stack.Screen
          name="Filter Brand"
          component={FilterBrand}
          options={{
            title: 'Brand',
          }}
        />
        <Stack.Screen
          name="ShippingAddress"
          component={ShippingAddress}
          options={{
            title: 'Shipping Address',
          }}
        />
        <Stack.Screen
          name="AddColor"
          component={AddColor}
          options={{
            title: 'Add Color',
          }}
        />
        <Stack.Screen
          name="AddSize"
          component={AddSize}
          options={{
            title: 'Add Size',
          }}
        />
        <Stack.Screen
          name="Catalog"
          component={Catalog}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit Address"
          component={EditAddress}
          options={{title: 'Edit Address'}}
        />
      </Stack.Navigator>
    </SocketProvider>
  );
};

export default Router;

const styles = StyleSheet.create({});
