import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Profile,
  MyOrder,
  ShippingAddress,
  MyProduct,
  AddProduct,
  EditProduct,
} from '../../screens';

import {FONT_BOLD} from '../../utils/constans';

const Stack = createStackNavigator();

const MainProfile = () => {
  return (
    <Stack.Navigator initialRouteName="MainProfile">
      <Stack.Screen
        name="MainProfile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrder"
        component={MyOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyProduct"
        component={MyProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={{
          title: 'Shipping Address',
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
    </Stack.Navigator>
  );
};

export default MainProfile;

const styles = StyleSheet.create({});
