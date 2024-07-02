//clear error message
function ClearFormError(){
    let errors = document.getElementsByClassName("error-message");
    for(let errorItem of errors){
        errorItem.innerHTML = "";
    }
}
//link between login and signup page
document.addEventListener("DOMContentLoaded", ()=>{
    const loginForm = document.querySelector("#loginForm");
    const signUp = document.querySelector("#create-account");
    document.querySelector("#link-create-account").addEventListener("click", e=>{
        ClearFormError();
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        signUp.classList.remove("form-hidden");
    });
    document.querySelector("#link-login").addEventListener("click", e=>{
        ClearFormError();
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        signUp.classList.add("form-hidden");
    });
    document.querySelector("#create-account").addEventListener("submit", e => {
        e.preventDefault();
    });
})

//error message function
function setError(id, error){
    let element = document.getElementById(id);
    element.getElementsByClassName('error-message')[0].innerHTML = error;
}


//validation
function validateFormData(){
    ClearFormError();
    var returnVal = true;    
    var name = document.forms['form-signup']["form-name"].value;
    if(name.length==0){
        setError("error-name", "name field cannot be blank");
        returnVal = false
    }else if(name.length<5){
        setError("error-name", "must be atleast 5 character");
        returnVal = false
    }
    

    var email = document.forms['form-signup']["form-email"].value;
    let emailElmtRegex = new RegExp('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}');
    if(email.length===0){
        setError("error-email", "email field cannot be blank");
        returnVal = false
    }else if(!emailElmtRegex.test(email)){
        setError("error-email", "invalid email format");
        returnVal = false
    }else if(email.length>25){
        setError("error-email", "email cannot be greater than 25 character");
        returnVal = false
    }
    var gender = document.forms['form-signup']['form-gender'].value;
    if(gender.length===0){
        setError("error-gender", "please select gender");
        returnVal = false
    }

    var countryCode = document.querySelector('#select').value;
    if(countryCode.length===0){
        setError("error-phone", "please select country code");
        returnVal = false
    }

    var phone = document.forms['form-signup']["form-phone"].value;
    if(phone.length===0){
        setError("error-phone", "phone number field cannot be blank");
        returnVal = false
    }else if(countryCode==+91 && phone.length!==10){
        setError("error-phone", "phone number must be 10 digits");
        returnVal = false
    }else if(countryCode==+977 && phone.length!==10){
        setError("error-phone", "phone number must be 10 digits");
        returnVal = false
    }else if(countryCode==+93 && phone.length!==10){
        setError("error-phone", "phone number must be 10 digits");
        returnVal = false
    }else if(countryCode==+86 && phone.length!==11){
        setError("error-phone", "phone number must be 11 digits");
        returnVal = false
    }else if(countryCode==+975 && phone.length!==8){
        setError("error-phone", "phone number must be 8 digits");
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
    if(returnVal==true){
        let saveName = document.forms['form-signup']["form-name"].value;
        let saveEmail = document.forms['form-signup']["form-email"].value;
        let savePhone = document.forms['form-signup']["form-phone"].value;
        let savePassword = document.forms['form-signup']["form-password"].value;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.e30.gEYP8Fd_D5kIQZ287DsuWsVotM-4hJMvzwep7i8HSco");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://backend-node-api-h4w5.onrender.com/customer/all", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            let phoneExists = false;
            let emailExists = false;
            console.log("data", data)
            data.forEach((customer) => {
                if (customer.phone === `${countryCode}-${savePhone}`) {
                    phoneExists = true;
                }
                if (customer.email === saveEmail) {
                    emailExists = true;
                }
            });

            if (phoneExists && emailExists) {
                alert("Already have account with this phone & email");
                // console.log('Already have account with this phone & email')
            } else if (phoneExists) {
                alert("Already have account with this phone");
                // console.log('Already have account with this phone')
            } else if (emailExists) {
                alert("Already have account with this email");
                // console.log('Already have account with this email')
            } else {
                const myHeaders2 = new Headers();
                myHeaders2.append("Content-Type", "application/json");
                myHeaders2.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.e30.gEYP8Fd_D5kIQZ287DsuWsVotM-4hJMvzwep7i8HSco");

                const customerData = JSON.stringify({
                    "name": saveName,
                    "email": saveEmail,
                    "phone": `${countryCode}-${savePhone}`,
                    "password": savePassword
                });

                const requestOptionsCreate = {
                    method: "POST",
                    headers: myHeaders2,
                    body: customerData,
                    redirect: "follow"
                };

                fetch("https://backend-node-api-h4w5.onrender.com/customer/create", requestOptionsCreate)
                .then((response) => response.text())
                .then((result) => console.log('Registered successfully'))
                .catch((error) => console.error(error));
                alert("Registered successfully");
            }
        })
        .catch((error) => console.error('Error:', error));
    }
    return returnVal;
}