angular.module('UsuarioModel', [])
.factory('UsuarioModel', ['$http', function($http) {  
    function UsuarioModel(idusuario,user,pass,nombre,valid) {
        //console.log("UsuarioModel: UsuarioModel();");
        this.idusuario = idusuario;
        this.user = user;
        this.pass = pass;
        this.nombre = nombre;
        this.valid = valid;
    };
    UsuarioModel.prototype = {
        setData: function(data) {
            //console.log("UsuarioModel: setData();");
            angular.extend(this, data);
        },
    };
    return UsuarioModel;
}]);