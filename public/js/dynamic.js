console.log('Client side javascript is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let location = search.value;
    location = encodeURIComponent(location);
    const address = 'http://localhost:3000/weather?address=' + location;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''

    fetch(address)
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            let err = data.error;
            messageOne.innerHTML = err;
        }else{
            messageOne.innerHTML = data.location;
            messageTwo.innerHTML = data.forecast;
        }
        // console.log(data.location);
        // console.log(data.forecast);
    });
});