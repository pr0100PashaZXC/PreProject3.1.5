let isUser = true;

let listRoles = [
    {id: 1, role: "ROLE_USER"},
    {id: 2, role: "ROLE_ADMIN"}]

$(async function () {
    await getUser();
    await userInfo();
    await title();
    await getAllUsers();
    await getNewUserForm();
    await getDefaultModal();
    await create();

})

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('rest/users'),
    findUserByUsername: async () => await fetch(`rest/user`),
    findUserById: async (id) => await fetch(`rest/users/${id}`),
    addNewUser: async (user) => await fetch('rest/new', {method: 'POST', headers: userFetch.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`rest/users/${id}`, {method: 'PATCH', headers: userFetch.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`rest/users/${id}`, {method: 'DELETE', headers: userFetch.head})
}

async function userInfo() {
    let temporary = '';
    const info = document.querySelector('#info');
    await userFetch.findUserByUsername()
        .then(res => res.json())
        .then(user => {
            let roles = user.roles.map(role => " " + role.name);
            temporary += `
             <span style="color: azure">
               ${user.email} with roles <span>${roles}</span>
                </div>
            </span>
                </tr>
            `;
        });
    info.innerHTML = temporary;
}