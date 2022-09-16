/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */

const root = document.getElementById('root');
root.innerHTML = `
<div class='login__container'>
      <form class='login__form' id='formTag'>
        <h2 id='login__title'>LOGIN</h2>
        <input
          type='email'
          class='login__input form-control'
          placeholder='Username'
          id='login__userName'
        />
        
        <input
          type='password'
          class='login__input form-control'
          placeholder='password'
          id='login__password'
        />
        <small id='emailHelp' class='form-text'></small>
        <div class='checkbox-forgot'>
          <div class='checkbox-container'>
            <input type='checkbox' name='' id='login__checkbox' /><label
              id='checkbox__label'
              for='login__checkbox'
              >Remember me</label
            >
          </div>
          <a href='' id='forgot'>Forgot?</a>
        </div>
        <input
          type='submit'
          class='login__input'
          id='login__submitBtn'
          value='Login'
        />
      </form>
    </div>
`;
const userName = document.querySelector('#login__userName');
const password = document.querySelector('#login__password');
const form = document.querySelector('#formTag');

function formSubmit(e) {
  e.preventDefault();
  const userNameValue = userName.value;
  const passwordValue = password.value;
  const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const errorMessage = document.querySelector('#emailHelp');

  if (userNameValue === '' || passwordValue === '') {
    errorMessage.style = 'visibility:visible;color:red';
    errorMessage.innerHTML = ' Enter Email and password';
    return;
  }

  if (!regularExpression.test(passwordValue)) {
    errorMessage.style = 'visibility:visible;color:red';
    errorMessage.innerHTML = ' password is incorrect should contain one Capital one symbol one number and contain characters in the range of 6-16 ';
    return;
  }

  page2();
}
form.addEventListener('submit', formSubmit);

function page2() {
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

  function countryDetails(e) {
    e.preventDefault();
    const capital = e.target.parentElement.parentElement.children[1].children[3].children[1].innerHTML;
    resourses = `https://restcountries.com/v3.1/capital/${capital}`;
    retriveDataDetails(resourses);
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

  async function retriveDataDetails(resourses) {
    const data = await findcountry(resourses);
    const mainContainer = document.querySelector('.main__container');
    mainContainer.style = 'display:none';
    const mainContainer2 = document.querySelector('.main__container2');

    const searchContainer = document.querySelector('.search__container');

    searchContainer.style = 'display:none';

    const backButton = document.createElement('button');
    backButton.classList = 'btn btn-secondary';
    backButton.innerText = 'Go back';
    document.body.prepend(backButton);
    backButton.addEventListener('click', () => {
      goBack();
    });
    const countryDetail = document.createElement('div');
    countryDetail.classList = 'country__details';
    mainContainer2.innerHTML = '';

    countryDetail.innerHTML = `
        <div class='country__detailsImg'>
        <img src='${data[0].flags.svg}' alt=''>
        </div>
        <div class='country__detailsDetails'>
         <div class='country__detailsLeftRight'>
          <div class='country__detailsLeft'>
            <h1>${data[0].name.common}</h1>
            <div class='nativeName'>
              <span class='title'>Native Name: </span>
              <span class='value'>${Object.values(data[0].name.nativeName)[0].official}</span>
            </div>
            <div class='population'>
              <span class='title'>Population: </span>
              <span class='value'>${data[0].population}</span>
            </div>
            <div class='region'>
              <span class='title'>Region: </span>
              <span class='value'>${data[0].region}</span>
            </div>
            <div class='subRegion'>
              <span class='title'>Sub Region: </span>
              <span class='value'>${data[0].subregion}</span>
            </div>
            <div class='capital'>
              <span class='title'>Capital: </span>
              <span class='value'>${data[0].capital[0]}</span> 
            </div>
          </div>
          <div class='country__detailsRight'>
            <div class='topLevelDomain'>
              <span class='title'>Top Level Domain: </span>
              <span class='value'>.${data[0].altSpellings[0]}</span> 
            </div>
            <div class='currencies'>
              <span class='title'>Curriencies: </span>
              <span class='value'>${Object.values(data[0].currencies)[0].name}{${Object.values(data[0].currencies)[0].symbol}}</span> 
            </div>
            <div class='languages'>
              <span class='title'>Languages: </span>
              <span class='value'>${Object.values(data[0].languages)[0]}</span>
            </div>
          </div>
        </div>
        <div class='country__detailsBottom'>
          <h2>Border Countries:</h2>
          <span class='border__country'>
            ${data[0].borders[0]}
          </span>
          <span class='border__country'>
            ${data[0].borders[1]} 
          </span>
          <span class='border__country'>
            ${data[0].borders[2]} 
          </span>
        </div>
      </div>
          
          `;

    document.body.append(mainContainer2);
    mainContainer2.appendChild(countryDetail);
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
  document.addEventListener('DOMContentLoaded', retrieveData(resourses));
  document.addEventListener('DOMContentLoaded', regionPopulation('https://restcountries.com/v3.1/all'));
}
