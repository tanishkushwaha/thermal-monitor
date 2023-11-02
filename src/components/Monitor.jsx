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

  if(props.forColor < 20) {
    myStyles.color = tempColor.cold;
  }
  else if(props.forColor >= 20 && props.forColor < 30) {
    myStyles.color = tempColor.normal;
  }
  else if(props.forColor >= 30 && props.forColor < 40) {
    myStyles.color = tempColor.warm;
  }
  else {
    myStyles.color = tempColor.hot;
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