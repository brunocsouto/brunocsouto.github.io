import api from './api';

class App {
  constructor() {
    this.countries = [];
    this.urlParams = new URLSearchParams(window.location.search);
    this.elements = {};
    this.regions = [];

    this.loadRouter();
  }

  loadRouter() {
    this.elements['list'] = document.getElementById('countries-list');
    const countryCode = this.urlParams.get('country');
    if (countryCode) {
      this.elements['code'] = countryCode;
      this.searchCountry();
    } else {
      this.elements['form'] = document.getElementById('country-search-form');
      this.elements['input'] = document.querySelector('input[name=country]');
      this.elements['filter'] = document.getElementById('filter-region');
      this.elements['loading'] = document.getElementById('loading');

      this.registerHandlers();
      this.loadAllCountries();
    }
  }

  registerHandlers() {
    this.elements['form'].onkeyup = () => this.filterSearchCountries();
    this.elements['filter'].onchange = () => this.filterSelectRegion();
  }

  setLoading(loading = true) {
    if (loading == true) {
      let loadingElement = document.createElement('span');
      loadingElement.appendChild(document.createTextNode('Loading...'))
      loadingElement.setAttribute('id', 'loading');

      this.elements['loading'].appendChild(loadingElement);
    } else {
      document.getElementById('loading').remove();
    }
  }

  filterSearchCountries() {
    let countrySearch = this.elements['input'].value.toLowerCase();

    this.countries.forEach(country => {
      let lowName = country.name.toLowerCase();
      if (lowName.includes(countrySearch)) {
        document.getElementById(`country-${country.alpha3Code}`).style.display = 'initial';
      } else {
        document.getElementById(`country-${country.alpha3Code}`).style.display = 'none';
      }
    })
  }

  filterSelectRegion() {
    let selectedRegion = this.elements['filter'].value;

    this.countries.forEach(country => {
      if (selectedRegion == country.region) {
        document.getElementById(`country-${country.alpha3Code}`).style.display = 'initial';
      } else {
        document.getElementById(`country-${country.alpha3Code}`).style.display = 'none';
      }
    })
  }

  async searchCountry() {

    const countryInput = this.elements['code'];

    if (countryInput.length === 0) {
      return;
    }

    try {
      const response = await api.get(`/alpha/${countryInput}`);

      this.countries = [];
      const { name, alpha3Code, population, region, capital, flag } = response.data;


      this.countries.push({
        name,
        alpha3Code,
        population,
        region,
        capital,
        flag,
      });
      console.log(this.countries);

      this.render();
    } catch (err) {
      alert("Country don't exist");
      console.warn(`Country don't exist. ${err}`);
    }
  }

  async loadAllCountries() {
    this.setLoading();

    try {
      const response = await api.get(`/all`);

      response.data.forEach(country => {
        const { name, alpha3Code, population, region, capital, flag } = country;

        this.countries.push({
          name,
          alpha3Code,
          population,
          region,
          capital,
          flag,
        });
      });

      this.countries.forEach(country => {
        this.regions.push(country.region)
      });
      this.regions = this.regions.filter((value, index, self) => self.indexOf(value) === index);

      console.log(this.regions);

      this.renderFilters();


      this.elements['input'].value = '';

      this.render();
    } catch (err) {
      alert("Error requesting API");
      console.warn(`Error requesting API. ${err}`);
    }

    this.setLoading(false);
  }

  renderFilters() {
    this.regions.forEach(country => {
      let optionElement = document.createElement('option');
      optionElement.setAttribute('value', country);;
      optionElement.appendChild(document.createTextNode(country))

      this.elements['filter'].appendChild(optionElement);
    })
  }

  render() {
    this.elements['list'].innerHTML = '';

    this.countries.forEach(country => {
      let imgElement = document.createElement('img');
      imgElement.setAttribute('src', country.flag);

      let nameElement = document.createElement('strong');
      nameElement.appendChild(document.createTextNode(country.name));

      let populationElement = document.createElement('p');
      populationElement.appendChild(document.createTextNode(country.population));

      let regionElement = document.createElement('p');
      regionElement.appendChild(document.createTextNode(country.region));

      let capitalElement = document.createElement('p');
      capitalElement.appendChild(document.createTextNode(country.capital));

      let listElement = document.createElement('li');
      listElement.setAttribute('id', `country-${country.alpha3Code}`);
      listElement.appendChild(imgElement);
      listElement.appendChild(nameElement);
      listElement.appendChild(populationElement);
      listElement.appendChild(regionElement);
      listElement.appendChild(capitalElement);

      this.elements['list'].appendChild(listElement);
    })
  }
}

new App();
