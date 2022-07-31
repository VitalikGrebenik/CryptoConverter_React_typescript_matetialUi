import React, { useEffect } from 'react'
import {observer, inject} from 'mobx-react'

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import { TCoins, TDiffCoins } from '../Types/index'
import cryptoListStore from '../stores/cryptoListStore'
import converterStore from '../stores/converterStore'



type ICryptoTable = {
	cryptoListStore?: cryptoListStore,
	converterStore?: converterStore,
}

const colors: {[key: string]: string} = {
	red: '#e30d0da1',
	green :'#72e446a1',
}


const CryptoTable = inject('cryptoListStore', 'converterStore')(
	observer(( {cryptoListStore, converterStore} : ICryptoTable ) => {
	const coinsItem : TCoins[] = cryptoListStore!.getItems;
	const difObj : TDiffCoins = cryptoListStore!.getDiffObj;
	useEffect(()=>{
		cryptoListStore!.axiosCoins()
		setInterval(()=>{
				cryptoListStore!.axiosCoins()
			}, 30*1000)
	}, [])

	const onClickRow = (coin: TCoins) =>{
		if(converterStore){
			converterStore.setSelectedCoins(coin)
		}
	}

  return (
	<Paper elevation={6} sx={{padding: '20px'}}>
	<TableContainer component={Paper}>
	  <Table sx={{ maxWidth: 850 }} aria-label="simple table">
		<TableHead>
		  <TableRow>
			<TableCell>Crypto</TableCell>
			<TableCell align="left">FullName</TableCell>
			<TableCell align="left">Name</TableCell>
			<TableCell align="left">Price</TableCell>
			<TableCell align="left">HighPrice24h</TableCell>
		  </TableRow>
		</TableHead>
		<TableBody>
		  {coinsItem.map((coins: TCoins) => (
			<TableRow hover 
			  key={coins.name}
			  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
			  onClick={()=>onClickRow(coins)}
			>
			  <TableCell align="left"><img width='30px' height='30px' src={coins.imageUrl} alt="coins" /></TableCell>
			  <TableCell component="th" scope="row">
				{coins.name}
			  </TableCell>
			  <TableCell align="left">{coins.fullName}</TableCell>
			  <TableCell sx={{ background: difObj[coins.name] && `${colors}${difObj[coins.name]}`, fontSize:'18px'}} align="left">$ {coins.Price}</TableCell>
			  <TableCell sx={{ fontSize:'18px'}} align="left">$ {coins.HIGH24HOUR}</TableCell>
			</TableRow>
		  ))}
		</TableBody>
	  </Table>
	</TableContainer>
  </Paper>
  )
}))

export default CryptoTable