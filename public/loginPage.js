let userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    console.log(data);
    let result = ApiConnector.login(data, (f) => {if(f){return true}; return false});
    console.log(result);
};
let userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, object => {
        if(object.success){
            location.reload();
            return;
        }
        userForm.setLoginErrorMessage(object.error);
        return;
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, object => {
        if(object.success){
            location.reload();
            return;
        }
        userForm.setRegisterErrorMessage(object.error);
        return;
    });
};