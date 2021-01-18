import React, {useState} from 'react';
import {Image, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_URL} from '@env';
const AddProduct = () => {
  const [filePath, setFilePath] = useState([]);
  const [nameProd, setNameProd] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [ctg, setCtg] = useState(0);
  const user_id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  console.log(API_URL);
  console.log(Platform.OS);

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

    console.log(data);
    axios
      .post(`${API_URL}/products`, data, config)
      .then((res) => {
        console.log(res.data.msg);
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
        // console.log(imgss);
        setFilePath(images);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text>Add Product</Text>
      <ScrollView vertical={true}>
        <View style={{flexDirection: 'row'}}>
          {filePath.map((item) => {
            return (
              <Image
                key={filePath.indexOf(item)}
                source={{uri: filePath.length !== 0 ? item.path : ''}}
                style={styles.imageStyle}
              />
            );
          })}
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile()}>
          <Text style={styles.textStyle}>Choose Image</Text>
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
        <TextInput
          style={styles.form}
          placeholder="Product Category"
          defaultValue={ctg.toString()}
          onChangeText={(ctg) => setCtg(ctg)}
          keyboardType="numeric"
        />
        <TextInput
          multiline={true}
          style={{...styles.form, height: 100, textAlignVertical: 'top'}}
          placeholder="Product Description"
          defaultValue={desc}
          onChangeText={(desc) => setDesc(desc)}
        />
        <View style={{height: 20}} />
        <TouchableOpacity
          style={{backgroundColor: '#fff', height: 50}}
          onPress={handleSumbmit}>
          <Text>ADD PRODUCT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
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
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 5,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
});
