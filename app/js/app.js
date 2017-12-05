var app = angular.module('buenchico', [
  'constantes',
  'ngRoute','ngMaterial',
  'LoginController','ProductosController','ProductoAgregarController','ProductoEditarController',
  'LocalDBDAO','UsuarioDAO','ProductoDAO',
  'UsuarioModel','ProductoModel',
  'menuDirective'
]);
app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    $routeProvider.      
      when('/productos', {
        templateUrl: 'views/productosView.html',
        //controller: 'indexController'
      })
      .when('/producto/agregar', {
        templateUrl: 'views/productoAgregarView.html',
        //controller: 'productosAgregarController'
      })
      .when('/producto/editar/:idproducto', {
        templateUrl: 'views/productoEditarView.html',
        //controller: 'ProductosEditarController'
      })
      .when('/index', {
        templateUrl: 'views/loginView.html',
        //controller: 'indexController'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }
])
.run(function($rootScope,ENV,$location,UsuarioDAO){
  console.log("app.js run");
  console.log(ENV);

  $rootScope.model = {};
  
  $rootScope.$on('$routeChangeSuccess', function() {
    console.log($location.path());

    if($location.path()!="/index"){
      UsuarioDAO.session().then(function(data){
        //console.log(data);
        if(data.result){ 
          //console.info(data.usuario);
          $rootScope.model.usuario = data.usuario;
          $rootScope.model.logueado = true;
          console.info("Usuario logueado",$rootScope.model.logueado);
        } else {
          //console.error(data.errores);
          $rootScope.model.logueado = false;
          console.error("Usuario no logueado",$rootScope.model.logueado);
          $location.path("/index");
        }
      },function(data){
        //console.error(data);
        //console.error(data.errores);
        $rootScope.model.logueado = false;
        console.error("Usuario no logueado",$rootScope.model.logueado);
        $location.path("/index");
      });    
    }
  });

  $rootScope.getNumber = function(num) {
    console.log(num);
    return new Array(num);   
  }

});