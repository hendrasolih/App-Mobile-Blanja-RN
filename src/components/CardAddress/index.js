import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CardAddress = ({address, user}) => {
  return (
    <View style={styles.cardAddress}>
      <View style={styles.name}>
        <Text>{user}</Text>
        <Text>Change</Text>
      </View>
      <View>
        <Text>{address}</Text>
      </View>
    </View>
  );
};

export default CardAddress;

const styles = StyleSheet.create({
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
