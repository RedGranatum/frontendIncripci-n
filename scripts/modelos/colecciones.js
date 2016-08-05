var Backbone        = require('backbone');

module.exports =  Backbone.Model.extend({
id: function(id){
       	  this.id = id;
       },
url : function(){
	    		var direccion = 'localhost';
	    		var direccion = '107.170.1.182';
	    		return 'http://'+ direccion+':8000/registro/' + this.id;;
	 },

funcionBusqueda: function(funcion_exito, funcion_error){
             this.fetch({
                 success: function(datos,response){
                        funcion_exito(datos.toJSON(),response);
                    },
                 error: function(model,response, options) {
                        funcion_error(model,response,options);       
                  },
                }); 

          },

});