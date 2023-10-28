import { useState, useEffect, useRef } from 'react';
import { Box, Divider, Input, Button } from 'dracula-ui';
import './App.css';
import Monitor from './components/Monitor';
import Navbar from './components/Navbar';

function App() {
  const [temp, setTemp] = useState('- -');
  const [pingTimeoutId, setPingTimeoutId] = useState(null);
  const [isPhoneView, setIsPhoneView] = useState(false);
  const [inputIP, setInputIP] = useState('');
  const [deviceConnected, setDeviceConnected] = useState(false);

  const pingTimeoutIdRef = useRef(pingTimeoutId);


  // Media Query in JS

  useEffect(() => {

    const handleResize = () => {
      setIsPhoneView(window.innerWidth < 600);
    };
  
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };  
  }, []);


  // UseRef for pointing to the current ping timeout state

  useEffect(() => {
    pingTimeoutIdRef.current = pingTimeoutId;
  }, [pingTimeoutId]);


  // WebSocket

  // useEffect(() => {
  //   // ws://192.168.117.135:81
    
    

  //     return () => {
  //       socket.close(1000);
  //       clearInterval(intervalId);
  //     };
  //   }

  // }, [inputIP]);


  // Event Handlers

  const handleInput = (e) => {
    setInputIP(e.target.value);
  };

  const handleButtonClick = () => {
    console.log(inputIP);

    if(inputIP != '' && !deviceConnected) {

      const socket = new WebSocket(`ws://${inputIP}:81`);
  
      socket.onopen = () => {
        console.log('OPEN!');
        setDeviceConnected(true);
        
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
        setDeviceConnected(false);
        setTemp('CL');
      };
    }
  };


  return (
    <>
      <Navbar />

      <Divider color='purple' />

      <Box width='full' style={{height: isPhoneView ? '70vh' : '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
        <Box width='3xl' height={ isPhoneView ? 'sm' : 'lg' } color='blackSecondary' rounded='lg' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <Box color='black' display='flex' p={isPhoneView ? 'sm' : 'md'} rounded='lg' style={{width: isPhoneView ? '80%' : '70%', height: '90%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column'}}>

            <Box display='flex' style={{justifyContent: 'space-between', width:'100%'}}>

              <Input onChange={handleInput} borderSize='md' size={isPhoneView ? 'sm' : 'md'} color='purple' placeholder='Enter Device IP' mb={isPhoneView ? 'xs' : 'md'} style={{width: isPhoneView? '70%' : '80%'}} /> 
              <Button onClick={handleButtonClick} size={isPhoneView ? 'sm' : 'md'} color='purple' style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Enter</Button>

            </Box>

            <Monitor temperature={temp} /> 

          </Box>

        </Box>

      </Box>
    </>
  );
}

export default App;
