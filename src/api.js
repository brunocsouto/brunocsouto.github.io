import axios from 'axios';

const api = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/',
});

export default api;

class Api {
    static async getAllCountriesInfo() {
        try {
            const response = await axios.get(`https://restcountries.eu/rest/v2/region/americas`);

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
