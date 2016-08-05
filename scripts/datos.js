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
			return{
			  Ags:'AGUASCALIENTES',  BCN:'BAJA CALIFORNIA', BCS:'BAJA CALIFORNIA SUR',Camp:'CAMPECHE',
			  Chiaps:'CHIAPAS', Chih:'CHIHUAHUA', Coah:'COAHUILA',  Col:'COLIMA',
			  CDMX:'CIUDAD DE MEXICO',  Dgo:'DURANGO',  Gto:'GUANAJUATO',  Gro:'GUERRERO',
			  Hgo:'HIDALGO',  Jal:'JALISCO',  EdoMex:'ESTADO DE MEXICO',  Mich:'MICHOACAN',  Mor:'MORELOS',
			  Nay:'NAYARIT',  NL:'NUEVO LEON',  Oax:'OAXACA',  Pue:'PUEBLA',  Qro:'QUERETARO',
			  QRoo:'QUINTANA ROO',  SLP:'SAN LUIS POTOSI',  Sin:'SINALOA',  Son:'SONORA',  Tab:'TABASCO',
			  Tamps:'TAMAULIPAS',  Tlax:'TLAXCALA',  Ver:'VERACRUZ',  Yuc:'YUCATAN',  Zac:'ZACATECAS',
			  Ext:'EXTRANJERO'
		   }
		},
	};
}
module.exports = datos;