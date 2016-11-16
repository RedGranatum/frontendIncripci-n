var Backbone        = require('backbone');

module.exports =  Backbone.Model.extend({
id: function(id){
       	  this.id = id;
       },
url : function(){
	    	//	var direccion = 'localhost:8000';
            var direccion ='107.170.1.182/servidor'  
          if(this.email !== undefined){
            return 'http://'+ direccion+'/registro/email_adulto/' + this.email + '/';
          }
          return 'http://'+ direccion+'/registro/' + this.id + '/';
	    		//var direccion = '192.241.197.67';

	    		//return 'http://'+ direccion+'/carreraapp/registro/' + this.id + '/';
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
