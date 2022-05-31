var app = angular.module('app', ['ui.utils.masks']);

app.constant('moment', moment);

app.controller('RegisterController', ['$scope', '$timeout','CepService',($scope, $timeout, CepService) => {
    var s = $scope;

    s.cepFound = false;

    s.data = {
        name: null,
        email: null,
        cpf: null,
        birthdate: null,
        password: null,
        address: {
            cep: null,
            street: null,
            district: null,
            city: null,
            uf: null,
            number: null
        }
    }

    s.register = () => {
        if (!s.data.name) return toastr.warning('Informe um nome para continuar.');
        if (!s.data.email) return toastr.warning('Informe um e-mail para continuar.');
        if (!validateEmail(s.data.email)) return toastr.warning('Informe um e-mail válido.');
        if (!s.data.cpf && s.data.cpf != undefined) return toastr.warning('Informe um CPF para continuar.');
        if (s.data.cpf == undefined) return toastr.warning('Informe um CPF válido.');
        if (!s.data.birthdate && s.data.birthdate != undefined) return toastr.warning('Informe uma data de aniversário para continuar.');
        if (s.data.birthdate == undefined) return toastr.warning('Informe uma data de aniversário válida.');
        if (!checkYearsOld()) return toastr.warning('É preciso ter mais de 18 anos para se cadastrar.');
        if (!s.data.password) return toastr.warning('Informe uma senha para continuar.');
        if (s.data.password.length < 8) return toastr.warning('A senha deve conter mais de 8 dígitos.');

        if (!s.data.address.cep) return toastr.warning('Informe o CEP para continuar.');
        if (!s.data.address.street) return toastr.warning('Informe uma rua para continuar.');
        if (!s.data.address.city) return toastr.warning('Informe uma cidade para continuar.');
        if (!s.data.address.uf) return toastr.warning('Informe um estado para continuar.');
        if (!s.data.address.number) return toastr.warning('Informe um número para continuar.');
        if (!s.data.address.district) return toastr.warning('Informe um bairro para continuar.');

        try {
            if (localStorage.getItem('web-client@users')) {
                let users = JSON.parse(localStorage.getItem('web-client@users'));

                let user = s.data;

                users.push(user);

                localStorage.setItem('web-client@users', JSON.stringify(users));
            } else {
                let users = [];

                let user = s.data;

                users.push(user);

                localStorage.setItem('web-client@users', JSON.stringify(users));
            }

            toastr.success('Usuário cadastrado com sucesso.');
        } catch (error) {
            console.error(error);
            toastr.error('Ocorreu um erro ao salvar as informações.');
        }
    }

    function checkYearsOld() {
        let birthYear = moment(s.data.birthdate).year();
        let todayYear = moment().year();
        if (todayYear - birthYear >= 18) return true;
        return false;
    }

    function validateEmail (email) {
        if (email) {
            if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return true;
            return false;
        }
        return false;
    }

    s.verifyCep = () => {
        if (s.data.address.cep == null || s.data.address.cep.length < 8) return;

        let cep = s.data.address.cep.replace('/-/g', '');
            CepService.viacep(cep).success(function (data) {
                if (data.data.erro != undefined) {
                    $timeout(function () {
                        document.getElementById('street').focus();
                    }, 500)
                } else {
                    s.data.address.street = data.data.logradouro;
                    s.data.address.district = data.data.bairro;
                    s.data.address.city = data.data.localidade;
                    s.data.address.uf = data.data.uf;
                    $timeout(function () {
                        document.getElementById('number').focus();
                    }, 500)
                }
            }).error(function (err) {
                console.error(err);
                callback(false);
            });
    }

    function clean() {
        s.data = {
            name: null,
            email: null,
            cpf: null,
            birthdate: null,
            password: null,
            address: {
                cep: null,
                street: null,
                district: null,
                city: null,
                uf: null,
                number: null
            }
        }
    }
}]);

app.service('CepService', function ($q, $http) {
    return {
        viacep: function (cep) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: 'https://viacep.com.br/ws/' + cep + '/json'
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});