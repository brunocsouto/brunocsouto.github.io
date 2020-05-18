function renderCountryItem(country) {
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
    
    let linkEl = document.createElement('div');
    linkEl.classList = 'pointer';
    linkEl.appendChild(imgEl);
    listEl.appendChild(linkEl);
    listEl.appendChild(infoEl);
    
    return listEl;
}

export default renderCountryItem;