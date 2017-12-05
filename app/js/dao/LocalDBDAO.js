// factory
angular.module("LocalDBDAO",['UsuarioModel'])
.factory('LocalDBDAO', function(UsuarioModel){ 
    const constUsuario = "USUARIO";

    return {
        guardarUsuario: function(model){
            localStorage.setItem(constUsuario,JSON.stringify(model));
            return true;
        },
        obtenerUsuario: function(){
            usuario = JSON.parse(localStorage.getItem(constUsuario));
            return usuario;
        },
        borrarUsuario: function(){
            localStorage.removeItem(constUsuario);
            return true;
        },
        borrarTodo: function(){
            localStorage.clear();
            return true;            
        },
    };
});