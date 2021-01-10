import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {NavBar} from '../../components';
import {PictNotif} from '../../assets';

const Notification = ({navigation}) => {
  return (
    <View>
      <NavBar navigation={navigation} title="Notification" />
      <View style={styles.noNotif}>
        <Image source={PictNotif} />
        <Text>No notification yet</Text>
      </View>
    </View>
  );
};

export default Notification;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  noNotif: {
    marginTop: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
