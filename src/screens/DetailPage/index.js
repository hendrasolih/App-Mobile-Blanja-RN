import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {set} from 'react-native-reanimated';
import {IconStar, IconStarAct} from '../../assets';
import {Card, ImageGallery, ListBar, SizeColorPicker} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_REG,
} from '../../utils/constans';

const getUrl = 'http://192.168.100.2:8000';

const DetailPage = ({navigation, route}) => {
  const {itemId} = route.params;
  const [product, setProduct] = useState({});
  const [pictures, setPictures] = useState([]);
  const [card, setCard] = useState([]);
  useEffect(() => {
    // code to run on component mount
    console.log(itemId);
    getProduct(itemId);
    getDataCard();
  }, []);
  const getProduct = async (itemId) => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    };
    axios
      .get(`${getUrl}/product/` + itemId, config)
      .then(({data}) => {
        console.log(data.data[0]);
        const img = data.data[0].prd_image;
        const imgg = JSON.parse(img);
        console.log(imgg);
        console.log(typeof imgg);
        setProduct(data.data[0]);
        setPictures(imgg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDataCard = () => {
    axios
      .get('http://192.168.100.2:8000/products?filter=update&limit=3')
      .then((res) => {
        const card = res.data.data.products;
        setCard(card);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(`here is ${pictures}`);
  console.log(typeof product.prd_image);

  return (
    <>
      <ScrollView scrollEnabled={true} vertical={true}>
        <ImageGallery image={pictures} />
        <View style={styles.container}>
          <SizeColorPicker />
          <View style={styles.wraptitle}>
            <Text style={styles.title}>{product.prd_brand}</Text>
            <Text style={styles.title}>Rp.{product.prd_price}</Text>
          </View>
          <Text style={styles.PrdName}>{product.prd_name}</Text>
          <View style={styles.rating}>
            <IconStarAct />
            <IconStarAct />
            <IconStarAct />
            <IconStarAct />
            <IconStar />
            <Text style={styles.PrdName}> (10)</Text>
          </View>
          <Text style={styles.desc}>{product.prd_description}</Text>
          <ListBar nav={navigation} id={itemId} />
          <View style={styles.text}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 18}}>
              You can also like this
            </Text>
            <Text
              style={{
                fontFamily: FONT_LIGHT,
                fontSize: 11,
                color: COLOR_DISABLE,
              }}>
              3 items
            </Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.card}>
              {card.map(
                ({prd_id, prd_name, prd_brand, prd_price, prd_image}) => {
                  return (
                    <Card
                      nav={navigation}
                      key={prd_id}
                      id={prd_id}
                      name={prd_name}
                      brand={prd_brand}
                      price={prd_price}
                      image={JSON.parse(prd_image)}
                    />
                  );
                },
              )}
            </View>
          </ScrollView>
          <View style={{height: 75}}></View>
        </View>
      </ScrollView>

      <View style={styles.addcart}>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={{color: '#fff'}}>ADD TO CART</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailPage;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
    marginTop: windowWidth * 0.04,
  },
  addcart: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    width: windowWidth,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  title: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
  },
  wraptitle: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-between',
  },
  PrdName: {
    fontFamily: FONT_LIGHT,
    fontSize: 11,
    color: COLOR_DISABLE,
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  desc: {
    fontFamily: FONT_REG,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
  },
});
