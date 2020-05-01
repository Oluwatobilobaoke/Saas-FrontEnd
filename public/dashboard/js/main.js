let token = localStorage.getItem("access_token");
// Check if the user is no longer logged in
fetch(`https://stuaas.herokuapp.com/api/v1/user`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => {
    if(!data.success){
        window.location.href = "../../login.html";
    }
    else{
    	console.log("the student data is ", data.payload.data);
    	localStorage.setItem("stuData", JSON.stringify(data.payload.data));
    }
})
.catch(err => {
    console.log(err)
})