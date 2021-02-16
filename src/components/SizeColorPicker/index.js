import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ColorItem from '../ColorItem';
import SizeItem from '../SizeItem';
import {IconLove} from '../../assets';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';
import {API_URL} from '@env';
import {Picker} from '@react-native-picker/picker';

const SelectColorPicker = ({
  id,
  changeSize,
  pickSize,
  changeColor,
  pickColor,
}) => {
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [modalVisibleSize, setModalVisibleSize] = useState(false);
  const [modalVisibleColor, setModalVisibleColor] = useState(false);
  useEffect(() => {
    // code to run on component mount
    getSize();
    getColor();
  }, []);
  const getSize = () => {
    axios
      .get(API_URL + '/size/' + id)
      .then((res) => {
        setSize(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getColor = () => {
    axios
      .get(API_URL + '/color/' + id)
      .then((res) => {
        setColor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setModalVisibleSize(!modalVisibleSize);
        }}>
        <View style={styles.size}>
          <Text>{pickSize == 0 ? 'Size' : pickSize}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisibleColor(!modalVisibleColor);
        }}>
        <View style={styles.size}>
          <Text>{pickColor == 'color' ? 'Color' : pickColor}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.love}>
          <IconLove />
        </View>
      </TouchableOpacity>
      {/* Modal Size*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSize}
        onRequestClose={() => {
          setModalVisibleSize(!modalVisibleSize);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.opacity} />
            <View style={styles.main}>
              {size.map(({size_id, size_prd}) => {
                return (
                  <SizeItem
                    key={size_id}
                    size={size_prd}
                    //changeSize={(pickSize) => setPickSize(pickSize)}
                    changeSize={changeSize}
                    closemodal={() => setModalVisibleSize(!modalVisibleSize)}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Size*/}
      {/* Modal Color*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleColor}
        onRequestClose={() => {
          setModalVisibleColor(!modalVisibleColor);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.opacity} />
            <View style={styles.main}>
              {color.map(({id, color_type}) => {
                return (
                  <ColorItem
                    key={id}
                    color={color_type}
                    changeColor={changeColor}
                    closemodal={() => setModalVisibleColor(!modalVisibleColor)}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Color*/}
    </View>
  );
};

export default SelectColorPicker;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  opacity: {
    height: windowHeight * 0.5,
    width: windowWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  main: {
    backgroundColor: '#fff',
    width: windowWidth,
    height: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  love: {
    backgroundColor: COLOR_MAIN,
    height: 36,
    width: 36,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 18,
  },
  size: {
    width: windowWidth * 0.35,
    height: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_DISABLE,
    paddingHorizontal: 5,
  },
  //modal
  sizeModal: {
    width: windowWidth * 0.1,
    height: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_DISABLE,
    paddingHorizontal: 5,
    marginBottom: 20,
    marginHorizontal: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    //padding: 35,
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  //modal
});
