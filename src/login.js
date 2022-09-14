
      const userName = document.querySelector("#login__userName");
      const password = document.querySelector("#login__password");
      const form = document.querySelector("#formTag");
      form.addEventListener("submit", formSubmit);
      const locationw= window.location.href;
      

      function formSubmit(e) {
        e.preventDefault();
        let userNameValue = userName.value;
        let passwordValue = password.value;
        let regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (userNameValue === "" || passwordValue === "") {
          alert(
            "You have to fill all information to add a new item! Try again."
          );
          return;
        }
        if (!regularExpression.test(passwordValue)) {
          alert(
            "password should contain atleast one number and one special character"
          );
          return false;
        }
        else{
            window.location.href= `${locationw}page2`
        }
      }
  