// factory
angular.module("UsuarioDAO",['UsuarioModel'])
.factory('UsuarioDAO', function($http,$q,ENV,UsuarioModel){ 
    return {
        login: function(usuarioModel){
            console.info("UsuarioDAO: login();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/login";
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
                    usuario:usuarioModel.user,
                    contrasena:usuarioModel.pass
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
                console.info("UsuarioDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){
                    var usuario = json.data.usuario;
                    deferred.resolve({result:true,mensajes:json.data.mensajes,usuario:usuario});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("usuarioDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        session: function(){
            console.info("UsuarioDAO: session();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/session";
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
                console.info("UsuarioDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){                    
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("UsuarioDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
        logout: function() {
            console.info("UsuarioDAO: logout();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/logout";
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
                console.info("UsuarioDAO.js: enviarComplete");
                console.info(json);
                if(json.data.result){                    
                    deferred.resolve({result:true,mensajes:json.data.mensajes});
                } else {
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.error("UsuarioDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;            
        }
    };
});