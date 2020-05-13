import axios from 'axios';

class Api {
    static async getAllCountriesInfo() {
        try {
            const response = await axios.get(`https://restcountries.eu/rest/v2/all`);

            console.log(response)
        } catch(err) {
            console.warn("Error from API request", err);
        }
    }
    static async getCountryInfo(countryCode) {
        try {
            const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
    
            console.log(response)
        } catch(err) {
            console.warn("Error from API request:", err);
        }
    }
}

Api.getAllCountriesInfo();
Api.getCountryInfo('bra');