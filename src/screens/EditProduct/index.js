import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {API_URL} from '@env';
import {COLOR_DISABLE, COLOR_MAIN, FONT_BOLD} from '../../utils/constans';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

const EditProduct = ({route, navigation}) => {
  const {itemId, name, brand, price, desc, image} = route.params;
  const [nameProd, setNameProd] = useState(name);
  const [brandProd, setBrand] = useState(brand);
  const [priceProd, setPrice] = useState(`${price}`);
  const [descProd, setDesc] = useState(desc);
  const [filePath, setFilePath] = useState([]);
  const [filePathCamera, setFilePathCamera] = useState([]);
  const [imgProd, setImg] = useState(JSON.parse(image));
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    // code to run on component mount
  }, []);

  console.log(`item id >  ${itemId}`);
  console.log(`name >  ${name}`);
  console.log(`brand >  ${brand}`);
  console.log(`price >  ${price}`);
  console.log(`desc >  ${desc}`);
  console.log(`image >  ${JSON.parse(image)}`);
  //console.log(imgProd.length);

  const handleSubmit = async () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + token,
        'Content-type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    data.append('prd_name', nameProd);
    data.append('prd_brand', brandProd);
    data.append('prd_price', priceProd);
    data.append('prd_description', descProd);
    if (filePath.length !== 0) {
      for (let i = 0; i < filePath.length; i++) {
        data.append('image', {
          name: filePath[i].path.split('/').pop(),
          type: filePath[i].mime,
          uri:
            Platform.OS === 'android'
              ? filePath[i].path
              : filePath[i].path.replace('file://', ''),
        });
      }
    }

    if (filePathCamera.length !== 0 && filePathCamera !== undefined) {
      data.append('image', {
        name: filePathCamera.path.split('/').pop(),
        type: filePathCamera.mime,
        uri:
          Platform.OS === 'android'
            ? filePathCamera.path
            : filePathCamera.path.replace('file://', ''),
      });
    }

    if (
      nameProd == '' ||
      brandProd == '' ||
      priceProd == '' ||
      descProd == ''
    ) {
      return Alert.alert('Add Product', 'Plese Fill All Form');
    }

    console.log(data);
    await axios
      .patch(`${API_URL}/update/${itemId}`, data, config)
      .then((res) => {
        console.log(res.data.msg);
      })
      .catch((err) => {
        console.log('error disini');
        console.log(err);
      });
    navigation.navigate('MyProduct');
  };

  const chooseFile = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log(images.length);
        // const imgss = images.map((item) => item.path);
        // console.log(imgss);
        setFilePath(images);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const choosePhoto = () => {
    ImagePicker.openCamera({
      //cropping: true,
      mediaType: 'photo',
    })
      .then((image) => {
        console.log(image);
        setFilePathCamera(image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <ScrollView vertical={true}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {filePath.length !== 0
            ? filePath.map((item) => {
                return (
                  <Image
                    key={filePath.indexOf(item)}
                    source={{uri: filePath.length !== 0 ? item.path : ''}}
                    style={styles.imageStyle}
                  />
                );
              })
            : imgProd.map((item) => {
                return (
                  <Image
                    key={imgProd.indexOf(item)}
                    source={{uri: imgProd.length !== 0 ? item : ''}}
                    style={styles.imageStyle}
                  />
                );
              })}
          {filePathCamera !== undefined && filePathCamera.length !== 0 && (
            <Image
              source={{uri: filePathCamera.path}}
              style={styles.imageStyle}
            />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile()}>
          <Text style={styles.textStyle}>Change Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => choosePhoto()}>
          <Text style={styles.textStyle}>Use Camera</Text>
        </TouchableOpacity>
        <View style={{...styles.wrapform, marginTop: 20}}>
          <Text style={{color: COLOR_DISABLE}}>Product Name</Text>
          <TextInput
            style={styles.form}
            placeholder="Product Name"
            defaultValue={nameProd}
            onChangeText={(nameProd) => setNameProd(nameProd)}
          />
        </View>
        <View style={styles.wrapform}>
          <Text style={{color: COLOR_DISABLE}}>Product Brand</Text>
          <TextInput
            style={styles.form}
            placeholder="Product Brand"
            defaultValue={brandProd}
            onChangeText={(brandProd) => setBrand(brandProd)}
          />
        </View>
        <View style={styles.wrapform}>
          <Text style={{color: COLOR_DISABLE}}>Product Price</Text>
          <TextInput
            style={styles.form}
            placeholder="Product Price"
            defaultValue={priceProd}
            onChangeText={(priceProd) => setPrice(priceProd)}
          />
        </View>
        <View style={styles.wrapform}>
          <Text style={{color: COLOR_DISABLE}}>Product Description</Text>
          <TextInput
            multiline={true}
            style={styles.form}
            placeholder="Product Description"
            defaultValue={descProd}
            onChangeText={(descProd) => setDesc(descProd)}
          />
        </View>
        <View style={{height: 20}} />
        <TouchableOpacity style={styles.btnadd} onPress={handleSubmit}>
          <Text style={{color: '#fff'}}>SUBMIT CHANGE</Text>
        </TouchableOpacity>
        <View style={{height: 120}} />
      </ScrollView>
    </View>
  );
};

export default EditProduct;

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
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
  },
  wrapform: {
    marginVertical: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 5,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  textStyle: {
    padding: 10,
    color: '#fff',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLOR_MAIN,
    padding: 5,
    marginVertical: 10,
    width: 250,
    borderRadius: 8,
  },
  btnadd: {
    height: 50,
    borderRadius: 24,
    backgroundColor: COLOR_MAIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
