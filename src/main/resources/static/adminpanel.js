let url = "/api/admin";
let urlUser = "api/user";

function showAllUsers() {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((allUsers) => {
            console.log(allUsers);
            let tbody = document.getElementById('userTable');
            let count = '';
            allUsers.forEach((user) => {
                let roles = "";
                user.roles.forEach((role) => {
                    roles = roles + role.name.replace("ROLE_", "") + ' '
                });
                count += `
                <tr>
                    <td> ${user.id} </td>
                    <td> ${user.firstName} </td>
                    <td> ${user.lastName} </td>
                    <td> ${user.age} </td>
                    <td> ${user.email} </td>
                    <td> ${roles} </td>
                    <td> <button class="btn btn-info" data-toggle="modal" data-target="#editModal" onclick="openModal(${user.id})">Edit</button> </td>
                    <td> <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="openModal(${user.id})">Delete</button> </td>
                </tr>
            `
            })
            tbody.innerHTML = count;
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
            document.getElementById("nav-user-table-tab").click();
            showAllUsers();
            newUserForm.reset();
        })
}

function editUser() {
    let editForm = document.getElementById("editId").value;
    fetch(url + "/" + editForm, {
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
            document.getElementById("nav-user-table-tab").click();
            $('#editModal').modal("hide")
            showAllUsers();
        })
}

function deleteUser() {
    let deleteUserForm = document.getElementById("deleteId").value;
    fetch(url + "/" + deleteUserForm, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then((r) => {
            document.getElementById("nav-user-table-tab").click();
            $('#deleteModal').modal("hide")
            showAllUsers();
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