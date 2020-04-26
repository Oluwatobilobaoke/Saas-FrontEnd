let url = "https://stuaas.herokuapp.com/api/v1/";

function loginAcc() {
    // Display the loader immediately login is clicked
    let pagePreloader = document.querySelector('#pagePreloader');
    pagePreloader.style.display = 'block';
    let loginData = {
        email: document.querySelector('#inputEmail').value,
        password: document.querySelector('#inputPassword').value,
    }
    fetch(`${url}user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(function(data) {
        // Hide the loader
        pagePreloader.style.display = 'none';
        console.log("The data is ", data);
        let loginError = document.querySelector('.error');
        if(data.success){
            localStorage.setItem('access_token', data.payload.token);
            loginError.style.display = 'none';
            window.location.assign("./Dashboard/Student/index.html");
        }
        else{
            // Display the login error
            loginError.style.display = 'block';
        }
    })
    .catch(err => {
        console.log("The error is ==>> ", err);
    })
}




