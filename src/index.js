import countryList, { countryDetailsLoad } from './countryList.js';
/* On refresh which data to be rendered */
export default function Login() {
  function loadHandling() {
    if (sessionStorage.getItem('countryList')) {
      countryList();
    } else if ((sessionStorage.getItem('capital'))) {
      countryDetailsLoad(sessionStorage.getItem('capital'));
    } else {
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
              <small id='emailHelp' class='form-text'></small>
              <input
                type='password'
                class='login__input form-control'
                placeholder='password'
                id='login__password'
              />
              <small id='passwordHelp' class='form-text'></small>
              <small id='emailpasswordHelp' class='form-text'></small>
              <input
                type='submit'
                class='login__input'
                id='login__submitBtn'
                value='Login'
              />
          </form>
        </div>
      `;
    }
  }
  loadHandling();
  const userName = document.querySelector('#login__userName');
  const password = document.querySelector('#login__password');
  const form = document.querySelector('#formTag');
  /* On submission of the login page validation and directing to next page */
  function formSubmit(e) {
    e.preventDefault();
    const userNameValue = userName.value;
    const passwordValue = password.value;
    const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const errorMessage = document.querySelector('#emailpasswordHelp');
    const errorMailMessage = document.querySelector('#emailHelp');
    const errorPassMessage = document.querySelector('#passwordHelp');
    if (userNameValue === '' && passwordValue === '') {
      errorMailMessage.innerHTML='';
      errorPassMessage.innerHTML='';
      errorMessage.style = 'visibility:visible; color:red';
      errorMessage.innerHTML = 'Enter Email and password !!';
      return;
    }
    if(userNameValue === '' && passwordValue !== '') {
      errorPassMessage.innerHTML='';
      errorMessage.innerHTML='';
      errorMailMessage.style = 'visibility:visible; color:red';
      errorMailMessage.innerHTML = 'Enter Email !!';
      return;
    }
    if(userNameValue !== '' && passwordValue === '') {
      errorMessage.innerHTML='';
      errorMailMessage.innerHTML='';
      errorPassMessage.style = 'visibility:visible; color:red';
      errorPassMessage.innerHTML = 'Enter password !!'
      return;
    }

    if (!regularExpression.test(passwordValue)) {
      errorMailMessage.innerHTML='';
      errorMailMessage.innerHTML='';
      errorMessage.style = 'visibility:visible;color:red';
      errorMessage.innerHTML = 'password is incorrect should contain one Capital one symbol one number and contain characters in the range of 6-16';
    } else {
      countryList();
    }
  }
  form.addEventListener('submit', formSubmit);
}
Login();
