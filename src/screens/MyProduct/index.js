import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {CardCatalog} from '../../components';

//redux
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN} from '../../utils/constans';

const MyProduct = ({navigation}) => {
  const user_id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + token,
      },
    };
    axios
      .get(`${API_URL}/product/user/${user_id}`, config)
      .then((res) => {
        //console.log(res.data.data[0]);
        const data = res.data.data;
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <Text>My Product</Text>
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('AddProduct')}>
        <Text style={{color: '#fff'}}>Add Product</Text>
      </TouchableOpacity>
      <ScrollView vertical={true}>
        {product.length !== 0 &&
          product.map(({prd_id, prd_name, prd_brand, prd_price, prd_image}) => {
            return (
              <View key={prd_id}>
                <CardCatalog
                  itemId={prd_id}
                  name={prd_name}
                  brand={prd_brand}
                  price={prd_price}
                  image={JSON.parse(prd_image)}
                  navigation={navigation}
                />
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: 'red',
                    }}>
                    delete
                  </Text>
                  <Text style={{marginHorizontal: 10}}>edit</Text>
                </View>
              </View>
            );
          })}
        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

export default MyProduct;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  add: {
    backgroundColor: COLOR_MAIN,
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
