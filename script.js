const cities = []
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}

function displayMatches() {
    const matchesArray = findMatches(this.value, cities)
    const regex = new RegExp(this.value, 'gi')
    const html = matchesArray.map(place =>{
        const cityName = place.city.replace(regex, `<span class='highlighting'>$&</span>`)
        const stateName = place.state.replace(regex, `<span class='highlighting'>$&</span>`)
        return `
        <li class='city'>
        <span>${cityName}, ${stateName}</span>
        <span>${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('')
    
    suggestions.innerHTML = html
}
const input = document.querySelector('.input-for-city')
const suggestions = document.querySelector('.filtered-list-of-cities')
input.addEventListener('change', displayMatches)
input.addEventListener('keyup', displayMatches)