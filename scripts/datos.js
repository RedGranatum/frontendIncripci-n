/*
  Datos
*/  

var datos = function(){
return {
		Meses: function(){			
  			return {1:'Enero',2:'Febrero',3:'Marzo',4:'Abril',5:'Mayo',6:'Junio',7:'Julio',8:'Agosto',9:'Septiembre',10:'Octubre',11:'Noviembre',12:'Diciembre'};									
		},
		Categorias: function(){
			return {"libre-varonilt":"Libre Varonil (Tapachula)","libre-femenilt":"Libre Femenil (Tapachula)", "juvenil-varonil":"Juvenil Varonil (16 a 24 años)"," libre-varonil":"Libre Varonil (25 a 35 años)",
			"master-varonil":" Master Varonil (36 en adelante)","juvenil-femenil":"Juvenil Femenil (16 a 24 años)",
			" libre-femenil":"Libre Femenil (25 a 35 años)","master-femenil":"Master Femenil (36 en adelante)",
			"infantil":"Infantil (4-8 años)",};
		},

		Generos: function(){
			return {"f":"2da. Carrera QuieroCorrer-Tapachula 18 de Diciembre 2016","m":"3ra. Carrera Quierocorrer-Cacahoatán 23 de Diciembre 2016"};
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

		Municipios: function(){
			return {"nuevo":"Ocampo","otro":"Zitacuaro"};
		},
	};
}
module.exports = datos;