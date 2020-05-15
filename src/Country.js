import api from './api';

class Country {
    constructor() {
        this.data = []
    }

    async loadInformation(code) {
        try {
            const response = await api.get(`/alpha/${code}`);

            this.data = response.data;
            console.log(this.data);

        } catch (err) {
            alert("Country don't exist");
            console.warn(`Country don't exist. ${err}`);
        }

        this.render();
    }
    
    render() {
        let listEl = document.createElement('article');
        listEl.setAttribute('id', `country-${this.data.alpha3Code}`);
        listEl.setAttribute('class', 'box');
        
        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', this.data.flag);
        listEl.appendChild(imgEl);
        
        let nameEl = document.createElement('h3');
        nameEl.appendChild(document.createTextNode(this.data.name));

        let populationEl = document.createElement('p');
        let populationLabel = document.createElement('label');
        populationLabel.appendChild(document.createTextNode('Population: '))
        populationEl.appendChild(populationLabel);
        populationEl.appendChild(document.createTextNode(this.data.population.toLocaleString()));

        let regionEl = document.createElement('p');
        let regionLabel = document.createElement('label');
        regionLabel.appendChild(document.createTextNode('Region: '))
        regionEl.appendChild(regionLabel);
        regionEl.appendChild(document.createTextNode(this.data.region));

        let capitalEl = document.createElement('p');
        let capitalLabel = document.createElement('label');
        capitalLabel.appendChild(document.createTextNode('Capital: '))
        capitalEl.appendChild(capitalLabel);
        capitalEl.appendChild(document.createTextNode(this.data.capital));


        let infoEl = document.createElement('div');
        infoEl.setAttribute('class', 'box-info');

        infoEl.appendChild(nameEl);
        infoEl.appendChild(populationEl);
        infoEl.appendChild(regionEl);
        infoEl.appendChild(capitalEl);
        listEl.appendChild(infoEl);

        document.getElementById('container-details').appendChild(listEl);
    }
}

export default Country;