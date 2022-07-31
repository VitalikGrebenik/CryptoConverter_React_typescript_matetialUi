import ConverterStore from "./converterStore";
import CryptoListStore from "./cryptoListStore";

const stores = {
	cryptoListStore : new CryptoListStore(),
	converterStore : new ConverterStore(),
}

export default stores;