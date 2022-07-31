import { observable, computed, action } from 'mobx'

import { TCoins } from '../Types'


type TSelectedCoins ={
	name: string;
	price : number;
}
 

class converterStore {
	@observable private selecterCoin : TSelectedCoins = {
		name: '',
		price: 0,
	}

	@computed
	get getSelecterCoin(){
		return this.selecterCoin;
	}

	@action
	setSelectedCoins(coin: TCoins ){
		return this.selecterCoin = {
			name: coin.name,
			price: coin.Price
		};
	}

}

export default converterStore;
