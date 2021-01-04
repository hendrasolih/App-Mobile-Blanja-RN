import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_DISABLE, FONT_LIGHT} from '../../utils/constans';

const ListBar = ({nav}) => {
  return (
    <>
      <View style={{marginTop: 20}}>
        <View style={styles.ListBar}>
          <Text style={styles.text}>Shipping info</Text>
        </View>
        <View style={styles.ListBar}>
          <Text style={styles.text}>Support</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('ReviewPage');
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
