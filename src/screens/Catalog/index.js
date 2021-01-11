import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {IconFilter} from '../../assets';
import {NavBar} from '../../components';
import CardCatalog from '../../components/CardCatalog';
import {FONT_LIGHT} from '../../utils/constans';

const getUrl = 'http://192.168.100.2:8000';

const Catalog = ({navigation, route}) => {
  let {title, keyword} = route.params;
  const [viewall, setViewall] = useState([]);
  useEffect(() => {
    // code to run on component mount
    getViewAll();
  }, [keyword]);
  const getViewAll = () => {
    if (title === 'View All Items' || title === '' || title === undefined) {
      title = '';
    }
    console.log(title);
    console.log(keyword);
    axios
      .get(`${getUrl}/products?limit=10&category=${title}&search=${keyword}`)
      .then(({data}) => {
        //console.log(data.data.products);
        setViewall(data.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log(viewall[0]);
  //console.log(`ini ${keyword}`);
  return (
    <>
      <View style={styles.head}>
        <NavBar navigation={navigation} title={title} />
        <View style={styles.wrapfilter}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate('Filter')}>
            <IconFilter style={{marginRight: 10}} />
            <Text style={{fontFamily: FONT_LIGHT}}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: windowWidth * 0.04, marginVertical: 10}}>
        <ScrollView>
          {viewall.length !== 0 &&
            viewall.map(
              ({prd_id, prd_name, prd_brand, prd_price, prd_image}) => {
                return (
                  <CardCatalog
                    key={prd_id}
                    itemId={prd_id}
                    name={prd_name}
                    brand={prd_brand}
                    price={prd_price}
                    image={JSON.parse(prd_image)}
                    navigation={navigation}
                  />
                );
              },
            )}

          <View style={styles.gap} />
        </ScrollView>
      </View>
    </>
  );
};

export default Catalog;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapfilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  head: {
    backgroundColor: '#fff',
  },
  filter: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  gap: {
    height: 100,
  },
});
