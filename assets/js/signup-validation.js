let url = "https://stuaas.herokuapp.com/api/v1/";

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
        if(userCategorySelected === 'organization'){
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
                if(res.success){
                    let datas = res.payload.data;
                    datas.forEach(data => {
                        let categories = document.querySelector('#inputOrgCategories');
                        categories.innerHTML += `<option value="${data.name}" data-id="${data.id}">${data.name}</option>`
                    })
                }
            })
            .catch(err => {
                console.log("The error is => ", err);
            })
        }
        else if(userCategorySelected === "0"){
            createAccountBtn.setAttribute("disabled", '');
            organizationAccountCreationSection.style.display = "none";
            studentAccountCreationSection.style.display = "none";
        }
        else{
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
function SaasValidator(){
    this.checkEmpty = (arr) => {
        // This method takes in an array if values and makes checks if any of them is an empty string.
        arr.forEach(data => {
            if (data[0] === "") {
                document.getElementById(data[1]).textContent = `${data[2]} is required`;
            }
            else{
                document.getElementById(data[1]).textContent = "";   
            }
        })
        // check if all the element has been filled
        let result = arr.every(val => val[0] !== "");
        return result;
    }

    this.validatePassword = (pass) => {
        // This function makes sure an inputted password is in it's right format
        if(pass[0].length < 8){
            document.getElementById(pass[1]).textContent = "Password must be at least 8 characters long";
            return false;
        }

        else if(pass[0].match(/[A-Z]/g) === null){
            document.getElementById(pass[1]).textContent = "Password must contain at least an uppercase letter";
            return false;
        }

        else if(pass[0].match(/[0-9]/g) === null){
            document.getElementById(pass[1]).textContent = "Password must contain at least a number";
            return false;
        }

        else if(pass[0] !== document.getElementById(pass[2]).value){
            document.getElementById(pass[2]+'Err').textContent = "Passwords must match";
            return false;
        }
        else{
            document.getElementById(pass[2]+'Err').textContent = "";
            return true;
        }
    }

    this.validateAll = (arr) => {
        // Make sure all other validators here run accordingly
        if(this.checkEmpty(arr)){
            // If no field is left empty, validate the password
            return this.validatePassword(arr[6])
        }
        else{
            return false;
        }
    }
}

// Validate the data of students registration
function validateStudents(){
    let inputAndErrorDetails = [['inputStudentName', 'inputStudentNameErr', 'Full name'], 
    ['inputStudentEmail', 'inputStudentEmailErr', 'Email'], ['inputStudentPhone', 'inputStudentPhoneErr', 'Phone number'], 
    ['inputStudentAddress', 'inputStudentAddressErr', 'Address'], ['inputStudentAvailability', 'availibilityStudentErr', 'Availability'], 
    ['inputStudentRate', 'inputStudentRateErr', 'Hourly Rate'], ['inputStudentPassword', 'inputStudentPasswordErr', 'Password'], ['inputStudentConfirmPassword', 'inputStudentConfirmPasswordErr', 'Confirm Password']];
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
}

// Validate the data of Company registration
function validateCompanies(){
    let inputAndErrorDetails = [['inputOrgName', 'inputOrgNameErr', 'Company name'], 
    ['inputOrgEmail', 'inputOrgEmailErr', 'Email'], ['inputOrgPhone', 'inputOrgPhoneErr', 'Phone number'], 
    ['inputOrgAddress', 'inputOrgAddressErr', 'Address'], ['inputOrgDescription', 'inputOrgDescriptionErr', 'Description'], 
    ['inputOrgCategories', 'inputOrgCategoriesErr', 'Category'], ['inputOrgPassword', 'inputOrgPasswordErr', 'Password'], ['inputOrgConfirmPassword', 'inputOrgConfirmPasswordErr', 'Confirm Password']];
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
}


function createAccount(){
    let selectUserCategory = document.querySelector('#selectUserCategory');
    if(selectUserCategory.value === 'student'){
        // Validate students data first, then create account.
        validateStudents();
    }
    else if(selectUserCategory.value === 'organization'){
        // Validate orgnizations data first, then create account.
        validateCompanies();
    }
}

   if (!validateStudents()) {
      console.error();
   } else {
       createAccount();
   }

   if (!validateCompanies()) {
       console.error();
   } else {
       createAccount();
       
   }


// Form submission via FETCH

document.addEventListener("DOMContentLoaded", () => {

    const signUpForm = document.getElementById("signUpForm");
    
    signUpForm.addEventListener('click', function(e) {
        e.preventDefault();

        let studentName = document.getElementById('inputStudentName').value;
        let studentEmail = document.getElementById('inputStudentEmail').value;
        

        fetch(`${url}user/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({studentName:inputStudentName, studentEmail:inputStudentEmail})        
        }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    })

   });




