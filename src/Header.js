class Header {
    constructor() {
        this.activeTheme = 'light-theme';

        this.render();
    }

    registerHandlers() {
        document.getElementById('button-theme').onclick = () => document.body.classList.toggle('dark-theme');
    }

    render() {
        // Create Header Element
        let headerEl = document.createElement('header');
        // Create Container block
        let containerEl = document.createElement('div');
        containerEl.classList = 'container';
        headerEl.appendChild(containerEl)

        // Insert the header title
        let titleEl = document.createElement('h2');
        titleEl.appendChild(document.createTextNode('Where in the World?'));
        containerEl.appendChild(titleEl);

        // Create button to change theme
        let btnEl = document.createElement('button');
        btnEl.setAttribute('id', 'button-theme');
        btnEl.classList = 'button-dark';
        let iconEl = document.createElement('i');
        iconEl.classList = 'fas fa-moon';
        btnEl.appendChild(iconEl);
        btnEl.innerHTML += ' Dark mode';
        containerEl.appendChild(btnEl);
        document.querySelector('.grid-page').appendChild(headerEl);

        this.registerHandlers();
    }
}

export default Header;