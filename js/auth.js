function logout()
{
	localStorage.removeItem('Name');
	localStorage.removeItem('Email');
	window.location.href="index.html";
}