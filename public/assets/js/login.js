let url = "https://stuaas.herokuapp.com/api/v1/";

function loginAcc() {
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
        .then(function (data) {
            console.log(data); //


            let tkon = localStorage.setItem('access_token', data.token);


            // window.location = "/../../Dashboard/Student/index.html"

        })
        .catch(err => {
            console.log("The error is ==>> ", err);
        })
}




