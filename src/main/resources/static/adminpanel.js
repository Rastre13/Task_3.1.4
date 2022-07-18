let url = "/api/admin";
let urlUser = "api/user";

function showAllUsers() {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((allUsers) => {
            let tbody = document.getElementById('userTable');
            let count = '';
            allUsers.forEach((user) => {
                let roles = "";
                user.roles.forEach((role) => {
                    roles = roles + role.name.replace("ROLE_", "") + ' '
                });
                count += `<tr id="user${user.id}">
                    <td> ${user.id} </td>
                    <td> ${user.firstName} </td>
                    <td> ${user.lastName} </td>
                    <td> ${user.age} </td>
                    <td> ${user.email} </td>
                    <td> ${roles} </td>
                    <td> <button class="btn btn-info" data-toggle="modal" data-target="#editModal" onclick="openModal(${user.id})">Edit</button> </td>
                    <td> <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="openModal(${user.id})">Delete</button> </td>
                </tr>`
            })
            tbody.innerHTML = count;
        })
}

function changeTable(id, operation) {
    fetch(url + "/" + id)
        .then((r) => {
            return r.json();
        })
        .then((changeRow) => {
            if (operation === "add") {
                let tbody = document.getElementById('userTable');
                let roles = "";
                changeRow.roles.forEach((role) => {
                    roles = roles + role.name.replace("ROLE_", "") + ' '
                });
                tbody.insertAdjacentHTML('beforeend', `
            <tr id="user${changeRow.id}">
                    <td> ${changeRow.id} </td>
                    <td> ${changeRow.firstName} </td>
                    <td> ${changeRow.lastName} </td>
                    <td> ${changeRow.age} </td>
                    <td> ${changeRow.email} </td>
                    <td> ${roles} </td>
                    <td> <button class="btn btn-info" data-toggle="modal" data-target="#editModal" onclick="openModal(${changeRow.id})">Edit</button> </td>
                    <td> <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="openModal(${changeRow.id})">Delete</button> </td>
                </tr>
            `);
            } else if (operation === "edit") {
                let element = document.getElementById('user' + changeRow.id);
                let roles = "";
                changeRow.roles.forEach((role) => {
                    roles = roles + role.name.replace("ROLE_", "") + ' '
                });
                let tr = `<tr id="user${changeRow.id}">
            <td> ${changeRow.id} </td>
                    <td> ${changeRow.firstName} </td>
                    <td> ${changeRow.lastName} </td>
                    <td> ${changeRow.age} </td>
                    <td> ${changeRow.email} </td>
                    <td> ${roles} </td>
                    <td> <button class="btn btn-info" data-toggle="modal" data-target="#editModal" onclick="openModal(${changeRow.id})">Edit</button> </td>
                    <td> <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="openModal(${changeRow.id})">Delete</button> </td>
            </tr>`
                element.insertAdjacentHTML('beforebegin', tr);
                element.remove();
            } else if (operation === "delete") {
                let element = document.getElementById('user' + changeRow.id);
                element.remove();
            }
        })
}

function showUser() {
    fetch(urlUser)
        .then((response) => {
            return response.json();
        })
        .then((userActive) => {
            let ta = document.getElementById('authority');
            let roles = "";
            userActive.roles.forEach((role) => {
                roles = roles + role.name.replace("ROLE_", "") + ' '
            });
            ta.innerHTML = `
                <a> <b> ${userActive.email} </b> </a>
                <a> with roles ${roles} </a> 
            `
        })
}


function createUser() {
    let newUserForm = document.getElementById("newUserForm");
        fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            roles: Array.from(document.getElementById("role")).filter(option => option.selected).map(option => option.value)
        })
    })
            .then((r) => {
            return r.json();
        })
            .then((addRow) => {
                document.getElementById("nav-user-table-tab").click();
                newUserForm.reset();
                changeTable(addRow.id, "add");
        })

}

function editUser() {
    let editId = document.getElementById("editId").value;
    fetch(url + "/" + editId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('editId').value,
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            age: document.getElementById('editAge').value,
            email: document.getElementById('editEmail').value,
            password: document.getElementById('editPassword').value,
            roles: Array.from(document.getElementById("editRole")).filter(option => option.selected).map(option => option.value)
        })
    })
        .then((r) => {
            console.log(Array.from(document.getElementById("editRole")).filter(option => option.selected).map(option => option.value))
            document.getElementById("nav-user-table-tab").click();
            $('#editModal').modal("hide")
            changeTable(editId, "edit");
        })
}

function deleteUser() {
    let deleteId = document.getElementById("deleteId").value;
    changeTable(deleteId, "delete");
    fetch(url + "/" + deleteId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then((r) => {
            document.getElementById("nav-user-table-tab").click();
            $('#deleteModal').modal("hide")
        })
}

function openModal(id) {
    fetch("/api/admin/" + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById('editId').value = u.id;
            document.getElementById('editFirstName').value = u.firstName;
            document.getElementById('editLastName').value = u.lastName;
            document.getElementById('editAge').value = u.age;
            document.getElementById('editEmail').value = u.email;

            document.getElementById('deleteId').value = u.id;
            document.getElementById('deleteFirstName').value = u.firstName;
            document.getElementById('deleteLastName').value = u.lastName;
            document.getElementById('deleteAge').value = u.age;
            document.getElementById('deleteEmail').value = u.email;
        })
    })
}

showUser();
showAllUsers();