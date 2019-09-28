const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

let states;

const getStates = async () => {
 const res = await fetch('/state_capitals.json');
 states = await res.json();
};


const searchStates = searchText => {
 let matches = states.filter(state => {
  const regex = new RegExp(`^${searchText}`, 'gi');
  return state.name.match(regex) || state.abbr.match(regex);
 });

 if (searchText.length === 0) {
  matches = [];
  matchList.innerHTML = '';
 }

 outputHtml(matches);
};

const outputHtml = matches => {
 if (matches.length > 0) {
  const html = matches
   .map(
    match => `<div class="card card-body mb-1">
    <h4>${match.name} (${match.abbr}) 
    <span class="text-primary">${match.capital}</span></h4>
    <small>Lat: ${match.lat} / Long: ${match.long}</small>
   </div>`
   )
   .join('');
  matchList.innerHTML = html;
 }
};

window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates(search.value));