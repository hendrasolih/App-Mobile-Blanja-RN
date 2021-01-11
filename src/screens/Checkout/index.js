import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CardAddress, CheckboxPayments} from '../../components';
import {FONT_MED} from '../../utils/constans';

const Checkout = () => {
  return (
    <View>
      <View style={{margin: 16}}>
        <Text style={{fontFamily: FONT_MED, fontSize: 16}}>
          Shipping address
        </Text>
      </View>
      <CardAddress />
      <View style={{margin: 16}}>
        <Text style={{fontFamily: FONT_MED, fontSize: 16}}>Payment</Text>
      </View>
      <CheckboxPayments />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
