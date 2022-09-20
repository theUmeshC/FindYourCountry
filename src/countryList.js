/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import retriveDataDetails from './countryDetails.js';

let i = 0;
const regions = [];

async function findcountry(resourses) {
  const result = await fetch(resourses);
  const data = await result.json();
  return data;
}
export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function countryList() {
  sessionStorage.setItem('countryList', true);
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.innerHTML = `
    <div class='page2'>
      <div class='search__container'>
        <div class='search__country'>
          <i class='fa fa-search' aria-hidden='true'></i>
          <input
            type='text'
            id='search-by-country'
            placeholder='Search for a country'
          />
        </div>
        <div class='search__country '>
          <select name='' class='select__region form-select' id='select__region'>
            <option selected>Filter By Region</option>
          </select>
        </div>
      </div>
      <div class='main__container'></div>
  </div>
  `;
  const searchByCountry = document.querySelector('#search-by-country');
  const byRegion = document.querySelector('#select__region');
  let resourses = 'https://restcountries.com/v3.1/all';


  async function regionSearch(e) {
    e.preventDefault();
    if (e.target.value !== 'Filter By Region') {
      resourses = `https://restcountries.com/v3.1/region/${e.target.value}`;
      retrieveData(resourses, false);
    } else {
      resourses = 'https://restcountries.com/v3.1/all';
      retrieveData(resourses, true);
    }
  }
  byRegion.addEventListener('change', regionSearch);

  async function searchFunction(e) {
    e.preventDefault();
    if (e.target.value !== '') {
      resourses = `https://restcountries.com/v3.1/name/${e.target.value}`;
      retrieveData(resourses, false);
    } else {
      resourses = 'https://restcountries.com/v3.1/all';
      retrieveData(resourses, true);
    }
  }
  searchByCountry.addEventListener('input', debounce(searchFunction, 500));

  document.addEventListener('DOMContentLoaded', retrieveData(resourses, true));

}

async function retrieveData(resourses, state) {
  const mainContainer = document.querySelector('.main__container');
  mainContainer.innerHTML = '';
  await dataMap(resourses, state);
  function regionPopulation() {
    const uniqueAndSortedRegions = [...new Set(regions)].sort();   
    const selectRegion = document.querySelector('.select__region');
    uniqueAndSortedRegions.map((region) => {
      const option = document.createElement('option');
      option.value = region;
      option.innerHTML = `
            ${region}
            `;
      selectRegion.appendChild(option);
      return undefined;
    });
  
}
  regionPopulation();
}
async function dataMap(resourses, state) {
  const data = await findcountry(resourses);
  data.map((items) => regions.push(items.region));
  const mainContainer = document.querySelector('.main__container');
  if (i < data.length) {
    data.slice(i, i + 18).map((item) => {
      const country = document.createElement('div');
      country.classList = 'country';
      country.addEventListener('click', (e) => { countryDetails(e, item.capital); });
      country.innerHTML = `
      <div class='contry__flag'>
        <img id='imgSrc'
          src='${item.flags.svg}'
          alt='${item.name.common}/image'
        />
      </div>
      <div class='contry__details'>
        <h2>${item.name.common}</h2>
        <div class='population'>
          <span class='title'>Population :</span>
          <span>${item.population}</span>
        </div>
        <div class='region'>
          <span class='title'>Region :</span>
          <span>${item.region}</span>
        </div>
        <div class='capital'>
          <span class='title'>Capital : </span>
          <span>${item.capital}</span>
        </div>
      </div>          
    `;
      mainContainer.appendChild(country);
      return undefined;
    });
    if (state) {
      const btn = document.createElement('button');
      btn.classList = 'btn btn-info show__more';
      btn.innerHTML = 'show more';
      mainContainer.append(btn);
      btn.addEventListener('click', () => { reDataMap(); });
    }
  }
}
async function reDataMap() {
  i += 18;
  const btn = document.querySelector('.show__more');
  btn.remove();
  dataMap('https://restcountries.com/v3.1/all', true);
}

function countryDetails(e, capital) {
  e.preventDefault();
  const mainContainer = document.querySelector('.main__container');
  mainContainer.remove();
  const searchContainer = document.querySelector('.search__container');
  searchContainer.remove();
  countryDetailsLoad(capital);
  sessionStorage.setItem('capital', `${capital}`);
}
export async function countryDetailsLoad(capital) {
  const resourses = `https://restcountries.com/v3.1/capital/${capital}`;
  const data = await findcountry(resourses);
  retriveDataDetails(data);
}
export function handleGoback() {
  // const mainContainer = document.querySelector('.main__container');
  // mainContainer.style = 'display:flex';
  // const searchContainer = document.querySelector('.search__container');
  // searchContainer.style = 'display:flex';
  countryList();
}

export default countryList;
