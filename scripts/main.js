var React = require('react');
var ReactDOM  = require('react-dom');
var ReactRouter= require('react-router');
var Router= ReactRouter.Router;
var Route= ReactRouter.Route;
var Navigation= ReactRouter.Navigation;
var History=ReactRouter.History;
var createBrowserHistory =require('history/lib/createBrowserHistory');


var dias=[{valor:1,titulo:1},{valor:2,titulo:2}]
var meses=[{valor:1,titulo:1},{valor:2,titulo:2}]
var anios=[{valor:1,titulo:"1950"},{valor:2,titulo:"1951"}]
var generos=[{valor:"femenino",titulo:"Femenino"},{valor:"masculino",titulo:"Masculino"}]
var entidades=[{valor:"cdmx",titulo:"Ciudad de México"},{valor:"edomex",titulo:"Estado de México"}]
var categorias=[{valor:"duatlon-completo",titulo:"Duatlón-Completo"},{valor:"duatlon-parejas",titulo:"Duatlón-Parejas"}]
/*
  App
*/  



   var App=React.createClass({
    // getInitialState: function(){
    //     return{
    //       fishes:{},
    //       order: {}
    //     }    
    // },
    registrar:function(){
      
      var salida="";
      salida+="\n"+this.refs.nombre.valor();
      salida+="\n"+this.refs.paterno.valor();
      salida+="\n"+this.refs.materno.valor();
      salida+="\n"+this.refs.cp.valor();
      salida+="\n"+this.refs.email.valor();
      salida+="\n"+this.refs.tel.valor();
      salida+="\n"+this.refs.alergia.valor();
      salida+="\n"+this.refs.nomCiclista.valor();
      salida+="\n"+this.refs.emailCiclista.valor();
      salida+="\n"+this.refs.dia.valor();
      salida+="\n"+this.refs.mes.valor();
      salida+="\n"+this.refs.anio.valor();
      salida+="\n"+this.refs.genero.valor();
      salida+="\n"+this.refs.entidad.valor();
      salida+="\n"+this.refs.categoria.valor();
      console.log(salida);
    },
    render:function(){
    	
    	
   	   return (
   	   	<div>
          <div className="row">
			<span className="titulo_ficha">Incripción de competidor individual.</span>
		  </div>
		  	<div className="row">
			<div className="col l8 m6 s12 card-panel grey lighten-3 z-depth-5">
				<form className="col l12 m12 s12">
					<div className="row">
						<CajaTexto  icono={"account_circle"} titulo="Nombre(s)" ref="nombre"/>
						<CajaTexto titulo="Paterno" ref="paterno"/>
					</div>
					<div className="row">
	                    <CajaTexto titulo="Materno" ref="materno"/>	
	                    <Combo ref="dia" tamanio={"input-field col l2 m4 s4"} claseIcono={"material-icons prefix"} icono={"cake"} titulo={"Dia"} textoIndicativo={"Nacimiento"} datosOpciones={dias}/>
	                    <Combo ref="mes" tamanio={"input-field col l2 m4 s4"} titulo={"Mes"} datosOpciones={meses}/>
	                    <Combo ref="anio" tamanio={"input-field col l2 m4 s4"} titulo={"Año"} datosOpciones={anios}/>			
					</div>
					<div className="row">
					    <Combo ref="genero" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"wc"} textoIndicativo={"Género"} datosOpciones={generos}/>
						<CajaTexto icono={"local_convenience_store"} titulo={"Código Postal"} ref="cp"/>
					</div>
					<div className="row">
                        <Combo ref="entidad" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"map"} textoIndicativo={"Entidad"} datosOpciones={entidades}/>					
						<CajaTexto icono={"email"} titulo={"Email"} ref="email" />
					</div>
					<div className="row">
					    <CajaTexto icono={"phone"} titulo={"Teléfono"} ref="tel"/>
						<CajaTexto icono={"local_hospital"} titulo={"Alergías"} ref="alergia"/>
					</div>
					<div className="row">
					    <Combo ref="categoria" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"directions_bike"} textoIndicativo={"Categoría"} datosOpciones={categorias}/>					
						<CajaTexto icono={"person_add"} titulo={"Nombre Ciclista"} ref="nomCiclista"/>
					</div>
					<div className="row">
					    <CajaTexto icono={"contact_mail"} titulo={"Email Ciclista"} ref="emailCiclista" />
					</div>
				</form>
			</div>
			<div className="col l1 m1 s12">
			</div>
			<div className="col l3 m5 s12 center-align">
				<div className="row">
					<img className="responsive-img" src="images/Logo-MAYO.png" width="125px" height="125px"/>
				</div>
				<div className="row">
					<span className="otra-informacion">Carrera:</span>
					<br/>
					<span className="otra-informacion-i">15, Septiembre 2016</span>
					<br/>
					<span className="otra-informacion">Conferencia:</span>
					<br/>
					<span className="otra-informacion-i">05, Agosto 2016</span>
				</div>
				<div className="row">
					<a className="waves-effect waves-light btn-large color orange" onClick={this.registrar}><i className="material-icons left">done</i>Registrar</a>
				</div>
			</div>
		</div>
     </div>
   		)
   	 }  
   });
 
var CajaTexto=React.createClass({
	valor:function(){
            return this.refs.caja.value;
	},
	render:function(){
       return (

			    <div className="input-field col l6 m12 s12">
					<i className="material-icons prefix">{this.props.icono}</i>
					<input id="icon_prefix" type="text" ref="caja" className="validate" />
					<label htmlFor="icon_prefix">{this.props.titulo}</label>
			    </div>
       	      )		
	}
});

var Combo=React.createClass({
	getDefaultProps: function(){
	return{
		claveSeleccionada: 2,
		}
	},
	getInitialState: function() {
         return {
             value: 'select'
         }
     },
  componentDidMount() {
     $(ReactDOM.findDOMNode(this.refs.combo)).on('change',this.onChange);
   },
     componentWillUnmount() {
     $(ReactDOM.findDOMNode(this.refs.combo)).off('change',this.onChange);
   },
   onChange(e) {
    console.log("cambio")
    console.log(e.target.value);
  },
	valor:function(){
            return this.refs.combo.value;
	},
	getDias:function(dia){
			return(
			    <option key={dia.valor} value={dia.valor}>{dia.titulo}</option>
			)

			//	return <Opcion key={this.props.valor} valor={dia.valor} titulo={dia.titulo}/>	
			},	
	render: function(){
		return(
                <div className={this.props.tamanio} >
					<i className={this.props.claseIcono}>{this.props.icono}</i>
					<select ref="combo"  value={this.props.claveSeleccionada}  >
						{this.props.datosOpciones.map(this.getDias)}
					</select>
					<label htmlFor="icon_prefix">{this.props.textoIndicativo}</label>
				</div>

    		)
    }



});

var Opcion=React.createClass({
	render:function(){
		return(
                 <option  value={this.props.valor}>{this.props.titulo}</option>
			  )
	}
});



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
         <Route path="/store/:storeId" component={App} />
         <Route path="*" component={NotFound}/>
      </Router>
	)


ReactDOM.render(routes,document.querySelector('#main'));
 