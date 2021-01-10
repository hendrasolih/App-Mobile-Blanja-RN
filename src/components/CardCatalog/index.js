import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {IconStar, IconStarAct} from '../../assets';
import {COLOR_DISABLE} from '../../utils/constans';

const CardCatalog = () => {
  const imgs = {uri: `https://i.imgur.com/OsyDmHm.jpg`};
  return (
    <View style={styles.container}>
      <Image source={imgs} style={styles.img} />
      <View style={styles.infobag}>
        <Text>Pullover</Text>
        <Text>Mango</Text>
        <View style={{flexDirection: 'row'}}>
          <IconStarAct />
          <IconStarAct />
          <IconStarAct />
          <IconStarAct />
          <IconStar />
        </View>
        <Text>51$</Text>
      </View>
    </View>
  );
};

export default CardCatalog;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  img: {
    width: 104,
    height: 104,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    backgroundColor: '#fff',
    width: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 5,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
