let url = "https://stuaas.herokuapp.com/api/v1/";
// Check if the user is currently logged in
let token = localStorage.getItem("access_token");
// if(token){
//     fetch(`${url}user`, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(res => res.json())
//     .then(data => {
//         if(data.success){
//             let userType = data.payload.data.user_type;
//             if(userType === "student"){
//                 localStorage.setItem("stuData", JSON.stringify(data.payload.data));
//                 window.location.href = "./dashboard/student/index.html";
//             }
//             else{
//                 localStorage.setItem("comData", JSON.stringify(data.payload.data));
//                 window.location.href = "./dashboard/company/index.html";
//             }
//         }
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }


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
        let loginError = document.querySelector('.loginError');
        if(data.success){
            let userType = data.payload.data.user_type;
            loginError.style.display = 'none';
            localStorage.setItem('access_token', data.payload.token);
            if(userType === "student"){
                localStorage.setItem("stuData", JSON.stringify(data.payload.data));
                window.location.href = "./dashboard/student/index.html";
            }
            else{
                localStorage.setItem("comData", JSON.stringify(data.payload.data));
                window.location.href = "./dashboard/company/index.html";
            }
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




