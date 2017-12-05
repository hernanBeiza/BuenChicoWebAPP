angular.module('ProductosController', [])

.controller('ProductosController', ['$rootScope','$scope', '$routeParams','$location','LocalDBDAO','UsuarioDAO','ProductoDAO','$mdDialog',
  
	function($rootScope,$scope,$routeParams,$location,LocalDBDAO,UsuarioDAO,ProductoDAO,$mdDialog){
      
		$scope.init = function(){
			console.log("ProductosController: init();");
			$scope.model = {};
			$scope.model.productos = [];
			$scope.model.usuario = LocalDBDAO.obtenerUsuario();
			if($scope.model.usuario){
				$scope.cargar();
			} else {
				console.error("Usuario no existe");
			}

		}

		$scope.cargar = function(){
			ProductoDAO.obtenerConUsuario($scope.model.usuario).then(function(data){
				console.log(data);
				if(data.result){
					$scope.model.productos = data.productos;
				} else {
					$scope.mostrarAlerta(data.mensajes);
				}
			},function(errorData){
				console.error(errorData);
				$scope.mostrarAlerta(errorData.errores);
	       });
		}

		$scope.irEditar = function(producto){
			var ruta = "/producto/editar/"+producto.idproducto;
			$location.path(ruta);
		}

		$scope.eliminar = function(producto){
			ProductoDAO.eliminar(producto).then(function(data){
				console.log(data);
				if(data.result){
					$scope.cargar();
					$scope.mostrarAlerta(data.mensajes);
				} else {
					$scope.mostrarAlerta(data.mensajes);
				}
			},function(errorData){
				console.error(errorData);
				$scope.mostrarAlerta(errorData.errores);
	       });
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