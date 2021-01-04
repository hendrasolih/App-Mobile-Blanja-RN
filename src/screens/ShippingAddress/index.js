import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FONT_BOLD} from '../../utils/constans';

const ShippingAddress = () => {
  return (
    <>
      <Text style={styles.title}>Shipping Address</Text>
      <View style={styles.cardAddress}>
        <View style={styles.name}>
          <Text>Jane Doe</Text>
          <Text>Change</Text>
        </View>
        <View>
          <Text>3 Newbridge Court Chino Hills, CA 91709, United States</Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text>ADD NEW ADDRESS</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 24,
  },
  title: {
    fontFamily: FONT_BOLD,
    marginBottom: 21,
    marginTop: 31,
  },
  cardAddress: {
    paddingHorizontal: 24,
    paddingVertical: 19,
    marginHorizontal: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 8,
    marginBottom: 15,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
});
