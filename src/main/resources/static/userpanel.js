let urlUser = "api/user";

function showUser() {
    fetch(urlUser)
        .then((response) => {
            return response.json();
        })
        .then((userActive) => {
            let tbody = document.getElementById('table_user');
            let ta = document.getElementById('authority');
            let isUser = document.getElementById('is_user');
            let roles = "";
            userActive.roles.forEach((role) => {
                roles = roles + role.name.replace("ROLE_", "") + ' '
            });
            let str = "";
            if (roles[0] !== "A") {
                str = "btn-primary d-none";
            } else {
                str = "btn-link d-block text-decoration-none";
            }
            isUser.innerHTML = `<a class="btn btn-block ${str}" style="text-align: left" href="/admin" role="button">Admin</a>`
            tbody.innerHTML = `
                <tr>
                    <td> ${userActive.id} </td>
                    <td> ${userActive.firstName} </td>
                    <td> ${userActive.lastName} </td>
                    <td> ${userActive.age} </td>
                    <td> ${userActive.email} </td>
                    <td> ${roles} </td>
                </tr>
            `
            ta.innerHTML = `
                <a> <b> ${userActive.email} </b> </a>
                <a> with roles ${roles} </a>
            `
        })
}
showUser();