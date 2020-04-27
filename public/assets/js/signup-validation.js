let url = "https://stuaas.herokuapp.com/api/v1/";
let baseUrl = "http://127.0.0.1:5500/public/" || "https://stuass.works/"

// =================================================
// | Let users select a category to register with  |
// =================================================
document.addEventListener("DOMContentLoaded", () => {
    // Wait till all the DOM element is rendered;
    let selectUserCategory = document.querySelector('#selectUserCategory');
    selectUserCategory.addEventListener("change", () => {
        // When the selected category is changed from what it was initially
        let studentAccountCreationSection = document.querySelector("#studentAccountCreationSection");
        let organizationAccountCreationSection = document.querySelector("#organizationAccountCreationSection");
        let userCategorySelected = selectUserCategory.value; // The selected user category
        console.log("The selected category is ====>> ", userCategorySelected)
        let createAccountBtn = document.querySelector('#createAccountBtn');
        if (userCategorySelected === 'organization') {
            // When organization is selected, some data is loaded from the database and it takes some 
            // time to load this data. All input fields wil be hidden till this is loaded and rendered.
            studentAccountCreationSection.style.display = 'none';
            organizationAccountCreationSection.style.display = 'none';
            createAccountBtn.removeAttribute("disabled");
            // Fetch the category for organizations
            fetch(`${url}organizations/categories`)
                .then(res => res.json())
                .then(res => {
                    studentAccountCreationSection.style.display = "none";
                    organizationAccountCreationSection.style.display = "block";
                    if (res.success) {
                        let datas = res.payload.data;
                        datas.forEach(data => {
                            let categories = document.querySelector('#inputOrgCategories');
                            // categories.innerHTML += `<option value="${data.name.toLocaleLowerCase()}" data-id="${data.id}">${data.name}</option>`
                            categories.innerHTML += `<option value="${data.id}" data-id="${data.id}">${data.name}</option>`
                        })
                    }
                })
                .catch(err => {
                    console.log("The error is => ", err);
                })
        }
        else if (userCategorySelected === "0") {
            createAccountBtn.setAttribute("disabled", '');
            organizationAccountCreationSection.style.display = "none";
            studentAccountCreationSection.style.display = "none";
        }
        else {
            createAccountBtn.removeAttribute("disabled");
            organizationAccountCreationSection.style.display = "none";
            studentAccountCreationSection.style.display = "block";
        }
        console.log(userCategorySelected);
    })
});

// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}


// This is a single validator Object used to valdate both the students and companies data
function SaasValidator() {
    this.checkEmpty = (arr) => {
        // This method takes in an array if values and makes checks if any of them is an empty string.
        arr.forEach(data => {
            if (data[0] === "") {
                document.getElementById(data[1]).textContent = `${data[2]} is required`;
            }
            else {
                document.getElementById(data[1]).textContent = "";
            }
        })
        // check if all the element has been filled
        let result = arr.every(val => val[0] !== "");
        return result;
    }

    this.validatePassword = (pass) => {
        // This function makes sure an inputted password is in it's right format
        console.log("Pass 2 is ", pass[2]);
        if (pass[0].length < 8) {
            document.getElementById(pass[1]).textContent = "Password must be at least 8 characters long";
            return false;
        }

        else if (pass[0].match(/[A-Z]/g) === null) {
            document.getElementById(pass[1]).textContent = "Password must contain at least an uppercase letter";
            return false;
        }

        else if (pass[0].match(/[0-9]/g) === null) {
            document.getElementById(pass[1]).textContent = "Password must contain at least a number";
            return false;
        }
        else if (pass[0] !== document.getElementById(pass[2]).value) {
            document.getElementById(pass[2] + 'Err').textContent = "Passwords must match";
            return false;
        }
        else {
            document.getElementById(pass[2] + 'Err').textContent = "";
            return true;
        }
    }

    this.validateAll = (arr) => {
        // Make sure all other validators here run accordingly
        if (this.checkEmpty(arr)) {
            // If no field is left empty, validate the password
            return this.validatePassword(arr[6])
        }
        else {
            return false;
        }
    }
}

// Validate the data of students registration
function validateStudents() {
    let inputAndErrorDetails = [['inputStudentName', 'inputStudentNameErr', 'Full name'],
    ['inputStudentEmail', 'inputStudentEmailErr', 'Email'], ['inputStudentPhone', 'inputStudentPhoneErr', 'Phone number'],
    ['inputStudentAddress', 'inputStudentAddressErr', 'Address'], ['inputStudentAvailability', 'availibilityStudentErr', 'Availability'],
    ['inputStudentRate', 'inputStudentRateErr', 'Hourly Rate'], ['inputStudentPassword', 'inputStudentPasswordErr', 'inputStudentConfirmPassword']];
    // The above array is an array of te ID's of the student data input field, it's corresponding error fields and field name
    inputAndErrorDetails = inputAndErrorDetails.map(data => {
        // I'm mapping through the array so I can get on the value in every Input field and the ID of it's
        // corresponding error and field name in a single Array
        return [document.getElementById(data[0]).value, data[1], data[2]];
    })
    // Check if all the fields have been filled out and display error messages fr the ones that aren't filled
    let Validator = new SaasValidator();
    let validateInputs = Validator.validateAll(inputAndErrorDetails);
    console.log(validateInputs);
    return validateInputs;
}

// Validate the data of Company registration
function validateCompanies() {
    let inputAndErrorDetails = [['inputOrgName', 'inputOrgNameErr', 'Company name'],
    ['inputOrgEmail', 'inputOrgEmailErr', 'Email'], ['inputOrgPhone', 'inputOrgPhoneErr', 'Phone number'],
    ['inputOrgAddress', 'inputOrgAddressErr', 'Address'], ['inputOrgDescription', 'inputOrgDescriptionErr', 'Description'],
    ['inputOrgCategories', 'inputOrgCategoriesErr', 'Category'], ['inputOrgPassword', 'inputOrgPasswordErr', 'inputOrgConfirmPassword']];
    // The above array is an array of te ID's of the student data input field, it's corresponding error fields and field name
    inputAndErrorDetails = inputAndErrorDetails.map(data => {
        // I'm mapping through the array so I can get on the value in every Input field and the ID of it's
        // corresponding error and field name in a single Array
        return [document.getElementById(data[0]).value, data[1], data[2]];
    })
    console.log(inputAndErrorDetails);
    // Check if all the fields have been filled out and display error messages fr the ones that aren't filled
    let Validator = new SaasValidator();
    let validateInputs = Validator.validateAll(inputAndErrorDetails);
    console.log(validateInputs);
    return validateInputs;
}


function createAccount() {
    let selectUserCategory = document.querySelector('#selectUserCategory');
    if (selectUserCategory.value === 'student') {
        // Validate students data first, then create account.
        console.log("Student Validation is ", validateStudents());
        validateStudents() ? createStudentAccount() : null;
    } else if (selectUserCategory.value === 'organization') {
        // Validate orgnizations data first, then create account.
        validateCompanies() ? createCompanyAccount() : null;
    }
}

// Handling Form Submission as JSON for student
function createStudentAccount() {
<<<<<<< HEAD
=======
function createStudentAccount(){
<<<<<<< HEAD
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
=======
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
=======
>>>>>>> parent of fdd6e58... reverting for now
    let studentData = {
        user_type: "student",
        email: document.querySelector('#inputStudentEmail').value,
        phone_number: document.querySelector('#inputStudentPhone').value,
        address: document.querySelector('#inputStudentAddress').value,
        password: document.querySelector('#inputStudentPassword').value,
        full_name: document.querySelector('#inputStudentName').value,
        availability: document.querySelector('#inputStudentAvailability').value,
        hourly_rate: document.querySelector('#inputStudentRate').value,
    }

    fetch(`${url}user/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
        .then(response => response.json())
        .then(function (data) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            console.log(data);  //q { "userId": 1, "id": 1, "title": "...", "body": "..." }
            if (data.success == true) {
                let user_type = data.payload.data.user_type;
                console.log(user_type);
                let token = data.payload.token;
                console.log(token);
                // Save token to local storage
                localStorage.setItem('token', JSON.stringify(token));

                //after this redirect to 
                window.location.replace(`${baseUrl}Dashboard/Student/index.html`);
            } else if (data.success == false) {
                alert(data.error.message);
            }

        })
        .catch(err => {
            console.log("The error is ==>> ", err);
        })
}


// Handling Form Submission as JSON for Organizations
function createCompanyAccount() {
<<<<<<< HEAD
=======
function createCompanyAccount(){
<<<<<<< HEAD
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
=======
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
=======
>>>>>>> parent of fdd6e58... reverting for now
    let companyData = {
        user_type: "organization",
        email: document.querySelector('#inputOrgEmail').value,
        phone_number: document.querySelector('#inputOrgPhone').value,
        address: document.querySelector('#inputOrgAddress').value,
        password: document.querySelector('#inputOrgPassword').value,
        name: document.querySelector('#inputOrgName').value,
        description: document.querySelector('#inputOrgDescription').value,
        category_id: document.querySelector('#inputOrgCategories').value,
    }

    fetch(`${url}user/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(companyData)
    })
        .then(response => response.json())
        .then(function (data) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            console.log(data);  //q { "userId": 1, "id": 1, "title": "...", "body": "..." }

            if (data.success == true) {
                let user_type = data.payload.data.user_type;
                console.log(user_type);
                let token = data.payload.token;
                console.log(token);
                // Save token to local storage
                localStorage.setItem('token', JSON.stringify(token));

                //after this redirect to 
                window.location.replace(`${baseUrl}Dashboard/Company/index.html`);
            } else if (data.success == false) {
                alert(data.error.message);
            }

        })
        .catch(err => {
            console.log("The error is ==>> ", err);
        })
}
<<<<<<< HEAD
=======
    .then(response => response.json())
    .then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data);  //q { "userId": 1, "id": 1, "title": "...", "body": "..." }
      
      
        if(data.token){
        localStorage.setItem('access_token', data.token);
        window.location = "/../Dashboard/Company/index.html"
        } else {
          alert("Error: Authorization token is needed")
        }
    })
    .catch(err => {
        console.log("The error is ==>> ", err);
    })
<<<<<<< HEAD
}
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
=======
}
>>>>>>> parent of 104127e... Completed Account Creation and Login Authentication
=======
>>>>>>> parent of fdd6e58... reverting for now
