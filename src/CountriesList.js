import ControlPanel from './ControlPanel';
import renderCountryItem from './countryItem';
import RegionFilter from './RegionFilter';

class CountriesList {
  constructor() {
    this.countries = [];
    this.regions = [];
    this.elements = {};
  }

  setCountries(countriesData) {
    this.countries = countriesData;
  }

  renderControlPanel() {
    const controlPanel = new ControlPanel;
    this.elements = controlPanel.getElements();
  }

  loadList() {
    this.renderControlPanel();

    let mainEl = document.createElement('main');
    mainEl.classList = 'container';
    let sectionEl = document.createElement('section');
    sectionEl.setAttribute('id', 'countries-list');
    sectionEl.classList = 'grid-box';

    this.countries.forEach(country => {
      let listItem = renderCountryItem(country);
      sectionEl.appendChild(listItem);
    })

    mainEl.appendChild(sectionEl);
    document.body.appendChild(mainEl);
    this.elements['list'] = document.getElementById('countries-list');

    this.renderFilters();
    this.registerHandlers();
  }

  renderFilters() {
    const filterRegions = new RegionFilter;
    filterRegions.setRegions(this.countries);

    filterRegions.renderFilterElement(this.elements['filter'].id);
    this.elements['filter'].onchange = () => filterRegions.filterSelectRegion();
  }

  registerHandlers() {
    this.elements['input'].onkeyup = event => this.filterSearchCountries(event);
    document.getElementById('button-theme').onclick = () => document.body.classList.toggle('dark-theme');
  }

  filterSearchCountries(event) {
    event.preventDefault();

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
}

export default CountriesList;