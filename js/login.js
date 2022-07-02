function ClearFormError(){
    let errors = document.getElementsByClassName("error-message");
    for(let errorItem of errors){
        errorItem.innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    
    document.querySelector("#login").addEventListener("click", e=>{
        e.preventDefault();
    });
})


//error message function
function setError(id, error){
    let element = document.getElementById(id);
    element.getElementsByClassName('error-message')[0].innerHTML = error;
}

function loginPage(){
	ClearFormError();
    let user_id = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	
	let user_records=new Array();
	user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
	if(user_id.length===0 && password.length===0){
		setError("error-user", "username cannot be blank");
		setError("error-password", "password cannot be blank");
	}else if(user_id.length===0 && password.length!==0){
		setError("error-user", "username cannot be null");
	}else if(user_id.length!==0 && password.length===0){
		setError("error-password", "password cannot be null");
	}else if(user_records.some((u)=>{return u.Email===user_id && u.Password===password})){
		alert("Login successfull");
		let current_user=user_records.filter((v)=>{return v.Email===user_id  && v.Password===password})[0]
		localStorage.setItem('Name',current_user.Name);
		localStorage.setItem('Email',current_user.Email);
		localStorage.setItem('Phone',current_user.Phone);
		window.location.href="dashboard.html"
    }else if(user_records.some((p)=>{return p.Phone===user_id && p.Password===password})){
		alert("Login successfull");
		let current_user=user_records.filter((v)=>{return v.Phone===user_id  && v.Password===password})[0]
		localStorage.setItem('Name',current_user.Name);
		localStorage.setItem('Email',current_user.Email);
		localStorage.setItem('Phone',current_user.Phone);
		window.location.href="dashboard.html"
	}else{
		alert("Invalid username or password");
	}
}