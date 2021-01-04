import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconLove} from '../../assets';
import {COLOR_MAIN} from '../../utils/constans';

const SelectColorPicker = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.size}>
          <Text>Size</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.size}>
          <Text>Color</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.love}>
          <IconLove />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectColorPicker;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  love: {
    backgroundColor: COLOR_MAIN,
    height: 36,
    width: 36,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 18,
  },
  size: {
    width: windowWidth * 0.35,
    height: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
