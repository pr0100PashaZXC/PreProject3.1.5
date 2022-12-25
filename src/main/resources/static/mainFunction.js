async function getUser() {
    let temporary = '';
    const tableUser = document.querySelector('#tableUser tbody');
    await userFetch.findUserByUsername()
        .then(response => response.json())
        .then(user => {
            let roles = user.roles.map(role => " " + role.name);
            temporary = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>
                </tr>
            `;
            tableUser.innerHTML = temporary;

            $(function (){
                let role = ""
                for (let i = 0; i < user.roles.length; i++) {
                    role = user.roles[i].name
                    if (role === "ROLE_ADMIN") {
                        isUser = false;
                    }
                }
                if (isUser) {
                    $("#userTable").addClass("show active");
                    $("#userTab").addClass("show active");
                } else {
                    $("#adminTable").addClass("show active");
                    $("#adminTab").addClass("show active");
                }
            })
        })
}
async function title() {
    let temporary = ''
    const titleTab = document.querySelector('#titleTab');
    if (isUser) {
        temporary = `
            <h1 className="titleTab" id="titleTab">User information page</h1>
            `;
        titleTab.innerHTML = temporary;
    } else {
        temporary = `
            <h1  className="titleTab" id="titleTab">Admin panel</h1>
            `;
        titleTab.innerHTML = temporary;
    }
}

async function getAllUsers() {
    let temporary = '';
    const table = document.querySelector('#tableUsers tbody');
    await userFetch.findAllUsers()
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                let roles = user.roles.map(role => " " + role.name);
                temporary += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>
                    <td>
                        <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info"
                            className data-toggle="modal" data-target="#editModal">Edit</button>
                    </td>
                    <td>
                        <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteModal">Delete</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temporary;

        })

    $("#tableUsers").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewUserForm() {
    let button = $(`#addUser`);
    let form = $(`#addForm`);
    button.on('click', () => {
        form.show()
    })
}

async function getDefaultModal() {
    $('#defaultModal').modal({
        show: false,
        keyboard: true,
        backdrop: "static"

    }).on("show.bs.modal", (s) => {
        let thisModal = $(s.target);
        let userId = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'delete':
                deleteForm(thisModal, userId);
                break;
            case 'edit':
                updateForm(thisModal, userId);
                break;

        }
    }).on("hidden.bs.modal", (s1) => {
        let thisModal = $(s1.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}