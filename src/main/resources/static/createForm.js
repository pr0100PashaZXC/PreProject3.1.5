async function create() {
    $('#addUser').click(async () =>  {
        let addUserForm = $('#addForm')
        let firstName = addUserForm.find('#newFirstName').val().trim();
        let lastName = addUserForm.find('#newLastName').val().trim();
        let age = addUserForm.find('#newAge').val().trim();
        let email = addUserForm.find('#newEmail').val().trim();
        let password = addUserForm.find('#newPassword').val().trim();
        let thisRoles = () => {
            let tempArray = []
            let options = document.querySelector('#newRoles').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    tempArray.push(listRoles[i])
                }
            }
            return tempArray;
        }
        let data = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            age: age,
            email: email,
            roles: thisRoles()
        }

        const response = await userFetch.addNewUser(data);
        if (response.ok) {
            addUserForm.find('#newFirstname').val('');
            addUserForm.find('#newLastName').val('');
            addUserForm.find('#newAge').val('');
            addUserForm.find('#newEmail').val('');
            addUserForm.find('#newPassword').val('');
            addUserForm.find(thisRoles()).val('');
            $('.nav-tabs a[href="#adminTable"]').tab('show');
            await getAllUsers();
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert);
        }
    });
}