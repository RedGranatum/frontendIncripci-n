/*
  Datos
*/  

var datos = function(){
return {
		Meses: function(){			
  			return {1:'Enero',2:'Febrero',3:'Marzo',4:'Abril',5:'Mayo',6:'Junio',7:'Julio',8:'Agosto',9:'Septiembre',10:'Octubre',11:'Noviembre',12:'Diciembre'};									
		},
		Categorias: function(){
			return {"duatlon-completo":"Duatlón-Completo","duatlon-parejas":"Duatlón-Parejas"};
		},
		Generos: function(){
			return {"f":"Femenino","m":"Masculino"};
		},
		Estados: function(){
			return {"cdmx":"Ciudad de México","edomex":"Estado de México","mich":"Michoacan"};
		},
	};
}
module.exports = datos;