import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HomePict, IconBell} from '../../assets';
import {Card} from '../../components';
import {COLOR_DISABLE, FONT_BOLD, FONT_LIGHT} from '../../utils/constans';
import {API_URL} from '@env';

const Home = ({navigation}) => {
  const [card, setCard] = useState([]);
  const [newCard, setNewCard] = useState([]);
  useEffect(() => {
    // code to run on component mount
    getData();
    getNewData();
  }, []);

  const getData = () => {
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
  const getNewData = () => {
    axios
      .get(`${API_URL}/products?filter=new&limit=3`)
      .then((res) => {
        const card = res.data.data.products;
        setNewCard(card);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ImageBackground source={HomePict} style={styles.header}>
        <Text style={styles.banner}>Street clothes</Text>
        <IconBell
          style={styles.notif}
          onPress={() => navigation.navigate('Notification')}
        />
      </ImageBackground>
      <View style={styles.container}>
        <ScrollView vertical={true}>
          <View>
            <TouchableOpacity>
              <Text style={styles.title} onPress={getData}>
                New
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Catalog', {title: 'New', keyword: ''})
              }>
              <Text style={styles.view}>View all</Text>
            </TouchableOpacity>
            <Text style={styles.text}>You’ve never seen it before!</Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.card}>
              {newCard.map(
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
          <View>
            <Text style={styles.title}>Popular</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Catalog', {title: 'Popular', keyword: ''})
              }>
              <Text style={styles.view}>View all</Text>
            </TouchableOpacity>
            <Text style={styles.text}>You’ve never seen it before!</Text>
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
          <View style={styles.gap} />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  title: {
    fontSize: 34,
    marginTop: 20,
    fontFamily: FONT_BOLD,
  },
  view: {
    alignSelf: 'flex-end',
    fontFamily: FONT_LIGHT,
  },
  text: {
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.24,
    flexDirection: 'row',
  },
  banner: {
    fontFamily: FONT_BOLD,
    color: '#fff',
    fontSize: 34,
    marginTop: windowHeight * 0.17,
    marginHorizontal: windowWidth * 0.04,
  },
  card: {
    flexDirection: 'row',
  },
  notif: {
    marginLeft: 35,
    marginVertical: 50,
  },
  gap: {
    height: 200,
  },
});
