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
import {useEffect} from 'react/cjs/react.development';

const EditAddress = ({navigation, route}) => {
  const {id} = route.params;
  const user_id = useSelector((state) => state.auth.id);
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const [recipient, setRecipient] = useState('');

  //const addressFull = `${address} ${city} ${province} ${zipcode}`;

  useEffect(() => {
    // code to run on component mount
    getDetail();
  }, []);

  const getDetail = () => {
    axios
      .get(`${API_URL}/address/detail/${id}`)
      .then((res) => {
        setAddress(res.data.data[0].address);
        setAddressName(res.data.data[0].addrs_name);
        setRecipient(res.data.data[0].recipient);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const patchAddress = () => {
    const data = {
      address: address,
      addrs_name: addressName,
      recipient: recipient,
    };
    axios
      .patch(`${API_URL}/address/${id}`, data)
      .then((res) => {
        console.log(res.data.msg);
        navigation.navigate('ShippingAddress');
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
          defaultValue={addressName}
          onChangeText={(addressName) => setAddressName(addressName)}
        />
        <TextInput
          style={styles.form}
          placeholder="Recipient's Name"
          defaultValue={recipient}
          onChangeText={(recipient) => setRecipient(recipient)}
        />
        <TextInput
          style={styles.form}
          placeholder="Address"
          defaultValue={address}
          onChangeText={(address) => setAddress(address)}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            //console.log('press');
            patchAddress();
          }}>
          <Text style={{color: '#fff'}}>CHANGE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditAddress;

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
