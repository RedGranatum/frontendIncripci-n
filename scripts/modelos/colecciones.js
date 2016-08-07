var Backbone        = require('backbone');

module.exports =  Backbone.Model.extend({
id: function(id){
       	  this.id = id;
       },
url : function(){
	    		var direccion = 'localhost';
	    		var direccion = '107.170.1.182';
	    		return 'http://'+ direccion+':8000/registro/' + this.id + '/';
	 },

funcionBusqueda: function(funcion_exito, funcion_error){
             this.fetch({
                 success: function(datos,response){
                        console.log("informacion encontrada");
                        funcion_exito(datos.toJSON(),response);
                    },
                 error: function(model,response, options) {
                         console.log("error al buscar la informacion encontrada")
                        funcion_error(model,response,options);       
                  },
                }); 

          },

});