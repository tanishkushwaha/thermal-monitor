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
              p: '1 rem',
              bgcolor: 'backgroundSecondary',
              display: 'flex', 
              justifyContent: 'space-around', 
              gap: '1rem',
              alignItems: 'center', 
              width: '80%',
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
              width: '20rem'
            }
          }
        />

        <Button variant="contained" color="primary" size="medium" onClick={handleClick}>
          Enter
        </Button>

      </Box>
    </>
  );
};

export default IPPrompt;