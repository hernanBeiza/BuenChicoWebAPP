angular.module("menuDirective",[])
.directive('menuDirective', function($rootScope,$location,LocalDBDAO,UsuarioDAO,){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/MenuDirective/menu.html',
      link: function(scope, element, attrs) {
        console.log("menuDirective.js");
        //console.log(element);
        // Gracias Andres!
        //$(".button-collapse").sideNav();
        //Esto de acá abajo es lo mismo que lo de arriba, pero la forma Angular, no Jquery =)
        angular.element(".button-collapse").sideNav({closeOnClick: true});

        scope.model.usuario = LocalDBDAO.obtenerUsuario();
        console.log(scope.model);
        //Funciones menú
        scope.logout = function(){
          console.log("MenuDirective logout");
          UsuarioDAO.logout().then(function(data){
            console.warn(data);
            if(data.result){
              LocalDBDAO.borrarTodo();
              $location.path('/login');
            } else {
              alert(data.errores);
            }
          },function(errorData){
            console.error(errorData);
            LocalDBDAO.borrarTodo();
            $location.path('/login');
          })
        }

      }

    }

});