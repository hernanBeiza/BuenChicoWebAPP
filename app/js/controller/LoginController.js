angular.module('LoginController', [])

.controller('LoginController', ['$rootScope','$scope','$location','LocalDBDAO','UsuarioDAO','$mdDialog',
  
	function($rootScope,$scope,$location,LocalDBDAO,UsuarioDAO,$mdDialog){
      
		$scope.init = function(){
			console.log("LoginController: init();");
			$scope.model.usuario = {};
			$scope.model.enviando = false;
		}

		$scope.loginEnviar = function(valid){
			console.log("LoginController: loginEnviar();",valid);
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
				$scope.model.enviando = true;

				UsuarioDAO.login($scope.model.usuario).then(function(data){
					console.warn(data);
					$scope.model.enviando = false;

					if(data.result){
						LocalDBDAO.guardarUsuario(data.usuario);
						$rootScope.model.usuario = data.usuario;
						$rootScope.model.logueado = true;
						$location.path('/productos');
					} else {
						$rootScope.model.logueado = false;
						$scope.mostrarAlerta(data.errores);

					}
				},function(errorData){
					console.error(errorData);
					$scope.model.enviando = false;
					$rootScope.model.logueado = false;
					$scope.mostrarAlerta(errorData.errores);
				})
			} else {
				$scope.mostrarAlerta(errores);
			}

		}

		$scope.mostrarAlerta = function(mensaje){
			$mdDialog.show(
				$mdDialog.alert()
				.title("Atención")
				.textContent(mensaje)
		        .ok('Aceptar')
				.clickOutsideToClose(true));

		}

  }


])