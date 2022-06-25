var app = angular.module('app', []);

app.controller('LoginController', ['$scope', ($scope) => {
    var s = $scope;

    s.data = {
        email: null,
        password: null,
    }

    s.login = () => {
        if (!s.data.email) return toastr.warning('Informe um e-mail para continuar.');
        if (!validateEmail(s.data.email)) return toastr.warning('Informe um e-mail válido.');
        if (!s.data.password) return toastr.warning('Informe uma senha para continuar.');

        try {
            if (localStorage.getItem('web-client@users')) {
                let users = JSON.parse(localStorage.getItem('web-client@users'));

                console.log(users)

                let user = users.find(u => {
                    return u.email == s.data.email && s.data.password == u.password
                });

                console.log(user)

                if (user) {
                    toastr.success('Logado com sucesso!');
                    localStorage.setItem('web-client@user-logged', JSON.stringify(user));
                    window.location.href = 'index.html';
                } else {
                    toastr.warning('Nenhum usuário encontrado.');
                    clean();
                }

            } else {
                toastr.warning('Nenhum usuário cadastrado.');
            }
        } catch (error) {
            console.error(error);
            toastr.error('Ocorreu um erro ao logar.');
        }
    }

    function validateEmail (email) {
        if (email) {
            if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return true;
            return false;
        }
        return false;
    }

    function clean() {
        s.data = {
            email: null,
            password: null
        }
    }
}]);