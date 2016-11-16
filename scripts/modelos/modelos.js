var Backbone        = require('backbone');

module.exports =  Backbone.Model.extend({
		url : function(){
	    		//var direccion = 'localhost:8000';
              var direccion ='107.170.1.182/servidor'  
	    		return 'http://'+ direccion+'/registro/';  
               //var direccion = '192.241.197.67';
	    		//return 'http://'+ direccion+'/carreraapp/';    		
	  	},
      
     Guardar: function(datos,funcion_exito,funcion_error){
     	
     	this.set(datos);
     	
     	this.save(null,{
     		type: 'POST',
     		success: function(datos,response){
     			 funcion_exito(datos.toJSON(),response);
     		},
     		error: function(model,response,options){
     			 funcion_error(model,response,options);     
     		}
     	})
    },
});

