const cupcakeList = $('ul');
const form = $('form')
const flavor = $('#flavor');
const size = $('#size');
const rating = $('#rating');
const image = $('#image');

loadCupcakes = async function() {
    const data = await axios.get('http://127.0.0.1:5000/api/cupcakes');
    let cupcakeData = data.data.cupcakes;
    cupcakeData.map(c => cupcakeList.append(`<li>${c.flavor}</li>`));
};

$(document).ready(loadCupcakes);

form.on('submit', async function(e) {
    e.preventDefault();
    const data = {
        flavor: flavor.val(),
        size: size.val(),
        rating: rating.val(),
        image: image.val(),
    };
    flavor.val('');
    size.val('')
    rating.val('');
    image.val('');
    await axios.post('http://127.0.0.1:5000/api/cupcakes', data);
    cupcakeList.append(`<li>${data.flavor}</li>`)
    return;
});