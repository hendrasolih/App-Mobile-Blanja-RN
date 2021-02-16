import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {IconStar, IconStarAct} from '../../assets';
import {Card, ImageGallery, ListBar, SizeColorPicker} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_REG,
} from '../../utils/constans';

// Redux
import {connect, useSelector} from 'react-redux';
import {addToCart} from '../../utils/redux/action/cartAction';
import {API_URL} from '@env';

const toPrice = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const showToastWithGravity = () => {
  ToastAndroid.showWithGravity(
    'Added To Cart',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

const DetailPage = ({navigation, route, addToCart}) => {
  const {itemId} = route.params;
  const [product, setProduct] = useState({});
  const [pictures, setPictures] = useState([]);
  const [card, setCard] = useState([]);
  const [pickSize, setPickSize] = useState(0);
  const [pickColor, setPickColor] = useState('color');
  const level = useSelector((state) => state.auth.level);
  const token = useSelector((state) => state.auth.token);
  const [price, setPrice] = useState('');
  console.log(`level detail page: ${level}`);
  useEffect(() => {
    // code to run on component mount
    console.log(itemId);
    getProduct(itemId);
    getDataCard();
  }, []);
  const getProduct = async (itemId) => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + token,
      },
    };
    axios
      .get(`${API_URL}/product/` + itemId, config)
      .then(({data}) => {
        console.log(data.data[0]);
        const img = data.data[0].prd_image;
        const imgg = JSON.parse(img);
        console.log(imgg);
        console.log(typeof imgg);
        setProduct(data.data[0]);
        setPrice(
          data.data[0].prd_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        );
        setPictures(imgg);
      })
      .catch((err) => {
        console.log(err);
        navigation.replace('Login');
      });
  };
  const getDataCard = () => {
    axios
      .get(`${API_URL}/products?filter=rating&limit=3`)
      .then((res) => {
        const card = res.data.data.products;
        setCard(card);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(`here is ${pictures}`);
  // console.log(typeof product.prd_image);
  // console.log(`ini size: ${pickSize}`);
  // console.log(`ini color: ${pickColor}`);
  return (
    <>
      <ScrollView scrollEnabled={true} vertical={true}>
        <ImageGallery image={pictures} />
        <View style={styles.container}>
          <SizeColorPicker
            id={itemId}
            changeSize={(pickSize) => setPickSize(pickSize)}
            pickSize={pickSize}
            changeColor={(pickColor) => setPickColor(pickColor)}
            pickColor={pickColor}
          />
          <View style={styles.wraptitle}>
            <Text style={styles.title}>{product.prd_brand}</Text>
            <Text style={styles.title}>Rp {price}</Text>
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
          <ListBar
            nav={navigation}
            id={itemId}
            sellerId={product.user_id}
            sellerName={product.user_name}
          />
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
                ({
                  prd_id,
                  prd_name,
                  prd_brand,
                  prd_price,
                  prd_image,
                  rating_product,
                  total_review,
                }) => {
                  return (
                    <Card
                      nav={navigation}
                      key={prd_id}
                      id={prd_id}
                      name={prd_name}
                      brand={prd_brand}
                      price={prd_price}
                      image={JSON.parse(prd_image)}
                      rating={rating_product}
                      review={total_review}
                    />
                  );
                },
              )}
            </View>
          </ScrollView>
          <View style={{height: 75}}></View>
        </View>
      </ScrollView>

      {level === 'Customer' && (
        <View style={styles.addcart}>
          <TouchableOpacity
            onPress={() => {
              addToCart(
                itemId,
                pictures[0],
                product.prd_price,
                product.prd_name,
                pickSize,
                pickColor,
                product.user_id,
              );
              console.log('on Press');
              showToastWithGravity();
            }}>
            <View style={styles.btn}>
              <Text style={{color: '#fff'}}>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, img, prc, name, size, color, sellerid) =>
      dispatch(addToCart(id, img, prc, name, size, color, sellerid)),
  };
};

export default connect(null, mapDispatchToProps)(DetailPage);

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
