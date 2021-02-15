import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {CardCatalog} from '../../components';

//redux
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD} from '../../utils/constans';

const MyProduct = ({navigation}) => {
  const user_id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProduct();
    });

    return unsubscribe;
  }, [navigation]);

  const getProduct = async () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + token,
      },
    };
    await axios
      .get(`${API_URL}/product/user/${user_id}`, config)
      .then((res) => {
        //console.log(res.data.data[0]);
        const data = res.data.data;
        setProduct(data);
        console.log('get data');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    Alert.alert(
      'Delete Product',
      'Are Sure Want Delete ?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const config = {
              headers: {
                'x-access-token': 'Bearer ' + token,
              },
            };
            await axios
              .delete(`${API_URL}/product/${id}`, config)
              .then((res) => console.log(res.data))
              .catch((err) => {
                console.log(err);
              });
            console.log('klick delete OK' + id);
            getProduct();
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Product</Text>
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('AddProduct')}>
        <Text style={{color: '#fff'}}>Add Product</Text>
      </TouchableOpacity>
      <ScrollView vertical={true}>
        {product.length !== 0 &&
          product.map(
            ({
              prd_id,
              prd_name,
              prd_brand,
              prd_price,
              prd_image,
              prd_description,
            }) => {
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
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <TouchableOpacity
                      style={{...styles.btnDelete, marginLeft: 5}}
                      onPress={() => {
                        console.log('TO COLOR');
                        navigation.navigate('AddColor', {prd_id});
                      }}>
                      <Text style={{marginHorizontal: 10}}>Add Color</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{...styles.btnDelete, marginLeft: 5}}
                      onPress={() => {
                        console.log('TO SIZE');
                        navigation.navigate('AddSize', {prd_id});
                      }}>
                      <Text style={{marginHorizontal: 10}}>Add Size</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnDelete}
                      onPress={() => {
                        deleteProduct(prd_id);
                      }}>
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: 'red',
                        }}>
                        delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{...styles.btnDelete, marginLeft: 5}}
                      onPress={() =>
                        navigation.navigate('EditProduct', {
                          itemId: prd_id,
                          name: prd_name,
                          brand: prd_brand,
                          price: prd_price,
                          image: prd_image,
                          desc: prd_description,
                        })
                      }>
                      <Text style={{marginHorizontal: 10}}>edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          )}
        <View style={{height: 150}} />
      </ScrollView>
    </View>
  );
};

export default MyProduct;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  title: {
    fontSize: 34,
    fontFamily: FONT_BOLD,
    marginTop: 40,
    marginBottom: 20,
  },
  add: {
    backgroundColor: COLOR_MAIN,
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDelete: {
    backgroundColor: '#fff',
    height: 20,
    borderRadius: 5,
  },
});
