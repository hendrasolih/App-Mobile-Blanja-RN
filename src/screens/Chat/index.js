import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN} from '../../utils/constans';
import {API_URL} from '@env';
import socketIO from 'socket.io-client';

//redux
import {useSelector} from 'react-redux';
const socket = socketIO(`${API_URL}`);

const Chat = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  //sender id
  const user_id = useSelector((state) => state.auth.id);
  //recipe id

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const submitChatMessage = () => {
    socket.emit('chat message', {chatMessage, sender: user_id, recepient: 13});
    setChatMessage('');
  };

  console.log(chatMessages);
  console.log('length ' + chatMessages.length);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <View style={{backgroundColor: 'lightgrey'}}>
        {/* {chatMessages.length !== 0 &&
          chatMessages.map(({chatMessage, sender}, index) => {
            return (
              <View key={index}>
                <Text>{chatMessage}</Text>
                <Text>{sender}</Text>
              </View>
            );
          })} */}
        {chatMessages.length !== 0 &&
          chatMessages
            .filter(
              (chat) => chat.sender == user_id || chat.recepient == user_id,
            )
            .map(({chatMessage, sender}, index) => {
              return (
                <View key={index}>
                  <Text>{chatMessage}</Text>
                  <Text>{sender}</Text>
                </View>
              );
            })}
      </View>

      <View style={{height: 300}} />
      <View>
        {/* <Text>Hello, this is Message: {msgInput.current.value}</Text> */}
        <TextInput
          multiline={true}
          style={styles.form}
          placeholder="Message"
          value={chatMessage}
          onSubmitEditing={() => submitChatMessage()}
          onChangeText={(chatMessage) => {
            setChatMessage(chatMessage);
          }}
        />
        <TouchableOpacity style={styles.btn} onPress={submitChatMessage}>
          <Text style={{color: '#fff'}}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 75}} />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
    height: 80,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    marginHorizontal: 20,
    height: 30,
    justifyContent: 'center',
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
  },
});
