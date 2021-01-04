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

const Card = ({nav}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate('DetailPage');
        }}>
        <ImageBackground
          source={CardPictNew}
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
        <Text style={styles.brand}>Uniqlo</Text>
        <Text style={styles.nameProd}>White Dress V.1</Text>
        <Text style={styles.price}>30$</Text>
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
