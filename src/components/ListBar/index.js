import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_DISABLE, FONT_LIGHT} from '../../utils/constans';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
import axios from 'axios';

const ListBar = ({nav, id, sellerId, sellerName}) => {
  const user_id = useSelector((state) => state.auth.id);
  const postRoom = () => {
    const data = {
      cus_id: user_id,
      seller_id: sellerId,
      room_id: `c${user_id}s${sellerId}`,
    };
    axios
      .post(`${API_URL}/chat/room`, data)
      .then((res) => {
        console.log(res);
        nav.navigate('Chat List');
      })
      .catch((err) => {
        console.log(err);
        nav.navigate('Chat List');
      });
  };
  return (
    <>
      <View style={{marginTop: 20}}>
        <View style={styles.ListBar}>
          <Text style={styles.text}>Shipping info</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            //post new room
            postRoom();
          }}>
          <View style={styles.ListBar}>
            <Text style={styles.text}>Ask Seller</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('ReviewPage', {itemId: id});
          }}>
          <View style={styles.ListBarLast}>
            <Text style={styles.text}>Rating & Reviews</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListBar;

const styles = StyleSheet.create({
  ListBar: {
    borderTopWidth: 1,
    borderTopColor: COLOR_DISABLE,
    paddingVertical: 15,
  },
  ListBarLast: {
    borderTopWidth: 1,
    borderTopColor: COLOR_DISABLE,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_DISABLE,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: FONT_LIGHT,
  },
});
