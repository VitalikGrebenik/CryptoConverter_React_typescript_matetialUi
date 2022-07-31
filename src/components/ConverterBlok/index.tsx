import React from 'react'
import {observer, inject} from 'mobx-react'

import { Paper, Box, TextField, FormControl, InputLabel, MenuItem, Typography} from '@mui/material';
import Select from '@mui/material/Select';
import cryptoListStore from '../stores/cryptoListStore';
import converterStore from '../stores/converterStore';


type IConverter = {
	cryptoListStore?: cryptoListStore,
  converterStore?: converterStore,
}

const ConverterCoin = inject('cryptoListStore','converterStore')(observer(({cryptoListStore, converterStore} : IConverter ) => {

  const coins = cryptoListStore!.getItems.map(coin=>coin.name) ;

  console.log(converterStore?.getSelecterCoin)

  return (
    <Paper elevation={6} sx={{padding: '20px' }} >
    <Box display='flex' gap='10px'>
      <TextField label="Сумма" variant="outlined"  />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
        <Select value={converterStore?.getSelecterCoin} label="Валюта">
          {
            coins.map((name, index)=><MenuItem key={index} value={name}>{name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
    <Box display='flex' gap='10px' marginTop='10px'>
      <TextField label="Сумма" variant="outlined"  />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
        <Select value={String(coins[1])} label="Валюта">
          {
            coins.map((name, index)=><MenuItem key={index} value={name}>{name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
    <Typography variant="h6" gutterBottom component="div" textAlign='center' marginTop='20px'>
      Price
    </Typography>
  </Paper>
  )
}))

export default ConverterCoin
