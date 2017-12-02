angular.module('LoginController', [])

.controller('LoginController', ['$rootScope','$scope', '$routeParams','$location','UsuarioDAO',
  
	function($rootScope,$scope,$routeParams,$location,$UsuarioDAO){
      
		$scope.init = function(){
			console.log("LoginController: init();");
			$scope.model.usuario = {};
		}

		$scope.loginEnviar = function(){
			console.log("LoginController: loginEnviar();");
			console.log($scope.model);

			var enviar = true;
			var errores = "Te Faltó:"

			if(!$scope.model.usuario.user){
				enviar = false;
				errores+="\nUsuario";
			}
			if(!$scope.model.usuario.pass){
				enviar = false;
				errores+="\nContraseña";
			}

			if(enviar){
				console.log("entrar");
				$UsuarioDAO.login($scope.model.usuario).then(function(data){
					console.warn(data);
					if(data.result){
						$rootScope.model.usuario = $scope.model.usuario;
						$rootScope.model.logueado = true;
						$location.path('/productos');
					} else {
						alert(data.errores);
						$rootScope.model.logueado = false;
				        //$ngBootbox.alert(data.errores).then(function() { });			    			  								
					}
				},function(errorData){
					console.error(errorData);
					$rootScope.model.logueado = false;
					alert(errorData.errores);
			        //$ngBootbox.alert(errorData.errores).then(function() { });			    			  								
				})
			} else {
				alert(errores);
		        //$ngBootbox.alert(errores).then(function() { });			    			  		
			}

		}

  }


])