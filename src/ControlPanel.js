class ControlPanel {
    constructor() {
        this.elements = {};
        this.render();
    }

    getElements() {
        return this.elements;
    }

    render() {
        let containerEl = document.createElement('div');
        containerEl.classList = 'container search-bar';

        let formEl = document.createElement('div');
        formEl.setAttribute('id', 'country-search-form');

        let searchTextEl = document.createElement('input');
        searchTextEl.setAttribute('type', 'text');
        searchTextEl.setAttribute('name', 'country');
        searchTextEl.setAttribute('autocomplete', 'off');
        searchTextEl.setAttribute('placeholder', 'Search for a country...');
        formEl.appendChild(searchTextEl);

        let btnSearchEl = document.createElement('div');
        btnSearchEl.classList = 'btn-search';
        let searchIconEl = document.createElement('i');;
        searchIconEl.classList = ' fa fa-search';
        btnSearchEl.appendChild(searchIconEl);
        formEl.appendChild(btnSearchEl);
        
        let selectRegionEl = document.createElement('select');
        selectRegionEl.setAttribute('id', 'filter-region');
        let defaultOption = document.createElement('option');
        defaultOption.setAttribute('value', '');
        defaultOption.innerHTML = 'Filter By';
        selectRegionEl.appendChild(defaultOption);
        formEl.appendChild(selectRegionEl);

        containerEl.appendChild(formEl);

        document.body.appendChild(containerEl);

        this.registerElements();
    }

    registerElements() {
        this.elements['form'] = document.getElementById('country-search-form');
        this.elements['input'] = document.querySelector('input[name=country]');
        this.elements['filter'] = document.getElementById('filter-region');
        
    }
}

export default ControlPanel;