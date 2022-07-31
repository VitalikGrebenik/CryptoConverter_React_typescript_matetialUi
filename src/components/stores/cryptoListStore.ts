import { observable, computed, action } from 'mobx'
import axios from 'axios'

import { TCoins, TDiffCoins } from '../Types'

 

class cryptoListStore {
	@observable private items : TCoins[] = [];
	@observable private diffItems : TDiffCoins = {};

	@computed
	get getItems(){
		return this.items;
	}

	@computed
	get getDiffObj(){
		return this.diffItems;
	}

	@action
	setItems = (items: TCoins[]):void=>{
		
		this.diffItems = this.diffCurrenty(this.items, items).reduce((init: TDiffCoins, obj: TCoins)=>{
			
			const newObj: TCoins = items.find(o=>o.name === obj.name )!

			const oldObj: TCoins = this.items.find(itemObj=>itemObj.name === newObj.name)!
			const color: string = newObj.Price === oldObj.Price ? '' : newObj.Price > oldObj.Price ? 'green' : 'red' ;

			init[newObj.name] = color
			return init
		},
		{},
		)
		console.log(JSON.stringify(this.diffItems))
		this.items = items;
	} 

	@action
	axiosCoins = () =>{
		axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD').then(({data})=>{
			const coins: TCoins[] = data.Data.map((coin: any)=>{
	  
			  const obj: TCoins = {
				name: coin.CoinInfo.Name ,
				fullName: coin.CoinInfo.FullName,
				imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
				Price: (coin.RAW.USD.PRICE).toFixed(3),
				HIGH24HOUR: (coin.RAW.USD.HIGH24HOUR).toFixed(3),
			  }
			  return obj;
			})
			this.setItems(coins)
		  })
		};
	
	diffCurrenty(arr1:TCoins[], arr2:TCoins[]){
		return arr1.filter((obj, index)=>{
			if(obj.Price !== arr2[index].Price){
				return true
			}
			return false
		})
	}
};

export default cryptoListStore;
