import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';
import axios from 'axios';
import {API_URL} from '@env';

const showToastWithGravity = () => {
  ToastAndroid.showWithGravity(
    'Pick Color First',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};
const showToastSuccess = () => {
  ToastAndroid.showWithGravity(
    'Add Color Success',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

const AddColor = ({route, navigation}) => {
  const {prd_id} = route.params;
  const [merah, setMerah] = useState(false);
  const [kuning, setKuning] = useState(false);
  const [hijau, setHijau] = useState(false);
  const [biru, setBiru] = useState(false);
  const [coklat, setCoklat] = useState(false);
  const [abu, setAbu] = useState(false);
  const [hitam, setHitam] = useState(false);
  const postColor = () => {
    const data = [];
    if (merah) {
      data.push([prd_id, 1]);
    }
    if (kuning) {
      data.push([prd_id, 2]);
    }
    if (hijau) {
      data.push([prd_id, 3]);
    }
    if (biru) {
      data.push([prd_id, 4]);
    }
    if (coklat) {
      data.push([prd_id, 5]);
    }
    if (abu) {
      data.push([prd_id, 6]);
    }
    if (hitam) {
      data.push([prd_id, 7]);
    }
    if (data.length == 0) {
      return showToastWithGravity();
    }
    console.log(data);
    axios
      .post(`${API_URL}/color`, data)
      .then((res) => {
        console.log(res);
        showToastSuccess();
        navigation.navigate('MyProduct');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.constainer}>
      <View style={styles.checkbox}>
        <Text>Merah</Text>
        <CheckBox
          disabled={false}
          value={merah}
          onValueChange={(newValue) => setMerah(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>Kuning</Text>
        <CheckBox
          disabled={false}
          value={kuning}
          onValueChange={(newValue) => setKuning(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>Hijau</Text>
        <CheckBox
          disabled={false}
          value={hijau}
          onValueChange={(newValue) => setHijau(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>Biru</Text>
        <CheckBox
          disabled={false}
          value={biru}
          onValueChange={(newValue) => setBiru(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>Coklat</Text>
        <CheckBox
          disabled={false}
          value={coklat}
          onValueChange={(newValue) => setCoklat(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>Abu</Text>
        <CheckBox
          disabled={false}
          value={abu}
          onValueChange={(newValue) => setAbu(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>Hitam</Text>
        <CheckBox
          disabled={false}
          value={hitam}
          onValueChange={(newValue) => setHitam(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('MyProduct');
          }}>
          <Text style={{color: '#fff'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={postColor}>
          <Text style={{color: '#fff'}}>Add Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddColor;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  constainer: {
    marginHorizontal: windowWidth * 0.04,
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 20,
    backgroundColor: COLOR_MAIN,
    height: 30,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
