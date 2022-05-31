var user_logged = localStorage.getItem('web-client@user-logged');
let login = document.getElementById('login');
let logouta = document.getElementById('logout');
let cadastro = document.getElementById('cadastro');

if (user_logged) {
    logouta.classList.remove('hide');
    login.classList.add('hide');
    cadastro.classList.add('hide');
} else {
    logouta.classList.add('hide');
    login.classList.remove('hide');
    cadastro.classList.remove('hide');
}

function logout() {
    localStorage.removeItem('web-client@user-logged');
    window.location.reload();
}