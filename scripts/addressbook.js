// Get the UI elements
let form = document.querySelector('#address-form');
let addressList = document.querySelector('#address-list');
let search = document.querySelector('#search');



// Address Class
class Address {
    constructor(personName, surname, personAddress, phone) {
        this.personName = personName;
        this.surname = surname;
        this.personAddress = personAddress;
        this.phone = phone;
    }
}


// Add event listener to form
form.addEventListener('submit', newAddress);
addressList.addEventListener('click', removeAddress);
search.addEventListener('submit', searchAddress);

// UI Class
class UI {

    static addAddressToList(address) {
        let list = document.querySelector('#address-list');
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${address.personName}</td>
            <td>${address.surname}</td>
            <td>${address.personAddress}</td>
            <td>${address.phone}</td>
            <td><a href="#" class="delete">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#person-name').value = '';
        document.querySelector('#surname').value = '';
        document.querySelector('#address').value = '';
        document.querySelector('#phone').value = '';
    }

    static searchAddress(search) {
        let filter = search.value.toUpperCase();
        let table = document.querySelector('#address-list');
        let tr = table.getElementsByTagName('tr');

        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[0];
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    }

    static deleteAddress(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
        }
    }

}



// Define newAddress function

function newAddress(e) {
    let personName = document.querySelector('#person-name').value;
    let surname = document.querySelector('#surname').value;
    let personAddress = document.querySelector('#address').value;
    let phone = document.querySelector('#phone').value;

    if (personName === '' || surname === '' || personAddress === '' || phone === '') {
        alert('Please fill in all fields');
    } else {
        let address = new Address(personName, surname, personAddress, phone);
        UI.addAddressToList(address);
        UI.clearFields();
    }
    e.preventDefault();
}

// Define removeAddress function
function removeAddress(e) {
    UI.deleteAddress(e.target);
    e.preventDefault();
}

// Search Address
function searchAddress(e) {
    UI.searchAddress(search);
    e.preventDefault();
}