import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR_MAIN} from '../../utils/constans';
import {API_URL} from '@env';
//redux
import {useSelector} from 'react-redux';

const AddAddress = ({navigation}) => {
  const user_id = useSelector((state) => state.auth.id);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipcode, setZipcode] = useState('');

  const addressFull = `${address} ${city} ${province} ${zipcode}`;

  const postAddress = () => {
    const data = {
      address: addressFull,
    };
    axios
      .post(`${API_URL}/address/${user_id}`, data)
      .then((res) => {
        console.log(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <View style={{height: 30}} />
      <View style={styles.container}>
        <TextInput
          style={styles.form}
          placeholder="Address Name"
          defaultValue={address}
          onChangeText={(address) => setAddress(address)}
        />
        <TextInput
          style={styles.form}
          placeholder="Recipient's Name"
          defaultValue={address}
          onChangeText={(address) => setAddress(address)}
        />
        <TextInput
          style={styles.form}
          placeholder="Address"
          defaultValue={address}
          onChangeText={(address) => setAddress(address)}
        />
        <TextInput
          style={styles.form}
          placeholder="City"
          defaultValue={city}
          onChangeText={(city) => setCity(city)}
        />
        <TextInput
          style={styles.form}
          placeholder="State/Province/Regions"
          defaultValue={province}
          onChangeText={(province) => setProvince(province)}
        />
        <TextInput
          style={styles.form}
          placeholder="Zip Code (Postal Code)"
          defaultValue={zipcode}
          onChangeText={(zipcode) => setZipcode(zipcode)}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            console.log('press');
            postAddress();
            navigation.navigate('ShippingAddress');
          }}>
          <Text style={{color: '#fff'}}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAddress;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
