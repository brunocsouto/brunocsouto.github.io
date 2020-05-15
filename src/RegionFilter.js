class RegionFilter {
  constructor() {
    this.countries = [];
    this.regions = [];
    this.element;
  }

  setRegions(countries) {
    countries.forEach(country => {
      this.regions.push(country.region);
      this.countries.push({ region: country.region, alpha3Code: country.alpha3Code });  
    });
    this.regions = this.regions.filter((value, index, self) => self.indexOf(value) === index);
  }

  renderFilterElement(selectId) {
    this.element = document.getElementById(selectId);
    this.regions.forEach(country => {
      let optionElement = document.createElement('option');
      optionElement.setAttribute('value', country);;
      optionElement.appendChild(document.createTextNode(country))

      this.element.appendChild(optionElement);
    })
  }

  filterSelectRegion() {
    let selectedRegion = this.element.value;
    this.countries.forEach(country => {
      if (selectedRegion == country.region) {
        document.getElementById(`country-${country.alpha3Code}`).classList.remove('invisible');
      } else {
        document.getElementById(`country-${country.alpha3Code}`).classList.add('invisible');
      }
    })
  }
}

export default RegionFilter;