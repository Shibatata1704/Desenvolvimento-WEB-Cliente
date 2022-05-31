var app = angular.module('app', []);

app.controller('ContactController', ['$scope', ($scope) => {
    var s = $scope;

    s.data = {
        name: null,
        email: null,
        subject: 'Sugestões',
        message: null
    };

    s.clean = function () {
        s.data = {
            name: null,
            email: null,
            subject: 'Sugestões',
            message: null
        };
    }

    function validateEmail (email) {
        if (email) {
            if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return true;
            return false;
        }
        return false;
    }

    s.contact = function () {
        if (!s.data.name) return toastr.warning('Informe um nome para continuar.');
        if (!s.data.email) return toastr.warning('Informe um e-mail para continuar.');
        if (!validateEmail(s.data.email)) return toastr.warning('Informe um e-mail válido.');
        if (!s.data.subject) return toastr.warning('Informe um assunto para continuar.');
        if (!s.data.message) return toastr.warning('Informe uma mensagem para continuar.');

        toastr.success('Mensagem enviada com sucesso.');
        s.clean();
    }
}]);