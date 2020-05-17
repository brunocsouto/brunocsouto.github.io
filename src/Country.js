import api from './api';

class Country {
  constructor() {
    this.data = []

    this.registerHandlers();
  }

  registerHandlers() {
    document.getElementById('button-theme').onclick = () => document.body.classList.toggle('dark-theme');
  }

  async loadInformation(code) {
    try {
      const fields = 'name;nativeName;flag;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;';
      const response = await api.get(`/alpha/${code}?fields=${fields}`);
      this.data = response.data;      
    } catch (err) {
      alert("Country don't exist");
      console.warn(`Country don't exist. ${err}`);
    }
    this.render();
  }

  render() {
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', this.data.flag);
    document.getElementById('details-flag').appendChild(imgEl);
    document.getElementById('details-title').innerHTML = this.data.name;
    document.getElementById('p-name').innerHTML += this.data.nativeName;
    document.getElementById('p-population').innerHTML += this.data.population.toLocaleString();
    document.getElementById('p-region').innerHTML += this.data.region;
    document.getElementById('p-subregion').innerHTML += this.data.subregion;
    document.getElementById('p-capital').innerHTML += this.data.capital;

    this.data.topLevelDomain.forEach((value, index, array) => {
      document.getElementById('p-domain').innerHTML += value;
      if (index != array.length -1) { document.getElementById('p-domain').innerHTML += ', '; }
    })

    this.data.currencies.forEach((value, index, array) => {
      document.getElementById('p-currencies').innerHTML += value.name;
      if (index != array.length -1) { document.getElementById('p-currencies').innerHTML += ', '; }
    })

    this.data.languages.forEach((value, index, array) => {
      document.getElementById('p-languages').innerHTML += value.name;
      if (index != array.length -1) { document.getElementById('p-languages').innerHTML += ', '; }
    })
    
    this.data.borders.forEach(border => {      
      let boxBorder = document.createElement('div');
      boxBorder.setAttribute('id', `country-${border}`)
      boxBorder.classList = 'box-border';
      let pBorder = document.createElement('p')
      pBorder.innerHTML = border;
      boxBorder.appendChild(pBorder);
      document.getElementById('borders-icons').appendChild(boxBorder);
    })
  }
}

export default Country;