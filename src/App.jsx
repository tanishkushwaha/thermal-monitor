import { useState, useEffect, useRef } from 'react';
import './App.css';
import Monitor from './components/Monitor';
import Navbar from './components/Navbar';

function App() {
  const [temp, setTemp] = useState('IN');
  const [pingTimeoutId, setPingTimeoutId] = useState(null);
  const pingTimeoutIdRef = useRef(pingTimeoutId);


  useEffect(() => {
    pingTimeoutIdRef.current = pingTimeoutId;
  }, [pingTimeoutId]);


  useEffect(() => {
    const socket = new WebSocket('ws://192.168.117.135:81');

    socket.onopen = () => {
      console.log('OPEN!');
      
      const intervalId = setInterval(() => {
        socket.send('ping');
  
        const timeoutId = setTimeout(() => {
          console.log('No pong!');
          socket.close(1000);
          setTemp('NR');
          clearInterval(intervalId);
  
        }, 5000);
  
        setPingTimeoutId(timeoutId);
        
      }, 10000);
      
    };

    socket.onmessage = (msg) => {
      if(msg.data == 'pong') {
        clearTimeout(pingTimeoutIdRef.current);
      }
      else {
        setTemp(msg.data);
      }
    };

    socket.onclose = (e) => {
      console.log('CLOSE!');
      setTemp('CL');
    };

    return () => {
      socket.close(1000);
      clearInterval(intervalId);
    };
  }, []);


  return (
    <>
      <Navbar />
      <Monitor temperature={temp} />
    </>
  );
}

export default App;
