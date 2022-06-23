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