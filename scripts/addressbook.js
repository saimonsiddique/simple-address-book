// https://www.w3schools.com/js/default.asp

// Get the UI elements
$(function () {
    let form = $('#address-form');
    let addressList = $('#address-list');
    let search = $('#searchInput');



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
    form.on("submit", newAddress);
    addressList.on('click', removeAddress);
    search.on('keyup', searchAddress);

    // UI Class
    class UI {

        static addAddressToList(address) {
            let list = $('#address-list');
            let row = document.createElement('tr');
            row.innerHTML = `
            <td>${address.personName}</td>
            <td>${address.surname}</td>
            <td>${address.personAddress}</td>
            <td>${address.phone}</td>
            <td><a href="#" class="delete">Delete</a></td>
        `;

            list.append(row);
        }

        static clearFields() {
            $('#person-name').val('');
            $('#surname').val('');
            $('#address').val('');
            $('#phone').val('');
        }

        /*
        https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
        */
        static searchAddress(target) {
            let filter = target.value.toUpperCase();
            let table = $('#address-list');
            let tr = table.children('tr');

            // console.log(tr);

            for (let i = 0; i < tr.length; i++) {
                let td = $(tr[i]).children('td')[0];
                if (td) {
                    let textValue = td.textContent || td.innerText;
                    if (textValue.toUpperCase().indexOf(filter) > -1) {
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
        let personName = $('#person-name').val();
        let surname = $('#surname').val();
        let personAddress = $('#address').val();
        let phone = $('#phone').val();

        if (personName === '' || surname === '' || personAddress === '' || phone === '') {
            alert('Please fill in all fields');
        } else {
            console.log(personName, surname, personAddress, phone);
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

    // Define searchAddress function
    function searchAddress(e) {
        UI.searchAddress(e.target);
        e.preventDefault();
    }
});