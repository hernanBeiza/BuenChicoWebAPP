// factory
angular.module("ProductoDAO",['ProductoModel'])
.factory('ProductoDAO', function($http,$q,ENV,ProductoModel){ 
    return {
        guardar: function(productoModel){
            console.info("ProductoDAO: guardar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/producto";
            console.info(ruta);
            $http({
                method: 'POST',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    idusuario:productoModel.idusuario,
                    nombre:productoModel.nombre,
                    codigo:productoModel.codigo,
                    descripcion:productoModel.descripcion
                },
                /*
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                */
               withCredentials: true,
            }).then(function enviarComplete(json) {
                console.info("ProductoDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){                    
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("ProductoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        editar: function(productoModel){
            console.info("ProductoDAO: editar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/producto/"+productoModel.idproducto;
            console.info(ruta);
            $http({
                method: 'PUT',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'form-data',
                //'Content-Type': undefined,
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    idusuario:productoModel.idusuario,
                    idproducto:productoModel.idproducto,
                    nombre:productoModel.nombre,
                    codigo:productoModel.codigo,
                    descripcion:productoModel.descripcion,
                    valid:productoModel.valid,
                },
                /*
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                */
               withCredentials: true,
            }).then(function enviarComplete(json) {
                console.info("ProductoDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){                    
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("ProductoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        obtenerConUsuario: function(usuario) {
            console.info("ProductoDAO: obtenerConUsuario();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/producto/usuario/"+usuario.idusuario;
            console.info(ruta);
            $http({
                method: 'GET',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                },
                /*
                data: {
                    usuario:usuarioModel.usuario,
                    contrasena:usuarioModel.contrasena
                },
                */
                /*
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                */
               withCredentials: true,
            }).then(function enviarComplete(json) {
                console.info("ProductoDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){
                    var productos = [];
                    for(item of json.data.productos){
                        var model = new ProductoModel(item.idproducto,item.idusuario,item.nombre,item.codigo,item.descripcion,item.valid);
                        productos.push(model);
                    }
                    deferred.resolve({result:true,mensajes:json.data.mensajes,productos:productos});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("ProductoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;            
        },
        obtenerConID: function(producto) {
            console.info("ProductoDAO: obtenerConUsuario();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/producto/"+producto.idproducto;
            console.info(ruta);
            $http({
                method: 'GET',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                },
                /*
                data: {
                    usuario:usuarioModel.usuario,
                    contrasena:usuarioModel.contrasena
                },
                */
                /*
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                */
               withCredentials: true,
            }).then(function enviarComplete(json) {
                console.info("ProductoDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){
                    var item = json.data.producto;
                    var model = new ProductoModel(item.idproducto,item.idusuario,item.nombre,item.codigo,item.descripcion,item.valid);
                    deferred.resolve({result:true,mensajes:json.data.mensajes,producto:model});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("ProductoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;            
        },
        eliminar: function(producto) {
            console.info("ProductoDAO: eliminar();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/producto/"+producto.idproducto;
            console.info(ruta);
            $http({
                method: 'DELETE',
                url: ruta,
                headers: {
                //'x-access-token': token,
                //'Content-Type': 'form-data',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                },
                /*
                data: {
                    usuario:usuarioModel.usuario,
                    contrasena:usuarioModel.contrasena
                },
                */
                /*
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                */
               withCredentials: true,
            }).then(function enviarComplete(json) {
                console.info("ProductoDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("ProductoDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;            
        }
    };
});