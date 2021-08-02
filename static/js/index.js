const cupcakeList = $('#cupcakes-list');
const form = $('#add');
const searchForm = $('#search-form');
const searchList = $('#cupcake-search');
const searchInput = $('#search');

class CupcakeManager {
    constructor() {
        this.flavor = document.querySelector('#flavor');
        this.size = document.querySelector('#size');
        this.rating = document.querySelector('#rating');
        this.image = document.querySelector('#image');
        this.queryType = document.querySelector('#query');
        this.search = document.querySelector('#search');
        this.formSubmit = this.formSubmit.bind(this);
        this.searchCupcakes = this.searchCupcakes.bind(this);
        this.searchCupcakesOnInput = this.searchCupcakesOnInput.bind(this);
        this.debounce = this.debounce.bind(this);
    }

    loadCupcakes = async function() {
        const data = await axios.get('http://127.0.0.1:5000/api/cupcakes');
        let cupcakeData = data.data.cupcakes;
        cupcakeData.map(c => cupcakeList.append(`<li>${c.flavor}</li>`));
    };

    async formSubmit(e) {
        e.preventDefault();
        const data = {
            flavor: this.flavor.value,
            size: this.size.value,
            rating: this.rating.value,
            image: this.image.value,
        };
        this.flavor.value = '';
        this.size.value = '';
        this.rating.value = '';
        this.image.value = '';
        await axios.post('http://127.0.0.1:5000/api/cupcakes', data);
        cupcakeList.append(`<li>${data.flavor}</li>`)
        return;
    }

    async searchCupcakes(e) {
        e.preventDefault();
        const data = {
            query: this.queryType.value,
            search: this.search.value
        }
        const res = await axios.post('http://127.0.0.1:5000/api/cupcakes/search', data);
        let searchResults = res.data.cupcakes;
        searchList.empty();
        searchResults.map(c => searchList.append(`<li>${c.flavor}</li>`));
        this.search.value = '';
        this.queryType.selectedIndex = 0;
    }

    debounce(func) {
        let timer;
        return () => {
            clearTimeout(timer),
            timer = setTimeout(() => {this.searchCupcakesOnInput()}, 500);
        }
    }

    async searchCupcakesOnInput(e) {
        const data = {
            query: this.queryType.value,
            search: this.search.value
        }
        searchList.empty();
        if (this.search.value !== '') {
            const res = await axios.post('http://127.0.0.1:5000/api/cupcakes/search', data);
            let searchResults = res.data.cupcakes;
            searchResults.map(c => searchList.append(`<li>${c.flavor}</li>`));
            }
        
        this.search.value = '';
        this.queryType.selectedIndex = 0;
    };
};

const manager = new CupcakeManager();
$(document).ready(manager.loadCupcakes);
form.on('submit', manager.formSubmit);
searchInput.on('input', manager.debounce(manager.searchCupcakesOnInput));
