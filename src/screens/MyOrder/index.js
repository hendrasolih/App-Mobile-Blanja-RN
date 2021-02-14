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
import {API_URL} from '@env';

//context
import {useSocket} from '../../utils/Context/SocketProvider';

//redux
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

//push notif
import PushNotification from 'react-native-push-notification';
import {showNotification} from '../../notif';

const MyOrder = () => {
  const socket = useSocket();
  const channel = 'notif';
  const level = useSelector((state) => state.auth.level);
  const user_id = useSelector((state) => state.auth.id);
  const [history, setHistory] = useState([]);
  console.log(level);
  useEffect(() => {
    // code to run on component mount
    if (level == 'Seller') {
      getOrderSeller();
    } else {
      getHistory();
    }
  }, []);

  //pushnotif
  PushNotification.createChannel(
    {
      channelId: 'notif',
      channelName: 'My Notification channel',
      channelDescription: 'A channel to categories your notification',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createchannel returned '${created}'`),
  );
  // code to run on component mount

  PushNotification.getChannels((channel_ids) => {
    console.log(channel_ids);
  });
  //pushnotif

  useEffect(() => {
    socket.on('sending customer', (msg) => {
      showNotification('Notification', msg, channel);
      getHistory();
    });
    socket.on('recieved customer', (msg) => {
      showNotification('Notification', msg, channel);
      getHistory();
    });
    socket.on('sending seller', (msg) => {
      //push notif
      showNotification('Notification', msg, channel);
      getOrderSeller();
    });
    socket.on('recieved seller', (msg) => {
      //push notif
      showNotification('Notification', msg, channel);
      getOrderSeller();
    });
    return () => {
      socket.off('chat message');
      socket.off('sending seller');
    };
  }, []);

  const getHistory = async () => {
    axios
      .get(API_URL + '/history/' + user_id)
      .then((res) => {
        const history = res.data.data;
        setHistory(history);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderSeller = () => {
    axios
      .get(API_URL + '/history/seller/' + user_id)
      .then((res) => {
        const history = res.data.data;
        setHistory(history);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sending = (id, user_id) => {
    const data = {
      id: id,
      status: 'Shipping',
    };
    axios
      .patch(`${API_URL}/history`, data)
      .then((res) => {
        socket.emit('sending', user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const recieved = (id, seller_id) => {
    const data = {
      id: id,
      status: 'Delivered',
    };
    axios
      .patch(`${API_URL}/history`, data)
      .then((res) => {
        socket.emit('recieved', seller_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView vertical={true}>
        <View style={styles.titlewrap}>
          <Text style={styles.title}>My Orders</Text>
        </View>

        {history.length !== 0 &&
          history.map(
            ({id, invoice_id, price, qty, status, user_id, seller_id}) => {
              return (
                <View style={styles.cardOrders} key={id}>
                  <View style={styles.noOrders}>
                    <Text style={styles.titleOrder}>
                      Order No: {invoice_id}
                    </Text>
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
                    <Text
                      style={
                        status == 'Delivered'
                          ? styles.deliv
                          : styles.shippingPacking
                      }>
                      {status}
                    </Text>
                    {level !== 'Customer' && status == 'Packing' && (
                      <TouchableOpacity
                        style={styles.sending}
                        onPress={() => {
                          console.log('seding');
                          sending(id, user_id);
                        }}>
                        <Text style={{color: '#fff'}}>Sending</Text>
                      </TouchableOpacity>
                    )}
                    {level !== 'Seller' && status == 'Shipping' && (
                      <TouchableOpacity
                        style={styles.sending}
                        onPress={() => {
                          console.log('deliv');
                          recieved(id, seller_id);
                        }}>
                        <Text style={{color: '#fff'}}>Recieved</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            },
          )}
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
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
  shippingPacking: {
    fontFamily: FONT_LIGHT,
    color: '#ffcc00',
  },
  sending: {
    backgroundColor: '#2AA952',
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 4,
  },
});
