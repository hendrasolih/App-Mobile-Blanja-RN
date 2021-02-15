import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';
import axios from 'axios';
import {API_URL} from '@env';

const showToastWithGravity = () => {
  ToastAndroid.showWithGravity(
    'Pick Size First',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};
const showToastSuccess = () => {
  ToastAndroid.showWithGravity(
    'Add Size Success',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

const AddSize = ({route, navigation}) => {
  const {prd_id} = route.params;
  const [empatDua, setEmpatDua] = useState(false);
  const [tigaLapan, setTigaLapan] = useState(false);
  const [tigaSembilan, setTigaSembilan] = useState(false);
  const [empatPuluh, setEmpatPuluh] = useState(false);
  const [empatSatu, setEmpatSatu] = useState(false);
  const [s, setS] = useState(false);
  const [m, setM] = useState(false);
  const [l, setL] = useState(false);
  const [xl, setXL] = useState(false);
  const postColor = () => {
    const data = [];
    if (empatDua) {
      data.push([prd_id, 1]);
    }
    if (tigaLapan) {
      data.push([prd_id, 3]);
    }
    if (tigaSembilan) {
      data.push([prd_id, 4]);
    }
    if (empatPuluh) {
      data.push([prd_id, 5]);
    }
    if (empatSatu) {
      data.push([prd_id, 6]);
    }
    if (s) {
      data.push([prd_id, 7]);
    }
    if (m) {
      data.push([prd_id, 8]);
    }
    if (l) {
      data.push([prd_id, 9]);
    }
    if (xl) {
      data.push([prd_id, 10]);
    }
    if (data.length == 0) {
      return showToastWithGravity();
    }
    //console.log(data);
    axios
      .post(`${API_URL}/size`, data)
      .then((res) => {
        //console.log(res);
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
        <Text>38</Text>
        <CheckBox
          disabled={false}
          value={tigaLapan}
          onValueChange={(newValue) => setTigaLapan(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>39</Text>
        <CheckBox
          disabled={false}
          value={tigaSembilan}
          onValueChange={(newValue) => setTigaSembilan(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>40</Text>
        <CheckBox
          disabled={false}
          value={empatPuluh}
          onValueChange={(newValue) => setEmpatPuluh(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>41</Text>
        <CheckBox
          disabled={false}
          value={empatSatu}
          onValueChange={(newValue) => setEmpatSatu(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>42</Text>
        <CheckBox
          disabled={false}
          value={empatDua}
          onValueChange={(newValue) => setEmpatDua(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>S</Text>
        <CheckBox
          disabled={false}
          value={s}
          onValueChange={(newValue) => setS(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>M</Text>
        <CheckBox
          disabled={false}
          value={m}
          onValueChange={(newValue) => setM(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>L</Text>
        <CheckBox
          disabled={false}
          value={l}
          onValueChange={(newValue) => setL(newValue)}
          tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
        />
      </View>
      <View style={styles.checkbox}>
        <Text>XL</Text>
        <CheckBox
          disabled={false}
          value={xl}
          onValueChange={(newValue) => setXL(newValue)}
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
          <Text style={{color: '#fff'}}>Add Size</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddSize;

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
