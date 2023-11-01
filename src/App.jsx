import { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Divider, Box } from '@mui/material';
import './App.css';
import Monitor from './components/Monitor';
import Navbar from './components/Navbar';

function App() {
  const [monitorDisplay, setMonitorDisplay] = useState('');
  const [pingTimeoutId, setPingTimeoutId] = useState(null);
  const [tempC, setTempC] = useState(null);
  const [tempUnit, setTempUnit] = useState('°C');
  const [deviceConnected, setDeviceConnected] = useState(false);

  const pingTimeoutIdRef = useRef(pingTimeoutId);
  const tempUnitRef = useRef(tempUnit);

  // WebSocket
  useEffect(() => {

    const socket = new WebSocket(`ws://192.168.117.135:81`);
  
      socket.onopen = () => {
        console.log('OPEN!');
        setDeviceConnected(true);
        
        const intervalId = setInterval(() => {
          socket.send('ping');
    
          const timeoutId = setTimeout(() => {
            console.log('No pong!');
            socket.close(1000);
            setMonitorDisplay('NR');
            setDeviceConnected(false);
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
          console.log(tempUnitRef);
          setTempC(msg.data);
        }
      };
  
      socket.onclose = (e) => {
        console.log('CLOSE!');
        setMonitorDisplay('CL');
        setDeviceConnected(false);
      };

      return () => {

        clearInterval(intervalId);
        clearTimeout(pingTimeoutIdRef.current);

      };

  }, []);


  // UseRef for pointing to the current ping timeout state
  useEffect(() => {
    pingTimeoutIdRef.current = pingTimeoutId;
  }, [pingTimeoutId]);

  useEffect(() => {
    if(tempC != '- -' && deviceConnected) {

      if(tempUnit === '°C') {
        setMonitorDisplay(tempC);
      }
      if(tempUnit === '°F') {
        setMonitorDisplay(parseInt(tempC * 9/5) + 32);
      }

    }
  }, [tempC, tempUnit]);


  const handleTabSwitch = (e, newValue) => {
    setTempUnit(newValue);
  };


  return (
    <>
      <Navbar />

      <Divider sx={{bgcolor: 'primary.main'}} />

      <Box sx={{width: '100vw', height: {xs: '70vh', sm:'85vh'}, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <Box sx={{width: '50rem', height: {xs: '25rem', sm: '30rem'}, borderRadius: '1rem', bgcolor: 'backgroundSecondary', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <Box sx={{bgcolor: 'background', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', borderRadius: '1rem', width: {xs: '85%', sm: '70%'}, height: '90%'}}>

            <Tabs value={tempUnit} onChange={handleTabSwitch}>
              
              <Tab value='°C' label='Celsius' />
              <Tab value='°F' label='Fahrenheit' />

            </Tabs>

            <Monitor temperature={monitorDisplay} unit={tempUnit} /> 

          </Box>

        </Box>

      </Box>
    </>
  );
}

export default App;
