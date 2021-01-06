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
import {screensEnabled} from 'react-native-screens';
import {HomePict} from '../../assets';
import {Card} from '../../components';
import {COLOR_DISABLE, FONT_BOLD, FONT_LIGHT} from '../../utils/constans';

const Home = ({navigation}) => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    // code to run on component mount
    getData();
  }, []);

  const getData = () => {
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
  return (
    <>
      <ImageBackground source={HomePict} style={styles.header}>
        <Text style={styles.banner}>Street clothes</Text>
      </ImageBackground>
      <View style={styles.container}>
        <ScrollView vertical={true}>
          <View>
            <TouchableOpacity>
              <Text style={styles.title} onPress={getData}>
                New
              </Text>
            </TouchableOpacity>
            <Text style={styles.view}>View all</Text>
            <Text style={styles.text}>You’ve never seen it before!</Text>
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
          <View>
            <Text style={styles.title}>Popular</Text>
            <Text style={styles.view}>View all</Text>
            <Text style={styles.text}>You’ve never seen it before!</Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.card}>
              {card.map(
                ({prd_id, prd_name, prd_brand, prd_price, prd_image}) => {
                  return (
                    <Card
                      nav={navigation}
                      key={prd_id}
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
          <View style={styles.gap}></View>
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
  gap: {
    height: 200,
  },
});
