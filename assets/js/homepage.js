// ============================================================================================
// | All the code here has been moved to signup-validation.js with some few modifications made|
//  ===========================================================================================





// let url = "https://stuaas.herokuapp.com/api/v1/";

// document.addEventListener("DOMContentLoaded", () => {
// 	let selectUserCategory = document.querySelector('#selectUserCategory');
// 	selectUserCategory.addEventListener("change", () => {
// 		let studentAccountCreationSection = document.querySelector("#studentAccountCreationSection");
// 		let organizationAccountCreationSection = document.querySelector("#organizationAccountCreationSection");
// 		let userCategorySelected = selectUserCategory.value;
// 		console.log("The selected category is ====>> ", userCategorySelected)
// 		let createAccountBtn = document.querySelector('#createAccountBtn');
// 		if(userCategorySelected === 'organization'){
// 			createAccountBtn.removeAttribute("disabled");
// 			// Fetch the category for organizations 
// 			fetch(`${url}organizations/categories`)
// 			.then(res => res.json())
// 			.then(res => {
// 				studentAccountCreationSection.style.display = "none";
// 				organizationAccountCreationSection.style.display = "block";
// 				if(res.success){
// 					let datas = res.payload.data;
// 					datas.forEach(data => {
// 						let categories = document.querySelector('#companyCategories');
// 						categories.innerHTML += `<option value="${data.name}" data-id="${data.id}">${data.name}</option>`
// 					})
// 				}
// 			})
// 			.catch(err => {
// 				console.log("The error is => ", err);
// 			})
// 		}
// 		else if(userCategorySelected === "0"){
// 			createAccountBtn.setAttribute("disabled", '');
// 			organizationAccountCreationSection.style.display = "none";
// 			studentAccountCreationSection.style.display = "none";
// 		}
// 		else{
// 			createAccountBtn.removeAttribute("disabled");
// 			organizationAccountCreationSection.style.display = "none";
// 			studentAccountCreationSection.style.display = "block";
// 		}
// 		console.log(userCategorySelected);
// 	})
// })


