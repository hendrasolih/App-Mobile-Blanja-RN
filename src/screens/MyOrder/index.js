import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  COLOR_DISABLE,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
  FONT_THIN,
} from '../../utils/constans';

const url = 'http://192.168.100.2:8000';

const MyOrder = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    // code to run on component mount
    getHistory();
  }, []);

  const getHistory = async () => {
    const user_id = await AsyncStorage.getItem('userid');
    console.log('userid: ' + user_id);
    axios
      .get(url + '/history/' + user_id)
      .then((res) => {
        //console.log(res.data.data);
        const history = res.data.data;
        setHistory(history);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(history);
  return (
    <>
      <View style={styles.titlewrap}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <ScrollView vertical={true}>
        {history.length !== 0 &&
          history.map(({id, invoice_id, price, qty}) => {
            return (
              <View style={styles.cardOrders} key={id}>
                <View style={styles.noOrders}>
                  <Text style={styles.titleOrder}>Order No: {invoice_id}</Text>
                  <Text style={styles.date}>05-12-2019</Text>
                </View>
                <View style={styles.infOrders}>
                  <Text style={styles.textKey}>Tracking number:</Text>
                  <Text style={styles.textValue}>IW3475453455</Text>
                </View>
                <View style={styles.infOrders}>
                  <Text style={styles.textKey}>Quantity:</Text>
                  <Text style={styles.textValue}>{qty}</Text>
                </View>
                <View style={styles.infOrders}>
                  <Text style={styles.textKey}>Total Amount:</Text>
                  <Text style={styles.textValue}>Rp. {price}</Text>
                </View>
                <View style={styles.delivStat}>
                  <Text style={styles.deliv}>Delivered</Text>
                </View>
              </View>
            );
          })}
        <View style={{height: 25}} />
      </ScrollView>
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
    fontSize: 14,
    fontFamily: FONT_MED,
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
