function toggleDarkTheme() {
  document.body.classList.toggle("dark-theme");
}

import Country from './Country';
import CountriesList from './CountriesList';

class App {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);

    this.loadRouter();
  }

  loadRouter() {
    const countryCode = this.urlParams.get('country');
    if (countryCode) {
        const country = new Country;
        country.loadInformation(countryCode);
    } else {
      new CountriesList;
    }
  }
}

new App();
