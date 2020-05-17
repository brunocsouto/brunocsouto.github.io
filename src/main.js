import api from './api';
import Country from './Country';
import CountriesList from './CountriesList';
import Header from './Header';

class App {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.data = [];

    this.loadPage();
  }

  loadPage() {
    this.renderHeader();
    this.loadContent();
  }
  
  renderHeader () {
    document.body.innerHTML = '';
    new Header;
  }

  async loadContent() {
    await this.loadCountriesData();
    const countryCode = this.urlParams.get('country');
    if (countryCode) {
      // const country = new Country;
      // country.loadInformation(countryCode);
    } else {
      let countriesList = new CountriesList;
      countriesList.setCountries(this.data);
      countriesList.loadList();
    }
  }

  async loadCountriesData() {
    try {
      const fields = 'name;nativeName;alpha3Code;flag;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;';

      const response = await api.get(`/all?fields=${fields}`);
      this.data = response.data;      
    } catch (err) {
      alert("Error requesting API");
      console.warn(`Error requesting API. ${err}`);
    }
  }  
}

new App();
