import {Container, Grid, Box} from '@mui/material';

import './App.css';
import {CryptoTable, ConverterCoin} from './components/index';


function App() {
  return (
    <Box margin='100px 0'>
      <Container fixed sx={{ maxWidth: '1200px'}}>
        <Grid container spacing={2}>
          <Grid item xs={8} >
            <CryptoTable />
          </Grid>
          <Grid item xs={4}>
            <ConverterCoin/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
