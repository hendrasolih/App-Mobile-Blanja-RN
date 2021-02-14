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
import {COLOR_MAIN, FONT_MED} from '../../utils/constans';

//Redux
import {connect} from 'react-redux';
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
}) => {
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
        <View style={styles.cardAddress}>
          <View style={styles.name}>
            <Text>{user}</Text>
          </View>
          <View>
            <Text>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {statDelete && (
        <TouchableOpacity style={styles.btnDelete} onPress={deleteAddress}>
          <Text style={{color: '#fff'}}>Delete</Text>
        </TouchableOpacity>
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
    paddingVertical: 19,
    marginHorizontal: windowWidth * 0.04,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 5,
    borderRadius: 8,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  btnDelete: {
    backgroundColor: COLOR_MAIN,
    marginHorizontal: windowWidth * 0.04,
    borderRadius: 8,
    paddingHorizontal: windowWidth * 0.07,
    marginBottom: windowHeight * 0.03,
  },
});
