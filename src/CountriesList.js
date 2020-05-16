import api from './api';
import RegionFilter from './RegionFilter';

class CountriesList {
  constructor() {
    this.countries = [];
    this.regions = [];
    this.elements = {};

    this.registerElements();
    this.registerHandlers();
    this.loadList();
  }

  registerElements() {
    this.elements['list'] = document.getElementById('countries-list');
    this.elements['form'] = document.getElementById('country-search-form');
    this.elements['input'] = document.querySelector('input[name=country]');
    this.elements['loading'] = document.getElementById('loading');
    this.elements['filter'] = document.getElementById('filter-region');
  }

  registerHandlers() {
    this.elements['form'].onkeyup = event => this.filterSearchCountries(event);
  }

  async loadList() {
    try {
      const fields = 'alpha3Code;flag;name;flag;population;region;capital;'
      const response = await api.get(`/all?fields=${fields}`);
      this.countries = response.data;
      this.renderFilters();
      this.render();
    } catch (err) {
      alert("Error requesting API");
      console.warn(`Error requesting API. ${err}`);
    }
  }

  filterSearchCountries(event) {
    if (event.keyCode == 13) { event.preventDefault() };
    
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


  renderFilters() {
    const filterRegions = new RegionFilter;
    filterRegions.setRegions(this.countries);
    filterRegions.renderFilterElement(this.elements['filter'].id);
    this.elements['filter'].onchange = () => filterRegions.filterSelectRegion();
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

      let listEl = document.createElement('article');
      listEl.setAttribute('id', `country-${country.alpha3Code}`);
      listEl.setAttribute('class', 'box');

      let infoEl = document.createElement('div');
      infoEl.setAttribute('class', 'box-info');

      infoEl.appendChild(nameEl);
      infoEl.appendChild(populationEl);
      infoEl.appendChild(regionEl);
      infoEl.appendChild(capitalEl);

      let linkEl = document.createElement('a');
      linkEl.setAttribute('href', `details.html?country=${country.alpha3Code}`);
      linkEl.appendChild(imgEl);
      listEl.appendChild(linkEl);
      listEl.appendChild(infoEl);

      this.elements['list'].appendChild(listEl);
    })
  }
}

export default CountriesList;