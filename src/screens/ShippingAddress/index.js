import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CardAddress from '../../components/CardAddress';
import {FONT_BOLD} from '../../utils/constans';

//redux
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';

const ShippingAddress = ({navigation}) => {
  const user_id = useSelector((state) => state.auth.id);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAddress();
    });

    return unsubscribe;
  }, [navigation]);

  const getAddress = () => {
    axios
      .get(`${API_URL}/address/${user_id}`)
      .then((res) => {
        setAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Text style={styles.title}>Shipping Address</Text>
      {address.length !== 0 &&
        address.map(({id_adres, address, user_name}) => {
          return (
            <CardAddress key={id_adres} address={address} user={user_name} />
          );
        })}

      <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
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
    marginLeft: 17,
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
