import React, {useContext, useState, useEffect} from 'react';
import io from 'socket.io-client';
import {API_URL} from '@env';

//redux
import {useSelector} from 'react-redux';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({children}) {
  const user_id = useSelector((state) => state.auth.id);
  console.log('ini context' + user_id);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocketConnection = io(API_URL, {
      query: {user_id},
    });
    setSocket(newSocketConnection);

    return () => newSocketConnection.close();
  }, [user_id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
