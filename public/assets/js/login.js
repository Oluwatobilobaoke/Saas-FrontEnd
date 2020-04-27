let url = "https://stuaas.herokuapp.com/api/v1/";
let baseUrl = "http://127.0.0.1:5500/public/" || "https://stuass.works/"
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
<<<<<<< HEAD
        .then(response => response.json())
        .then(function (data) {
            console.log(data);


            if (data.success == true) {
                let user_type = data.payload.data.user_type;
                console.log(user_type);
                let token = data.payload.token;
                console.log(token);
                localStorage.setItem('token', JSON.stringify(token));

                if (user_type == "student") {
                    window.location.replace(`${baseUrl}Dashboard/Student/index.html`);
                } else if (user_type == "organization") {
                    window.location.replace(`${baseUrl}Dashboard/Company/index.html`);
                } else {
                    return false;
                }


            } else if (data.success == false) {
                alert(data.error.message);
            }

        })
        .catch(err => {
            console.log("The error is ==>> ", err);
        })
=======
    .then(response => response.json())
    .then(function(data) {
        console.log(data); //

        if(data.token){
        localStorage.setItem('access_token', data.token);
        window.location = "/../../Dashboard/Student/index.html"
        } else {
          alert('Error: Authorization token is needed')
          // Rather than alerting, you should displaye an error message saying "Email or Password is wrong"
        }
    })
    .catch(err => {
        console.log("The error is ==>> ", err);
    })
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
}




