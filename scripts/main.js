var React = require('react');
var ReactDOM  = require('react-dom');
var ReactRouter= require('react-router');
var Router= ReactRouter.Router;
var Route= ReactRouter.Route;
var Navigation= ReactRouter.Navigation;
var History=ReactRouter.History;
var createBrowserHistory =require('history/lib/createBrowserHistory');

var Datos = require('./datos')

var Plantilla = require('./controles/plantilla')
var CajaTexto = require('./controles/caja_texto');
var Combo = require('./controles/combo');

//var dias={1:1,2:2}
//var meses={1:'Enero',2:'Febrero'}
//var anios={1:"1950",2:"1951"}
//var generos={"femenino":"Femenino","masculino":"Masculino"}
//var entidades={"cdmx":"Ciudad de México","edomex":"Estado de México"}
//var categorias={"duatlon-completo":"Duatlón-Completo","duatlon-parejas":"Duatlón-Parejas"}
/*
  App
*/  

//var daysInMonth = new Date(2015,2,1,-1).getDate()

   var App=React.createClass({
    getInitialState: function(){
       return{
       	  genero: "masculino",
       	  entidad: "cdmx",
          anio: 1997,
          mes: 1,
          dia:1,
          enParejas:false,
          categoria: "duatlon-completo",
       }    
    },
    componentWillMount: function(){
        this.anios = this.obtenerAnios();
        this.meses = Datos().Meses();            
        this.categorias = Datos().Categorias();
        this.generos = Datos().Generos();
        this.estados = Datos().Estados();
    },
    obtenerAnios: function(){
    	var anios = {}
    	for (var i = 1930; i <=2010 ; i++) {
    		anios[i] = i;
    	};
    	return anios;
    },
    llenarDias: function(num_dias){
    	var dias = {}
    	for (var i = 1; i <=num_dias ; i++) {
    		dias[i] = i;
    	};
    	return dias;
    },
    registrar:function(){
      
      var salida="";
      salida+="\n"+this.refs.nombre.valor();
      salida+="\n"+this.refs.paterno.valor();
      salida+="\n"+this.refs.materno.valor();
      salida+="\n"+this.refs.cp.valor();
      salida+="\n"+this.refs.email.valor();
      salida+="\n"+this.refs.tel.valor();
      salida+="\n"+this.refs.alergia.valor();
      if(this.state.enParejas){
      	salida+="\n"+this.refs.nomCiclista.valor();
      	salida+="\n"+this.refs.emailCiclista.valor();      	
      }      
      salida+="\n"+this.refs.dia.valor();
      salida+="\n"+this.refs.mes.valor();
      salida+="\n"+this.refs.anio.valor();
      salida+="\n"+this.refs.genero.valor();
      salida+="\n"+this.refs.entidad.valor();
      salida+="\n"+this.refs.categoria.valor();
      console.log(salida);
    },
    onChange: function(control, valor){    	
    	
    	if(control ==="categoria" ){
        	var enParejas = (valor === "duatlon-parejas" )    	
    		this.setState({categoria:valor, enParejas:enParejas});   		
    	}
    	else if(control ==="anio" || control==="mes"){
    		var anio = this.refs.anio.valor();
    		var mes = this.refs.mes.valor();            
            this.setState({anio: anio, mes: mes});
            $('select').material_select(); // Esto es necesario para que materialize pueda refrescar los datos del combo
    	}
    	else{
    		var lista ={};
			lista[control] = valor;
			this.setState(lista);
    	}

    },
    render:function(){ 
    var num_dias = new Date(this.state.anio,this.state.mes,1,-1).getDate()   	                                
    var dias = this.llenarDias(num_dias);
	   var DIAS =<Combo  id="dia" claveSeleccionada={this.state.dia} ref="dia" tamanio={"input-field col l2 m4 s2"} claseIcono={"material-icons prefix"} icono={"cake"} titulo={"Dia"} textoIndicativo={"Nacimiento"} datosOpciones={dias} onChange={this.onChange} />

   	   return (
  			<Plantilla>
				<form className="col l12 m12 s12">
					<div className="row">
						<CajaTexto  icono={"account_circle"} titulo="Nombre(s)" ref="nombre"/>
						<CajaTexto titulo="Paterno" ref="paterno"/>
					</div>
					<div className="row">
	                    <CajaTexto titulo="Materno" ref="materno"/>	
					    <Combo  id="genero" ref="genero" claveSeleccionada={this.state.genero} tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"wc"} textoIndicativo={"Género"} datosOpciones={this.generos} onChange={this.onChange} />
					</div>
					<div className="row">
						{DIAS}
	                    <Combo  id="mes" claveSeleccionada={this.state.mes} ref="mes" tamanio={"input-field col l2 m4 s5"} titulo={"Mes"} datosOpciones={this.meses} onChange={this.onChange} />
	                    <Combo  id="anio" ref="anio" claveSeleccionada={this.state.anio} tamanio={"input-field col l2 m4 s5"} titulo={"Año"} datosOpciones={this.anios} onChange={this.onChange} />			
						<CajaTexto icono={"local_convenience_store"} titulo={"Código Postal"} ref="cp"/>
					</div>
					<div className="row">
                        <Combo  id="entidad" claveSeleccionada={this.state.entidad} ref="entidad" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"map"} textoIndicativo={"Entidad"} datosOpciones={this.estados} onChange={this.onChange}/>					
						<CajaTexto icono={"email"} titulo={"Email"} ref="email" />
					</div>
					<div className="row">
					    <CajaTexto icono={"phone"} titulo={"Teléfono"} ref="tel"/>
						<CajaTexto icono={"local_hospital"} titulo={"Alergías"} ref="alergia"/>
					</div>
					<div className="row">
					    <Combo id="categoria" claveSeleccionada={this.state.categoria}  ref="categoria" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"directions_bike"} textoIndicativo={"Categoría"} datosOpciones={this.categorias} onChange={this.onChange}/>					
						{this.state.enParejas ? <CajaTexto icono={"person_add"} titulo={"Nombre Ciclista"} ref="nomCiclista"/> : []}
					</div>
					<div className="row">
					    {this.state.enParejas ? <CajaTexto icono={"contact_mail"} titulo={"Email Ciclista"} ref="emailCiclista" /> : []}
					</div>
				</form>
		    </Plantilla>
   		)
   	 }  
   });
 
var Detalle =React.createClass({
	render:function(){
	 return(
		<Plantilla>
		  <div className="input-field col l6 m12 s12">
		  	<h1 className="row">Te registraste</h1>
		  </div>
		</Plantilla>
		)
	}
})


var NotFound =React.createClass({
	render:function(){
		return <h1>Not Found!</h1>
	}
})
/*
  Routes
*/
var routes=(
      <Router history={createBrowserHistory()}>
         <Route path="/" component={App}  />
         <Route path="/registro/:registroId" component={Detalle} />
         <Route path="*" component={NotFound}/>
      </Router>
	)


ReactDOM.render(routes,document.querySelector('#main'));
 