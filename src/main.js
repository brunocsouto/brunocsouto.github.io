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
        document.getElementById(`country-${country.alpha3Code}`).classList.remove('invisible');
      } else {
        document.getElementById(`country-${country.alpha3Code}`).classList.add('invisible');
      }
    })
  }

  filterSelectRegion() {
    let selectedRegion = this.elements['filter'].value;

    this.countries.forEach(country => {
      if (selectedRegion == country.region) {
        document.getElementById(`country-${country.alpha3Code}`).classList.remove('invisible');
      } else {
        document.getElementById(`country-${country.alpha3Code}`).classList.add('invisible');
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
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', country.flag);
      
      let nameEl = document.createElement('h3');
      nameEl.appendChild(document.createTextNode(country.name));
      
      let populationEl = document.createElement('p');
      let populationLabel = document.createElement('label');
      populationLabel.appendChild(document.createTextNode('Population: '))
      populationEl.appendChild(populationLabel);
      populationEl.appendChild(document.createTextNode(country.population.toLocaleString()));
      
      let regionEl = document.createElement('p');
      let regionLabel = document.createElement('label');
      regionLabel.appendChild(document.createTextNode('Region: '))
      regionEl.appendChild(regionLabel);
      regionEl.appendChild(document.createTextNode(country.region));
      
      let capitalEl = document.createElement('p');
      let capitalLabel = document.createElement('label');
      capitalLabel.appendChild(document.createTextNode('Capital: '))
      capitalEl.appendChild(capitalLabel);
      capitalEl.appendChild(document.createTextNode(country.capital));
      
      let listEl = document.createElement('li');
      listEl.setAttribute('id', `country-${country.alpha3Code}`);
      listEl.setAttribute('class', 'box');
      
      let infoEl = document.createElement('div');
      infoEl.setAttribute('class', 'box-info');
      
      infoEl.appendChild(nameEl);
      infoEl.appendChild(populationEl);
      infoEl.appendChild(regionEl);
      infoEl.appendChild(capitalEl);
      
      if (this.elements['code']){
        listEl.appendChild(imgEl);
      } else {
        let linkEl = document.createElement('a');
        linkEl.setAttribute('href', `country.html?country=${country.alpha3Code}`);
        linkEl.appendChild(imgEl);
        listEl.appendChild(linkEl);
      }
      listEl.appendChild(infoEl);

      this.elements['list'].appendChild(listEl);
    })
  }
}

new App();
