var app = angular.module('app', [])


app.controller('product_controller', ['$scope', ($scope) => {
    $scope.modal_product = null
    $scope.sortType = 'price'
    $scope.order = 'ASC'
    $scope.products = [
        {
            id: 0,
            name: "CAMISETA DEBUGAR PROGRAMAR",
            price: 149.99,
            image: "./assets/camisa_debug_programar.png",
            quantity: 0
        },
        {
            id: 1,
            name: "CAMISETA DEFINIÇÃO DE PROGRAMADOR",
            price: 49.99,
            image: "./assets/camisa_definicao_programador.png",
            quantity: 0

        },
        {
            id: 2,
            name: "CAMISETA EU CONHEÇO HTML E CSS",
            price: 99.99,
            image: "./assets/camisa_eu_sei_css_html.png",
            quantity: 0

        },
        {
            id: 3,
            name: "CAMISETA GITHUB",
            price: 199.99,
            image: "./assets/camisa_github.png",
            quantity: 0

        },
        {
            id: 4,
            name: "CAMISETA CSS",
            price: 99.99,
            image: "./assets/camiseta_css.png",
            quantity: 0

        },
        {
            id: 5,
            name: "CAMISETA SEM INTERNET",
            price: 69.99,
            image: "./assets/camiseta_sem_internet.png",
            quantity: 0

        },
        {
            id: 6,
            name: "CAMISETA EU NÃO FACO GAMBIARRAS",
            price: 149.99,
            image: "./assets/camiseta_gambiarras.png",
            quantity: 0

        },
        {
            id: 7,
            name: "CAMISETA LIFESTYLE DE PROGRAMADOR",
            price: 149.99,
            image: "./assets/camiseta_lifestyle_programador.png",
            quantity: 0

        },
        {
            id: 8,
            name: "CAMISETA MEU PODER É CODAR",
            price: 79.99,
            image: "./assets/camiseta_meu_poder_codar.png",
            quantity: 0

        },
        {
            id: 9,
            name: "CAMISETA EU AMO/ODEIO PROGRAMAÇÃO",
            price: 109.99,
            image: "./assets/camiseta_eu_amo_odeio_programacao.png",
            quantity: 0

        },
        {
            id: 10,
            name: "CAMISETA LINGUAGEM DE PROGRAMAÇÃO",
            price: 119.99,
            image: "./assets/camiseta_linguagens_programacao.png",
            quantity: 0

        },
        {
            id: 11,
            name: "CAMISETA SOU GAROTO DE PROGRAMA",
            price: 199.99,
            image: "./assets/camiseta_sou_garoto_de_programa.png",
            quantity: 0
        },
    ]


    function orderPrice() {
        if ($scope.order === 'ASC') {
            $scope.products.sort(function compareFn(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            })
        } else {
            $scope.products.sort(function compareFn(a, b) {
                if (a.price < b.price) return 1;
                if (a.price > b.price) return -1;
                return 0;
            })
        }
    }

    function orderAlphabetic() {
        if ($scope.order === 'ASC') {
            $scope.products.sort(function compareFn(a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            })
        } else {
            $scope.products.sort(function compareFn(a, b) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            })
        }
    }

    $scope.sort = () => {
        if ($scope.sortType === 'price') {
            orderPrice()
            return
        }
        orderAlphabetic()
    }

    $scope.changeOrder = () => {
        if ($scope.order === 'ASC') {
            $scope.order = 'DESC'
        } else {
            $scope.order = 'ASC'
        }
        $scope.sort()
    }

    $scope.buy = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = []
            setQuantity(cart, product);
            return
        }
        console.log(cart)
        setQuantity(cart, product);
    }

    function setQuantity(cart, product) {
        let index = null
        let exists = cart.find(cartItem => cartItem.id === product.id)
        if (exists === undefined) {
            product.quantity++
            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        index = cart.indexOf(exists)
        if(index!==-1){
            cart[index].quantity++
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

    $scope.openModal = (product) =>{
        $scope.modal_product = product
    }
    
    $scope.closeModal = () =>{
        $scope.modal_product = null
    }

    
    $scope.sort();

}])
