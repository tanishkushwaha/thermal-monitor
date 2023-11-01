import { Box } from '@mui/material';

const Navbar = () => {

  return(
    <Box sx={{bgcolor: 'background', height: '10vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: 'Bungee', fontSize: '1.5rem'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'white'}}>
        Thermal
        <Box sx={{bgcolor: 'primary.main', color: 'background', width: '9rem', borderRadius: '0.25rem'}}>
          Monitor
        </Box>
      </Box>
    </Box>

  );
};

export default Navbar;