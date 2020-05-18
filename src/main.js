import api from './api';
import Header from './Header';
import CountriesList from './CountriesList';
import renderCountryDetails, {renderNavBar} from './countryDetails';

class App {
  constructor() {
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
    let countriesList = new CountriesList;
    countriesList.setCountries(this.data);
    countriesList.loadList();
    this.registerHandlers();
  }

  registerHandlers() {
    this.data.forEach(country => {
      document.getElementById(`country-${country.alpha3Code}`).onclick = () => this.showDetails(country);
    })
  }

  showDetails(country) {
    this.renderHeader();
    document.body.appendChild(renderNavBar());
    document.body.appendChild(renderCountryDetails(country));
    document.getElementById('back-button').onclick = () => this.loadPage();
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
