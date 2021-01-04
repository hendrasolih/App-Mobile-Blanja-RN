import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  COLOR_DISABLE,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
  FONT_THIN,
} from '../../utils/constans';

const MyOrder = () => {
  return (
    <>
      <View style={styles.titlewrap}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <View style={styles.cardOrders}>
        <View style={styles.noOrders}>
          <Text style={styles.titleOrder}>Order No 1947034</Text>
          <Text style={styles.date}>05-12-2019</Text>
        </View>
        <View style={styles.infOrders}>
          <Text style={styles.textKey}>Tracking number:</Text>
          <Text style={styles.textValue}>IW3475453455</Text>
        </View>
        <View style={styles.infOrders}>
          <Text style={styles.textKey}>Quantity:</Text>
          <Text style={styles.textValue}>3</Text>
        </View>
        <View style={styles.infOrders}>
          <Text style={styles.textKey}>Total Amount:</Text>
          <Text style={styles.textValue}>112$</Text>
        </View>
        <View style={styles.delivStat}>
          <Text style={styles.deliv}>Delivered</Text>
        </View>
      </View>
    </>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  date: {
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
  },
  titleOrder: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
  },
  delivStat: {
    alignItems: 'flex-end',
  },
  textKey: {
    marginRight: 10,
    fontFamily: FONT_MED,
    color: COLOR_DISABLE,
    fontSize: 14,
  },
  textValue: {
    fontFamily: FONT_BOLD,
    fontSize: 14,
  },
  infOrders: {
    flexDirection: 'row',
    marginTop: 15,
  },
  noOrders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 34,
    fontFamily: FONT_BOLD,
  },
  titlewrap: {
    marginTop: 74,
  },
  cardOrders: {
    padding: 17,
    borderRadius: 8,
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
    marginTop: 24,
  },
  deliv: {
    fontFamily: FONT_LIGHT,
    color: '#2AA952',
  },
});
