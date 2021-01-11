import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {COLOR_DISABLE, FONT_REG} from '../../utils/constans';

const ListCategory = ({title, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Catalog', {title: title, keyword: ''})
      }>
      <View style={styles.ListBar}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListCategory;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {},
  ListBar: {
    borderTopWidth: 1,
    borderTopColor: COLOR_DISABLE,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: FONT_REG,
    marginHorizontal: windowWidth * 0.04,
  },
});
