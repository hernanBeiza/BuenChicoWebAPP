angular.module('ProductoEditarController', [])

.controller('ProductoEditarController', ['$rootScope','$scope', '$routeParams','$location','$mdDialog','LocalDBDAO','UsuarioDAO','ProductoDAO',
  
	function($rootScope,$scope,$routeParams,$location,$mdDialog,LocalDBDAO,UsuarioDAO,ProductoDAO){
      
		$scope.init = function(){
			console.log("ProductoEditarController: init();");
			$scope.model = {};
			$scope.model.producto = {};
			$scope.model.usuario = LocalDBDAO.obtenerUsuario();		
			$scope.model.enviando = false;
	
			if(!$scope.model.usuario){
				console.error("Usuario no existe");
			}
			if($routeParams.idproducto){
				$scope.model.producto.idproducto = $routeParams.idproducto;
				$scope.obtenerProductoConID($scope.model.producto);
			}

		}

		$scope.obtenerProductoConID = function(model){
			ProductoDAO.obtenerConID(model).then(function(data){
				if(data.result){
					$scope.model.producto = data.producto;
				} else {
					$scope.mostrarAlerta(data.errores);
				}
			},function(dataError){
				$scope.mostrarAlerta(dataError.errores);
			});
		}

		$scope.enviar = function(valid){
			console.log("ProductoEditarController: enviar();");
			console.log($scope.model);
			if(valid){
				$scope.model.enviando = true;
				$scope.model.producto.idusuario = $scope.model.usuario.idusuario;
				ProductoDAO.editar($scope.model.producto).then(function(data){
					$scope.model.enviando = false;

					if(data.result){
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