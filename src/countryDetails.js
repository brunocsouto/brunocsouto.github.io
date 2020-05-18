import api from './api';

export default function renderCountryDetails(country) {

    let mainEl = document.createElement('main');
    mainEl.setAttribute('id', 'container-details');
    mainEl.classList = 'container grid-details';

    let flagEl = document.createElement('div');
    flagEl.setAttribute('id', 'details-flag');
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', country.flag);
    
    flagEl.appendChild(imgEl);
    mainEl.appendChild(flagEl);
    console.log(mainEl);


    let detailsEl = document.createElement('div');
    detailsEl.classList = 'details-content';
    mainEl.appendChild(detailsEl);
    

    let titleEl = document.createElement('h2');
    titleEl.setAttribute('id', 'details-title');
    titleEl.innerHTML = country.name;
    detailsEl.appendChild(titleEl);

    let primaryArticle = document.createElement('article');
    primaryArticle.setAttribute('id', 'primary-details');
    primaryArticle.appendChild(makeParagraph('name', 'Native Name', country.nativeName));
    primaryArticle.appendChild(makeParagraph('population', 'Population', country.population.toLocaleString()));
    primaryArticle.appendChild(makeParagraph('region', 'Region', country.region));
    primaryArticle.appendChild(makeParagraph('subregion', 'Sub Region', country.subregion));
    primaryArticle.appendChild(makeParagraph('capital', 'Capital', country.capital));
    detailsEl.appendChild(primaryArticle);

    let secondaryArticle = document.createElement('article');
    secondaryArticle.setAttribute('id', 'secondary-details');
    secondaryArticle.appendChild(makeParagraph('domain', 'Top Level Domain', country.topLevelDomain));
    secondaryArticle.appendChild(makeParagraph('currencies', 'Currencies', country.currencies));
    secondaryArticle.appendChild(makeParagraph('languages', 'Languages', country.languages));
    detailsEl.appendChild(secondaryArticle);
    
    
    let asideEl = document.createElement('aside');
    asideEl.setAttribute('id', 'country-borders');
    let borderStrongEl = document.createElement('strong');
    borderStrongEl.innerHTML = 'Border Countries:';
    asideEl.appendChild(borderStrongEl);
    let divBorderEl = document.createElement('div');
    divBorderEl.setAttribute('id', 'borders-icons');
    country.borders.forEach(async border => {
        let borderName = await getCountryName(border);
        let boxBorder = document.createElement('div');
        boxBorder.setAttribute('id', `country-${border}`)
        boxBorder.classList = 'box-border';
        let pBorder = document.createElement('p')
        pBorder.innerHTML = borderName;
        boxBorder.appendChild(pBorder);
        divBorderEl.appendChild(boxBorder);
    })
    asideEl.appendChild(divBorderEl);
    detailsEl.appendChild(asideEl);
    mainEl.appendChild(detailsEl);
    
    return mainEl;
}

export function renderNavBar() {
    let containerEl = document.createElement('div');
    containerEl.classList = 'container';
    let boxEl = document.createElement('div');
    boxEl.classList = 'box-button';
    containerEl.appendChild(boxEl);

    let linkEl = document.createElement('a');
    linkEl.setAttribute('id', 'back-button');
    boxEl.appendChild(linkEl);
    let iconEl = document.createElement('i');
    iconEl.classList = 'fa fa-arrow-left';
    linkEl.appendChild(iconEl);
    linkEl.innerHTML += 'Back';

    return containerEl;
}

function makeParagraph(id, label, data) {
    
    let pEl = document.createElement('p')
    let strongEl = document.createElement('strong');
    strongEl.innerHTML = `${label}: `;
    pEl.appendChild(strongEl);

    let spanEl = document.createElement('span');
    spanEl.setAttribute('id', `p-${id}`);
    if (typeof data == 'string') {
        spanEl.innerHTML = data;
    } else {
        data.forEach((value, index, array) => {
            if (typeof value == 'string') {
                spanEl.innerHTML += value;
            } else {
                spanEl.innerHTML += value.name;
            }
            if (index != array.length -1) { spanEl.innerHTML += ', '; }
        })
    };
    
    pEl.appendChild(spanEl);

    return pEl;
}

async function getCountryName(countryCode) {
    try {
        const response = await api.get(`/alpha/${countryCode}?fields=name;`)
        return response.data.name;
    } catch(err) {
        alert("Error searching for country.");
        console.warn(`Error searching for country. ${err}`);
    }
}