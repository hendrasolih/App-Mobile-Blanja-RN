import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardPict, CardPictNew, IconStar, IconStarAct} from '../../assets';
import {
  COLOR_DISABLE,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
  FONT_REG,
} from '../../utils/constans';
import {API_URL} from '@env';

const Card = ({nav, name, brand, price, image, id}) => {
  const url = image[0];
  const img = {uri: `${API_URL}${url}`};
  console.log(typeof image);
  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate('DetailPage', {itemId: id});
        }}>
        <ImageBackground
          source={img}
          style={styles.carpict}
          imageStyle={styles.cardstyle}></ImageBackground>
        <View style={styles.star}>
          {true && (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStar />
            </>
          )}
        </View>
        <Text style={styles.brand}>{brand}</Text>
        <View style={{width: 148}}>
          <Text style={styles.nameProd}>{name}</Text>
        </View>
        <Text style={styles.price}>Rp {toPrice(price)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  carpict: {
    height: 184,
    width: 148,
    borderRadius: 8,
  },
  cardstyle: {
    borderRadius: 8,
    resizeMode: 'cover',
  },
  star: {
    flexDirection: 'row',
  },
  brand: {
    fontSize: 11,
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
  },
  nameProd: {
    fontSize: 15,
    fontFamily: FONT_BOLD,
  },
  price: {
    fontSize: 14,
    fontFamily: FONT_REG,
  },
});
