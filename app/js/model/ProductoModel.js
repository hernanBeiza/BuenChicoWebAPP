angular.module('ProductoModel', [])
.factory('ProductoModel', ['$http', function($http) {  
    function ProductoModel(idproducto,idusuario,nombre,codigo,descripcion,valid) {
        //console.log("ProductoModel: ProductoModel();");
        this.idproducto = idproducto;
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valid = valid;
    };
    ProductoModel.prototype = {
        setData: function(data) {
            //console.log("ProductoModel: setData();");
            angular.extend(this, data);
        },
    };
    return ProductoModel;
}]);