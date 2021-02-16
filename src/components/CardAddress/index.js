import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_MED} from '../../utils/constans';

//Redux
import {connect, useSelector} from 'react-redux';
import {addAddress} from '../../utils/redux/action/addressAction';
import axios from 'axios';
import {API_URL} from '@env';

const CardAddress = ({
  address,
  user,
  addAddress,
  statDelete,
  id,
  getAddress,
  name,
  navigation,
}) => {
  const addres = useSelector((state) => state.address.address);
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Address Picked',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };
  const pickaddress = () => {
    showToastWithGravity();
    addAddress({
      address,
      user,
      name,
      active: id,
    });
  };
  const deleteAddress = () => {
    Alert.alert(
      'Address',
      'Are You Sure Want delete ?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            //logout
            try {
              await axios
                .delete(`${API_URL}/address/${id}`)
                .then(() => {
                  getAddress();
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (e) {
              // remove error
              console.log(e);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <>
      <TouchableOpacity onPress={pickaddress}>
        <View
          style={
            addres !== null && addres.active == id
              ? styles.actCard
              : styles.cardAddress
          }>
          <View>
            <Text style={{fontFamily: FONT_BOLD}}>{name}</Text>
          </View>
          <View style={styles.name}>
            <Text>To: {user}</Text>
          </View>
          <View>
            <Text>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {statDelete ? (
        <View
          style={
            addres !== null && addres.active == id
              ? styles.actwrapBtn
              : styles.wrapBtn
          }>
          <TouchableOpacity style={styles.btnDelete} onPress={deleteAddress}>
            <Text style={{color: 'red'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => navigation.navigate('Edit Address', {id})}>
            <Text style={{color: '#000'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={
            addres !== null && addres.active == id
              ? styles.actwrapBtn
              : styles.wrapBtn
          }></View>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAddress: (address) => dispatch(addAddress(address)),
  };
};

export default connect(null, mapDispatchToProps)(CardAddress);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardAddress: {
    paddingHorizontal: 24,
    paddingTop: 15,
    marginHorizontal: windowWidth * 0.04,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  actCard: {
    paddingHorizontal: 24,
    paddingTop: 15,
    marginHorizontal: windowWidth * 0.04,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#008000',
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  btnDelete: {
    // backgroundColor: '#fff',
    marginHorizontal: windowWidth * 0.04,
    // borderRadius: 8,
    // paddingHorizontal: windowWidth * 0.07,
    // marginBottom: windowHeight * 0.03,
  },
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginHorizontal: windowWidth * 0.04,
    marginBottom: windowHeight * 0.03,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 15,
  },
  actwrapBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginHorizontal: windowWidth * 0.04,
    marginBottom: windowHeight * 0.03,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#008000',
  },
});
