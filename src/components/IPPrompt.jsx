import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const IPPrompt = ({ setIpAddress }) => {

  const [inputText, setInputText] = useState(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClick = (e) => {
    setIpAddress(inputText);
  };

  return (
    <>
      <Box 
        sx={
            {
              bgcolor: 'backgroundSecondary',
              display: 'flex', 
              flexDirection: {xs: 'column', sm: 'row'},
              justifyContent: 'space-around',
              alignItems: 'center', 
              width: '90%',
              height: '30%',
              borderRadius: '1rem'
            }
          }>

        <TextField
          id="ip"
          label="Nodemcu IP Address"
          onChange={handleChange}
          size="small"
          variant="outlined"
          sx={
            {
              width: '70%'
            }
          }
        />

        <Button 
          variant="contained" 
          color="primary" 
          size="medium" 
          onClick={handleClick}
          sx={{ width: {xs: '70%', sm: '20%'} }}
        >
          Enter
        </Button>

      </Box>
    </>
  );
};

export default IPPrompt;