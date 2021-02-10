import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {API_URL} from '@env';
import {COLOR_DISABLE, COLOR_MAIN, FONT_BOLD} from '../../utils/constans';
const AddProduct = ({navigation}) => {
  useEffect(() => {
    // code to run on component mount
    getCategory();
  }, []);
  const [category, setCategory] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [filePathCamera, setFilePathCamera] = useState([]);
  const [nameProd, setNameProd] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [ctg, setCtg] = useState(0);
  const user_id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  console.log(ctg);

  const getCategory = () => {
    axios
      .get(`${API_URL}/category`)
      .then(({data}) => {
        //console.log(data.data);
        setCategory(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSumbmit = async () => {
    console.log(filePath);
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + token,
        'Content-type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    data.append('prd_name', nameProd);
    data.append('prd_brand', brand);
    data.append('prd_price', price);
    data.append('prd_description', desc);
    data.append('user_id', user_id);
    data.append('prd_ctg', ctg);
    // data.append('image', filePath);
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
      brand == '' ||
      price == '' ||
      desc == '' ||
      ctg == 0
    ) {
      return Alert.alert('Add Product', 'Plese Fill All Form');
    }
    console.log(data);
    axios
      .post(`${API_URL}/products`, data, config)
      .then((res) => {
        console.log(res.data.msg);
        navigation.navigate('MyProduct');
      })
      .catch((err) => {
        console.log('error disini');
        console.log(err);
      });
  };
  const chooseFile = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log(images.length);
        // const imgss = images.map((item) => item.path);
        //console.log(imgss);
        console.log(images);
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

  console.log(filePathCamera);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <ScrollView vertical={true}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {filePath.map((item) => {
            return (
              <Image
                key={filePath.indexOf(item)}
                source={{uri: filePath.length !== 0 ? item.path : ''}}
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
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => choosePhoto()}>
          <Text style={styles.textStyle}>Use Camera</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.form}
          placeholder="Product Name"
          defaultValue={nameProd}
          onChangeText={(nameProd) => setNameProd(nameProd)}
        />
        <TextInput
          style={styles.form}
          placeholder="Product Brand"
          defaultValue={brand}
          onChangeText={(brand) => setBrand(brand)}
        />
        <TextInput
          style={styles.form}
          placeholder="Product Price"
          defaultValue={price}
          onChangeText={(price) => setPrice(price)}
        />
        <View style={{backgroundColor: '#fff', marginBottom: 10}}>
          <Text style={{fontSize: 14, color: COLOR_DISABLE}}>
            Product Category
          </Text>
          {/* DROPDOWN */}
          <Picker
            selectedValue={ctg}
            //style={{height: 50, width: 100}}
            onValueChange={(itemValue) => {
              setCtg(itemValue);
            }}>
            {category.length !== 0 &&
              category.map(({ctg_id, ctg_name}) => {
                return (
                  <Picker.Item key={ctg_id} label={ctg_name} value={ctg_id} />
                );
              })}
          </Picker>
        </View>
        <TextInput
          multiline={true}
          style={{...styles.form, height: 100, textAlignVertical: 'top'}}
          placeholder="Product Description"
          defaultValue={desc}
          onChangeText={(desc) => setDesc(desc)}
        />
        <View style={{height: 20}} />
        <TouchableOpacity style={styles.btnadd} onPress={handleSumbmit}>
          <Text style={{color: '#fff'}}>ADD PRODUCT</Text>
        </TouchableOpacity>
        <View style={{height: 130}} />
      </ScrollView>
    </View>
  );
};

export default AddProduct;

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
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
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
  imageStyle: {
    width: 100,
    height: 100,
    margin: 5,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  btnadd: {
    height: 50,
    borderRadius: 24,
    backgroundColor: COLOR_MAIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
