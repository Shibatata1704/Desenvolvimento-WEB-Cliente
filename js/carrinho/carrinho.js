var app = angular.module('app', [])


app.controller('cart_controller', ['$scope', ($scope) => {
    let percentage = 1
    getCart();
    $scope.coupon = null
    $scope.price = 0.00

    function getCart() {
        $scope.cart = JSON.parse(localStorage.getItem('cart'))
        if (!$scope.cart) {
            $scope.cart = []
            return
        }
    }

    function updatePrice(){
        const prices = $scope.cart.map((product) => product.quantity*product.price);

        if(prices.length===0){
            return
        }

        $scope.price = prices.reduce((total, currentValue) => {
            return total+currentValue
        })*percentage
    }
    
    $scope.removeItem = (index) => {
        $scope.cart.splice(index,1)
        localStorage.setItem('cart', JSON.stringify($scope.cart))
        updatePrice()
    }

    $scope.addQuantity = (index) => {
        $scope.cart[index].quantity++
        localStorage.setItem('cart', JSON.stringify($scope.cart))
        updatePrice()
    }

    $scope.minQuantity = (index) => {
        if($scope.cart[index].quantity === 1){
            $scope.removeItem()
            updatePrice
            return
        }
        $scope.cart[index].quantity--
        localStorage.setItem('cart', JSON.stringify($scope.cart))
        updatePrice()
    }

    $scope.validateCoupon = () =>{
        used = localStorage.getItem('coupon')
        console.log(used)
        if(used=="true"){
            console.log('aqui')
            return
        }
        if($scope.coupon != 'UTFPR'){
            console.log('aqui2')
            return
        }
        used = localStorage.setItem('coupon',true)
        percentage = 0.85
        updatePrice()
    }

    $scope.finishBuy = () =>{
        user_logged = localStorage.getItem('web-client@user-logged')
        user_logged = JSON.parse(user_logged)
        console.log(user_logged)
        if(user_logged){
            return toastr.success('Compra finalizada com sucesso!')
        }else{
            window.location.href = 'login.html'
        }
    }

    //function evento(evento)
    updatePrice()


}])