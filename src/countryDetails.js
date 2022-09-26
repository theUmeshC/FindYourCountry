import { handleGoback } from './countryList.js';
import Login from './index.js';

/* handeling Logout button event */
function logOut() {
  const logoutbtn2 = document.querySelector('.details__logout2');
  const mainContainer2 = document.querySelector('.main__container2');
  mainContainer2.remove();
  const backBtn = document.querySelector('.btn__back');
  backBtn.remove();
  logoutbtn2.remove();
  sessionStorage.removeItem('capital');
  Login();
}
/* function to handel back button and calling function which retrives list */
function goBack() {
  const logoutbtn2 = document.querySelector('.details__logout2');
  sessionStorage.setItem('countryList', true);
  sessionStorage.removeItem('countryList');
  const backBtn = document.querySelector('.btn__back');
  backBtn.style = 'display:none';
  const mainContainer2 = document.querySelector('.main__container2');
  mainContainer2.innerHTML = '';
  logoutbtn2.remove();
  handleGoback();
}
/* map countrydetails, back button logout button and render */
function retriveDataDetails(data) {
  const mainContainer2 = document.createElement('div');
  mainContainer2.classList = 'main__container2';
  sessionStorage.removeItem('countryList');
  const backButton = document.createElement('button');
  backButton.classList = 'btn btn-secondary btn__back';
  backButton.innerText = 'Go back';
  document.body.prepend(backButton);
  backButton.addEventListener('click', () => {
    goBack();
  });
  const logoutbtn = document.createElement('button');
  logoutbtn.classList = 'btn btn-primary log__outBTN details__logout2';
  logoutbtn.innerHTML = 'Logout';
  document.body.prepend(logoutbtn);
  logoutbtn.addEventListener('click', () => { logOut(); });

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
          <span class='value'>${Object.values(data[0].name.nativeName)[0].official}
          </span>
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
          <span class='value'>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Symbol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">${Object.values(data[0].currencies)[0].name}</th>
                  <td>${Object.values(data[0].currencies)[0].symbol}</td>
                </tr>
              </tbody>
            </table>
          </span> 
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
        ${(data[0].borders) ? `${data[0].borders[0]}` : 'null'}
      </span>
      <span class='border__country'>
        ${(data[0].borders) ? `${data[0].borders[1]}` : 'null'}
      </span>
      <span class='border__country'>
        ${(data[0].borders) ? `${data[0].borders[2]}` : 'null'}
      </span>
    </div>
  </div>`;

  document.body.append(mainContainer2);
  mainContainer2.appendChild(countryDetail);
}

export default retriveDataDetails;
