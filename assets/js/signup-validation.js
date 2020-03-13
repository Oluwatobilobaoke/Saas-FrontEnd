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
                        let categories = document.querySelector('#companyCategories');
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

function validateForm() {
    let inputName = document.getElementById("inputName");
    let inputEmail = document.getElementById("inputEmail");
    let inputPhone = document.getElementById("inputPhone");
    let inputAddress = document.getElementById("inputAddress");
    let availability = document.signUpForm.availability.value;
    let inputRate = document.getElementById("inputRate");
    let inputPassword = document.getElementById("inputPassword");
    let inputConfirmPassword = document.getElementById("inputConfirmPassword");
    let inputDescription = document.getElementById("inputDescription");
    let inputCompanyCategories = document.getElementById("companyCategories");


    // Defining error variables with a default value
    let inputNameErr = inputEmailErr = inputPhoneErr = inputAddressErr = availabilityErr = inputRateErr = inputDescriptionErr = inputCompanyCategoriesErr = inputPasswordErr = inputConfirmPasswordErr = true;

    // Validate Name
    if(inputName == "") {
        printError("inputNameErr", "Please Enter your name");
    } else {
        let regex = /^[a-zA-Z\s]+$/;
        if(regex.text(inputName) == false) {
            printError("inputNameErr", "Please enter a valid name: must have alphabet characters only");
        } else {
            printError("inputNameErr", "");
            inputNameErr = false;
        }
    }

    // Validate Email Address
    if(inputEmail == "") {
        printError("inputEmailErr", "Please enter your Email Address");
    } else {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(regex.test(inputEmail) === false) {
            printError("inputEmailErr", "Please enter a valid Email Address");
        } else {
            printError("inputEmailErr", "");
            inputEmailErr = false;
        }
    }

    // Validate Phone Number
    if(inputPhone == "") {
        printError("inputPhoneErr", "Please enter your Phone Number");
    } else {
        let regex = /^[1-9]\d{9}$/;
        if(regex.test(inputPhone) === false) {
            printError("inputPhoneErr", "Please enter a valid 10 digit mobile number");
        } else {
            printError("inputPhoneErr", "");
            inputPhoneErr = false;
        }
    }

    // Validate Address
    if (inputAddress == "") {
        printError("inputAddressErr", "Please enter your Address");
    } else {
        printError("inputAddressErr", "");
        inputAddressErr = false;
    }

    // Validate Availbility
    if(availability == "Availability") {
        printError("availibilityErr", "Please select your availability");
    } else {
        printError("availibilityErr", "");
        availibilityErr = false;
    }

    // Validate InputRate
    if (inputRate == "") {
        printError("inputRateErr", "Please enter your rate");
    } else {
        printError("inputRateErr", "");
        inputRateErr = false;
    }

    // Validate Password
    if (inputPassword == "") {
        printError("inputPasswordErr", "please enter your password");
    } else {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;
        if (regex.text(inputPassword) === false) {
            printError("inputPasswordErr", "Pasword must contain: at least 1 lowercase letter, at least 1 uppercase letter, at least a number,  at least one special character, eight characters or longer");
        } else {
            printError("inputPasswordErr", "");
            inputPasswordErr = false;
        }
    }

    // Validate Confirm Password
    if (inputConfirmPassword !== inputPassword) {
        printError("inputConfirmPasswordErr", "Password does not Match");
    } else {
        printError("inputConfirmPasswordErr", "");
        inputConfirmPasswordErr = false;
    }

    // Validate Company Description
    if (inputDescription == "") {
        printError("inputDescriptionErr", "Please enter your Company Description");
    } else {
        printError("inputDescriptionErr", "");
        inputDescriptionErr = false;
    }

    // Validate Company Categories
    if(inputCompanyCategories == "Categories") {
        printError("inputCompanyCategoriesErr", "Please select your Company Category");
    } else {
        printError("inputCompanyCategoriesErr", "");
        inputCompanyCategoriesErr = false;
    }

    // Form Won't Submit if there is any Errors
    if ((inputNameErr || inputEmailErr || inputPhoneErr || inputAddressErr || availibilityErr || inputRateErr || inputPasswordErr || inputConfirmPasswordErr || inputConfirmPasswordErr || inputDescriptionErr || inputCompanyCategoriesErr ) == true) {
        return false;
    } else {
        // Creating a string from input data for preview
        var dataPreview = "You've entered the following details: \n" +
                          "Name: " + inputName + "\n" +
                          "Email Address: " + inputEmail + "\n" +
                          "Address: " + inputAddress + "\n" +
                          "Phone Number: " + inputPhone + "\n" +
                          "Availability: " + availability + "\n" +
                          "Rate/Hr: " + inputRate + "\n" +
                          "Description: " + inputDescription + "\n" +
                          "Categories: " + inputCompanyCategories + "\n";
                          "Password: " + inputPassword + "\n" +
                          "Confirm Password: " + inputConfirmPassword + "\n" +
        // Display input data in a dialog box before submitting the form
        alert(dataPreview);
    }

};