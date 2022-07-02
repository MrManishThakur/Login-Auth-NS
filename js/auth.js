function logout()
{
	localStorage.removeItem('Name');
	localStorage.removeItem('Email');
	localStorage.removeItem('Phone');
	window.location.href="index.html";
}