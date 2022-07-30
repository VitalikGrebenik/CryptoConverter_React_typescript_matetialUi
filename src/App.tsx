import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import {Container, Paper, Grid, Box, TextField, FormControl, InputLabel, MenuItem, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


type TCoins = {
  name: string,
  fullName: string,
  imageUrl: string,
  Price: number,
  HIGH24HOUR: number,
}



function App() {

  const [cryptoAllCoins, setCryptoAllCoins] = useState<TCoins[]>([])


  useEffect(()=>{
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD').then(({data})=>{
      const coins: TCoins[] = data.Data.map((coin: any)=>{

        const obj: TCoins = {
          name: coin.CoinInfo.Name ,
          fullName: coin.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
          Price: coin.RAW.USD.PRICE,
          HIGH24HOUR: coin.RAW.USD.HIGH24HOUR,
        }

        return obj;
      })
      setCryptoAllCoins(coins)
    })
  },[setCryptoAllCoins])

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box margin='100px 0'>
      <Container fixed sx={{ maxWidth: '1200px'}}>
        <Grid container spacing={2}>
          <Grid item xs={8} >
            <Paper elevation={6} sx={{padding: '20px'}}>
              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Crypto</TableCell>
                      <TableCell align="left">FullName</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Price24h</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cryptoAllCoins.map((coins) => (
                      <TableRow
                        key={coins.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left"><img width='20px' height='20px' src={coins.imageUrl} alt="coins" /></TableCell>
                        <TableCell component="th" scope="row">
                          {coins.name}
                        </TableCell>
                        <TableCell align="left">{coins.fullName}</TableCell>
                        <TableCell align="left">{coins.Price}</TableCell>
                        <TableCell align="left">{coins.HIGH24HOUR}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={6} sx={{padding: '20px' }} >
              <Box display='flex' gap='10px'>
                <TextField label="Сумма" variant="outlined"  />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Валюта"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display='flex' gap='10px' marginTop='10px'>
                <TextField label="Сумма" variant="outlined"  />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Валюта"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography variant="h6" gutterBottom component="div" textAlign='center' marginTop='20px'>
                Price
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
