import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {Login, Register, ForgotPass, Otp, ResetPass} from '../../screens';

const Stack = createStackNavigator();

const Auth = ({navigation}) => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default Auth;

const styles = StyleSheet.create({});
