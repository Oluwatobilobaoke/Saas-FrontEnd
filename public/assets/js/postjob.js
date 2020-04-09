let url = "https://stuaas.herokuapp.com/api/v1/";

// Fetch the category for organizations
fetch(`${url}organizations/categories`)
    .then(res => res.json())
    .then(res => {
        organizationAccountCreationSection.style.display = "block";
        if (res.success) {
            let datas = res.payload.data;
            datas.forEach(data => {
                let categories = document.querySelector('#inputOrgCategories');
                categories.innerHTML += `<option value="${data.name.toLocaleLowerCase()}" data-id="${data.id}">${data.name}</option>`
            })
        }
    })
    .catch(err => {
        console.log("The error is => ", err);
    })