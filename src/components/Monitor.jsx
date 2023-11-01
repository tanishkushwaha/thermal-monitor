import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Monitor(props) {
  
  const theme = useTheme();

  const tempColor = {
    cold: theme.palette.others.cyan,
    normal: theme.palette.others.green,
    warm: theme.palette.others.orange,
    hot: theme.palette.others.red,
  };

  let myStyles = {};

  if(props.unit === '°C') {
    if(props.temperature < 20) {
      myStyles.color = tempColor.cold;
    }
    else if(props.temperature >= 20 && props.temperature < 30) {
      myStyles.color = tempColor.normal;
    }
    else if(props.temperature >= 30 && props.temperature < 40) {
      myStyles.color = tempColor.warm;
    }
    else {
      myStyles.color = tempColor.hot;
    }
  }

  if(props.unit === '°F') {
    if(props.temperature < 68) {
      myStyles.color = tempColor.cold;
    }
    else if(props.temperature >= 68 && props.temperature < 86) {
      myStyles.color = tempColor.normal;
    }
    else if(props.temperature >= 86 && props.temperature < 104) {
      myStyles.color = tempColor.warm;
    }
    else {
      myStyles.color = tempColor.hot;
    }
  }


  return(
    <>

        <Box sx={{bgcolor: 'backgroundSecondary', display: 'flex', justifyContent: 'center', alignItems: 'center', width: {xs: '200px', sm: '300px'}, height:{xs: '200px', sm: '300px'}, borderRadius: '50%', fontSize: {xs: '3rem', sm: '5rem'}, fontFamily: 'Roboto'}}>

        <span style={myStyles}>
          {props.temperature}{props.unit}
        </span>

        </Box>
    </>
  );
}

export default Monitor;