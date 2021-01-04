import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_DISABLE, FONT_BOLD, FONT_LIGHT} from '../../utils/constans';

const ProfileMenu = ({title, detail}) => {
  return (
    <View style={styles.myorder}>
      <View>
        <Text style={styles.main}>{title}</Text>
        <Text style={styles.second}>{detail}</Text>
      </View>
      <Text>{'>'}</Text>
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
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
  },
});
