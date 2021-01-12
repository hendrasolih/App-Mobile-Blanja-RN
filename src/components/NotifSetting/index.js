import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconOff, IconOn} from '../../assets';
import {FONT_MED, FONT_REG} from '../../utils/constans';

const NotifSetting = ({title, btn}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <Text style={{fontFamily: FONT_MED}}>{title}</Text>
      {btn ? <IconOn /> : <IconOff />}
    </View>
  );
};

export default NotifSetting;

const styles = StyleSheet.create({});
