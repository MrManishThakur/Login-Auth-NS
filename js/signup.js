//link between login and signup page
document.addEventListener("DOMContentLoaded", ()=>{
    const loginForm = document.querySelector("#loginForm");
    const signUp = document.querySelector("#create-account");
    document.querySelector("#link-create-account").addEventListener("click", e=>{
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        signUp.classList.remove("form-hidden");

    });
    document.querySelector("#link-login").addEventListener("click", e=>{
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        signUp.classList.add("form-hidden");
    });
})

//validation

function ClearFormError(){
    let errors = document.getElementsByClassName("error-message");
    for(let errorItem of errors){
        errorItem.innerHTML = "";
    }
}

function setError(id, error){
    let element = document.getElementById(id);
    element.getElementsByClassName('error-message')[0].innerHTML = error;
}

function validateFormData(){
    var returnVal = true;
    ClearFormError();
    var name = document.forms['form-signup']["form-name"].value;
    if(name.length==0){
        setError("error-name", "name field cannot be blank");
        returnVal = false
    }else if(name.length<5){
        setError("error-name", "must be atleast 5 character");
        returnVal = false
    }
    

    var email = document.forms['form-signup']["form-email"].value;
    if(email.length==0){
        setError("error-email", "email field cannot be blank");
        returnVal = false
    }else if(email.length>25){
        setError("error-email", "email cannot be greater than 25 character");
        returnVal = false
    }
    

    var phone = document.forms['form-signup']["form-phone"].value;
    if(phone.length==0){
        setError("error-phone", "phone number field cannot be blank");
        returnVal = false
    }else if(phone.length > 10 || phone.length < 10){
        setError("error-phone", "phone number must be 10 digits");
        returnVal = false
    }

    var password = document.forms['form-signup']["form-password"].value;
    if(password.length==0){
        setError("error-pass", "password cannot be blank");
        returnVal = false  
    }else if(password.length < 6){
        setError("error-pass", "password should be atleast 6 character");
        returnVal = false
    }else if(password.length>12){
        setError("error-pass", "password should not be greater 12 character");
        returnVal = false
    }

    var conformPassword = document.forms['form-signup']["form-cpassword"].value;
    if(conformPassword.length==0){
        setError("error-cpass", "password cannot be blank");
        returnVal = false
    }else if(conformPassword!=password){
        setError("error-cpass", "password doesn't match");
        returnVal = false
    }
    return returnVal;
}

