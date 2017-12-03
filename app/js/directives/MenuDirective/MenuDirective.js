angular.module("menuDirective",[])
.directive('menuDirective', function($rootScope,$location,UsuarioDAO,){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/MenuDirective/menu.html',
      link: function(scope, element, attrs) {
        console.log("menuDirective.js");
        //console.log(element);
        // Gracias Andres!
        //$(".button-collapse").sideNav();
        //Esto de acá abajo es lo mismo que lo de arriba, pero la forma Angular, no Jquery =)
        angular.element(".button-collapse").sideNav();

        //Funciones menú
        scope.logout = function(){
          console.log("MenuDirective logout");
          console.log($rootScope.model);
          UsuarioDAO.logout().then(function(data){
            console.warn(data);
            if(data.result){
              $rootScope.model.logueado = false;
              console.log($rootScope.model);
              $location.path('/login');
            } else {
              alert(data.errores);
            }
          },function(errorData){
            console.error(errorData);
            $rootScope.model.logueado = false;
            $location.path('/login');
          })

        }

      }

    }

});