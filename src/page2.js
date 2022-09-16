/* eslint-disable import/no-cycle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
// import countryDetails from './countryDetails.js';

export async function findcountry(resourses) {
  const result = await fetch(resourses);
  const data = await result.json();
  return data;
}

function page2() {
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
          <div class='search__country'>
            <select name='' class='select__region' id='select__region'>
              <option value='Filter By Region'>Filter By Region</option>
            </select>
          </div>
        </div>
    
        <div class='main__container'></div>
        <div class='main__container2'></div>
      </div>
  
   `;
  const searchByCountry = document.querySelector('#search-by-country');
  const byRegion = document.querySelector('#select__region');
  let resourses = 'https://restcountries.com/v3.1/all';

  const debounce = (fn, delay) => {
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

  async function regionPopulation(resourses) {
    const data = await findcountry(resourses);
    const regions = [];
    data.map((items) => regions.push(items.region));
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

  async function regionSearch(e) {
    e.preventDefault();
    if (e.target.value !== 'Filter By Region') {
      resourses = `https://restcountries.com/v3.1/region/${e.target.value}`;
      retrieveData(resourses);
    } else {
      resourses = 'https://restcountries.com/v3.1/all';
      retrieveData(resourses);
    }
  }
  byRegion.addEventListener('change', regionSearch);

  async function searchFunction(e) {
    e.preventDefault();
    if (e.target.value !== '') {
      resourses = `https://restcountries.com/v3.1/name/${e.target.value}`;
      retrieveData(resourses);
    } else {
      resourses = 'https://restcountries.com/v3.1/all';
      retrieveData(resourses);
    }
  }

  searchByCountry.addEventListener('input', debounce(searchFunction, 1500));

  document.addEventListener('DOMContentLoaded', retrieveData(resourses));
  document.addEventListener('DOMContentLoaded', regionPopulation('https://restcountries.com/v3.1/all'));
}

async function retrieveData(resourses) {
  const data = await findcountry(resourses);

  const mainContainer = document.querySelector('.main__container');
  mainContainer.innerHTML = '';

  data.map((item) => {
    const country = document.createElement('div');
    country.classList = 'country';
    country.addEventListener('click', (e) => {
      countryDetails(e);
    });
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
}

export default page2;
