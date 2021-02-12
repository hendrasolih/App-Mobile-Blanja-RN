import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR_DISABLE, FONT_BOLD, FONT_LIGHT} from '../../utils/constans';
import {API_URL} from '@env';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//redux
import {useSelector} from 'react-redux';

const ChatRoom = ({navigation}) => {
  const user_id = useSelector((state) => state.auth.id);
  const name_user = useSelector((state) => state.auth.name_user);
  const level = useSelector((state) => state.auth.level);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // code to run on component mount
    if (level == 'Seller') {
      getSellerRoom();
    } else if (level == 'Customer') {
      getCustomerRoom();
    }
  }, []);
  const getSellerRoom = () => {
    axios
      .get(`${API_URL}/chat/seller/${user_id}`)
      .then((res) => {
        console.log(res.data.data);
        setRooms(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCustomerRoom = () => {
    axios
      .get(`${API_URL}/chat/customer/${user_id}`)
      .then((res) => {
        console.log(res.data.data);
        setRooms(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      {rooms.length !== 0 &&
        rooms.map(({customer, room_id, seller, cus_id, seller_id}) => {
          return (
            <TouchableOpacity
              style={styles.myorder}
              key={room_id}
              onPress={() => {
                console.log('nav');
                navigation.navigate('Chat', {room_id, cus_id, seller_id});
              }}>
              <View>
                <Text style={styles.main}>
                  {level == 'Seller' ? customer : seller}
                </Text>
                <Text style={styles.second}>{name_user}</Text>
              </View>
              <Text>{'>'}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    marginTop: windowHeight * 0.03,
  },
  main: {
    fontFamily: FONT_BOLD,
  },
  second: {
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
  },
  myorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
