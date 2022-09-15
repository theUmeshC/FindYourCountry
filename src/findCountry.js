/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */

const searchByCountry = document.querySelector('#search-by-country');

const byRegion = document.querySelector('#select__region');

let resourses = 'https://restcountries.com/v3.1/all';

document.addEventListener('DOMContentLoaded', retrieveData(resourses));
document.addEventListener('DOMContentLoaded', regionPopulation('https://restcountries.com/v3.1/all'));

async function findcountry(resourses) {
  const result = await fetch(resourses);
  const data = await result.json();
  return data;
}

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

searchByCountry.addEventListener('input', debounce(searchFunction, 1500));

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

byRegion.addEventListener('change', regionSearch);

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

async function regionPopulation(resourses) {
  const data = await findcountry(resourses);
  const regions = [];
  data.map((items) => {
    regions.push(items.region);
  });
  const uniqueAndSortedRegions = [...new Set(regions)].sort();
  const selectRegion = document.querySelector('.select__region');
  uniqueAndSortedRegions.map((region) => {
    const option = document.createElement('option');
    option.value = region;

    option.innerHTML = `
          ${region}
          `;
    selectRegion.appendChild(option);
  });
}

async function retrieveData(resourses) {
  const data = await findcountry(resourses);

  const mainContainer = document.querySelector('.main__container');
  mainContainer.innerHTML = '';

  data.map((item) => {
    const country = document.createElement('div');
    country.classList = 'country';
    country.setAttribute('onclick', 'countryDetails(this)');

    country.innerHTML = `
        <div class="contry__flag">
          <img id="imgSrc"
            src="${item.flags.svg}"
            alt="${item.name.common}/image"
          />
        </div>
        
        <div class="contry__details">
          <h2>${item.name.common}</h2>
          <div class="population">
            <span class="title">Population :</span>
            <span>${item.population}</span>
          </div>
          <div class="region">
            <span class="title">Region :</span>
            <span>${item.region}</span>
          </div>
          <div class="capital">
            <span class="title">Capital : </span>
            <span>${item.capital}</span>
          </div>
        </div>            
            `;
    mainContainer.appendChild(country);
  });
}

function countryDetails(name) {
  const capital = name.children[1].children[3].children[1].innerHTML;
  resourses = `https://restcountries.com/v3.1/capital/${capital}`;
  retriveDataDetails(resourses);
}

async function retriveDataDetails(resourses) {
  const data = await findcountry(resourses);
  const mainContainer = document.querySelector('.main__container');
  mainContainer.style = 'display:none';
  const mainContainer2 = document.querySelector('.main__container2');

  const searchContainer = document.querySelector('.search__container');

  searchContainer.style = 'display:none';

  const backButton = document.createElement('button');
  backButton.classList = 'btn';
  backButton.innerText = 'Go back';
  document.body.prepend(backButton);
  backButton.setAttribute('onclick', 'goBack()');
  const countryDetails = document.createElement('div');
  countryDetails.classList = 'country__details';
  mainContainer2.innerHTML = '';

  countryDetails.innerHTML = `
        <div class="country__detailsImg">
        <img src="${data[0].flags.svg}" alt="">
        </div>
        <div class="country__detailsDetails">
         <div class="country__detailsLeftRight">
          <div class="country__detailsLeft">
            <h1>${data[0].name.common}</h1>
            <div class="nativeName">
              <span class="title">Native Name: </span>
              <span class="value">${
  Object.values(data[0].name.nativeName)[0].official
}</span>
            </div>
            <div class="population">
              <span class="title">Population: </span>
              <span class="value">${data[0].population}</span>
            </div>
            <div class="region">
              <span class="title">Region: </span>
              <span class="value">${data[0].region}</span>
            </div>
            <div class="subRegion">
              <span class="title">Sub Region: </span>
              <span class="value">${data[0].subregion}</span>
            </div>
            <div class="capital">
              <span class="title">Capital: </span>
              <span class="value">${data[0].capital[0]}</span> 
            </div>
          </div>
          <div class="country__detailsRight">
            <div class="topLevelDomain">
              <span class="title">Top Level Domain: </span>
              <span class="value">.${data[0].altSpellings[0]}</span> 
            </div>
            <div class="currencies">
              <span class="title">Curriencies: </span>
              <span class="value">${
  Object.values(data[0].currencies)[0].name
}{ ${Object.values(data[0].currencies)[0].symbol}}</span> 
            </div>
            <div class="languages">
              <span class="title">Languages: </span>
              <span class="value">${Object.values(data[0].languages)[0]}</span>
            </div>
          </div>
        </div>
        <div class="country__detailsBottom">
          <h2>Border Countries:</h2>
          <span class="border__country">
            ${data[0].borders[0]}
          </span>
          <span class="border__country">
            ${data[0].borders[1]} 
          </span>
          <span class="border__country">
            ${data[0].borders[2]} 
          </span>
        </div>
      </div>
          
          `;

  document.body.append(mainContainer2);
  mainContainer2.appendChild(countryDetails);
}
function goBack() {
  const backBtn = document.querySelector('.btn');
  const mainContainer2 = document.querySelector('.main__container2');

  mainContainer2.innerHTML = '';

  const searchContainer = document.querySelector('.search__container');
  searchContainer.style = 'display:flex';
  const mainContainer = document.querySelector('.main__container');
  mainContainer.style = 'display:flex';
  backBtn.style = 'display:none';
}
