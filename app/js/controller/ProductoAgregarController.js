angular.module('ProductoAgregarController', [])

.controller('ProductoAgregarController', ['$rootScope','$scope', '$routeParams','$location','$mdDialog','LocalDBDAO','UsuarioDAO','ProductoDAO',
  
	function($rootScope,$scope,$routeParams,$location,$mdDialog,LocalDBDAO,UsuarioDAO,ProductoDAO){
      
		$scope.init = function(){
			console.log("ProductoAgregarController: init();");
			$scope.model = {};
			$scope.model.producto = {};
			$scope.model.usuario = LocalDBDAO.obtenerUsuario();			
			$scope.model.enviando = false;
			if(!$scope.model.usuario){
				console.error("Usuario no existe");
			}
		}

		$scope.enviar = function(valid){
			console.log("ProductoAgregarController: enviar();");
			console.log($scope.model);
			if(valid){
				$scope.model.enviando = true;
				$scope.model.producto.idusuario = $scope.model.usuario.idusuario;
				ProductoDAO.guardar($scope.model.producto).then(function(data){
					$scope.model.enviando = false;
					if(data.result){
						$scope.model.producto = {};
						$scope.mostrarAlerta(data.mensajes);
					} else {
						$scope.mostrarAlerta(data.errores);
					}
				},function(dataError){
					$scope.model.enviando = false;
					$scope.mostrarAlerta(dataError.errores);
				});				
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