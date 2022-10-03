let userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, object => {
        if(object.success){
            location.reload();
            return;
        }
        console.error(object.error);
        return;
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, object => {
        if(object.success){
            location.reload();
            return;
        }
        console.error(object.error);
        return;
    });
};