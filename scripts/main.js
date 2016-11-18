var React = require('react');
var ReactDOM  = require('react-dom');
var ReactRouter= require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Router= ReactRouter.Router;
var Route= ReactRouter.Route;
var Navigation= ReactRouter.Navigation;
var History=ReactRouter.History;
var createBrowserHistory =require('history/lib/createBrowserHistory');

var Coleccion = require('./modelos/colecciones.js')
var Modelo = require('./modelos/modelos.js')
var CMunicipios = require('./modelos/municipios.js')

var Datos = require('./datos')

var Plantilla = require('./controles/plantilla')
var CajaTexto = require('./controles/caja_texto');
var Combo = require('./controles/combo');

var generarPDF = require('./librerias/generarPDF.js')

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
    mixins : [History],
    
    getInitialState: function(){
       return{
       	  genero: "m",
       	  entidad: "Chiaps",
          municipio: "nueva",
          municipios: {},
          anio: 1997,
          mes: 1,
          dia:1,
          enParejas:false,
          categoria: "duatlon-completo",
          errores: "",
       }    
    },
    componentWillMount: function(){
        this.anios = this.obtenerAnios();
        this.meses = Datos().Meses();            
        this.categorias = Datos().Categorias();
        this.generos = Datos().Generos();
        this.estados = Datos().Estados();
        this.buscarMunicipiosPorEstado(this.state.entidad);
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
      var self = this;
      if(this.state.enParejas ){
        this.buscarAdultoPorEmail(self.refs.emailCiclista.valor(),self.guardar)
      }
      else{
        this.guardar();
      }
    },
    guardar:function(){
      
      var esValido =  this.refs.paterno.esValido() &  this.refs.materno.esValido() 
                  &  this.refs.nombre.esValido() /*& this.refs.cp.esValido()*/
                    & this.refs.email.esValido() & this.refs.tel.esValido() ;

     if(this.state.enParejas){
       esValido = esValido & this.refs.nomCiclista.esValido() // &  this.refs.emailCiclista.esValido() 
     }

      if(!esValido){       
        return;
      }
      var self = this;
      var nomCiclista=this.state.enParejas ? this.refs.nomCiclista.valor() : ".";
      var emailCiclista=this.state.enParejas ? this.refs.emailCiclista.valor() : ".";
      var nuevo= {
        "paterno": this.refs.paterno.valor(),
        "materno": this.refs.materno.valor(),
        "nombre": this.refs.nombre.valor(),
        "dia": this.refs.dia.valor(),
        "mes": this.refs.mes.valor(),
        "anio": this.refs.anio.valor(),
        "genero": this.refs.genero.valor(),
        //"cp": this.refs.cp.valor(),
        "estado": this.refs.entidad.valor(),
        "email": this.refs.email.valor(),
        "telefono": this.refs.tel.valor(),
        "alergia": this.refs.alergia.valor(),
        "duatlon": this.refs.categoria.valor(),
        "ciclista": nomCiclista,
        "email_ciclista": emailCiclista,
        "municipio": this.refs.municipio.valor(),
      }
    var mod = new Modelo();
     mod.Guardar(nuevo,
          function(data){
                console.log("guardado los datos")
                self.setState({errores:""})
               // self.llenarDetalles(data.id)
                self.history.pushState(null, '/' + data.id );
              },
          function(model,response,options){
            console.log("con error")
                self.setState({errores:response.responseText})
                console.log(response.responseText);
              }
      );

    },
 llenarDetalles: function(id){
     this.datos = {}
     var self = this;

     var col = new Coleccion();
     col.id = id;
     console.log("Buscando infomacion del id: " + col.id )
     col.funcionBusqueda(function(data){
                 
               // self.state.detalles = data;
                //self.setState({nombre:data.nombre, detalles: self.state.detalles})
                console.log(data);
                console.log("guardado datos")
              },
          function(model,response,options){
                console.log("errores al cargar el detalle");
              });
  },
    onChange: function(control, valor){    	
    	
    	if(control ==="categoria" ){
        	var enParejas = (valor === "infantil" )    	
    		this.setState({categoria:valor, enParejas:enParejas});   		
    	}
    	else if(control ==="anio" || control==="mes" || control==="dia"){
    		var anio = this.refs.anio.valor();
    		var mes = this.refs.mes.valor();  
        var dia = this.refs.dia.valor();          
            this.setState({anio: anio, mes: mes,dia:dia});
            $('select').material_select(); // Esto es necesario para que materialize pueda refrescar los datos del combo
    	}
      else if(control ==="entidad"){
        this.setState({entidad: valor});
        this.buscarMunicipiosPorEstado(valor);
        console.log("cambio a " + valor);
      }
      else if(control ==="municipio"){
         this.setState({municipio: valor});
      }
    	else{
    		var lista ={};
			lista[control] = valor;
			this.setState(lista);
    	}

    },
onBlur: function(columna,valor){
  if(columna==="emailCiclista"){
        this.buscarAdultoPorEmail(valor);
  }
},
buscarAdultoPorEmail: function(valor,funcion_guardar){
      var self = this;
      var buscarAdulto = new Coleccion();
      buscarAdulto.email = valor;
      buscarAdulto.funcionBusqueda(
        function(data){
            var nombre = data[0] === undefined ? "" : data[0].nombre + ' ' + data[0].paterno + ' ' + data[0].materno;
            self.refs.nomCiclista.asignarValor(nombre);
            if(funcion_guardar!==undefined){
              funcion_guardar();
            }
        },
          function(model,response,options){
            self.refs.nomCiclista.asignarValor("")
            self.setState({errores:"Es necesario el email de un Adulto ya registrado"})
        });
},
buscarMunicipiosPorEstado: function(estado){
      var self = this;
      var buscarMunicipio = new CMunicipios();
      buscarMunicipio.estado = estado;
      buscarMunicipio.funcionBusqueda(
        function(data){
          //var municipios =  Datos().Municipios();
          var municipios ={}
          for(var x in data){
            municipios[data[x].id] = data[x].municipio;
          }
          self.setState({municipios:municipios});
           $('select').material_select();
        },
          function(model,response,options){
            // self.refs.nomCiclista.asignarValor("")
            // self.setState({errores:"Es necesario el email de un Adulto ya registrado"})
        });

},
    render:function(){ 
    var num_dias = new Date(this.state.anio,this.state.mes,1,-1).getDate()   	                                
    var dias = this.llenarDias(num_dias);
	   var DIAS =<Combo  id="dia" claveSeleccionada={this.state.dia} ref="dia" tamanio={"input-field col l2 m4 s2"} claseIcono={"material-icons prefix"} icono={"cake"} titulo={"Dia"} textoIndicativo={"Nacimiento"} datosOpciones={dias} onChange={this.onChange} />
     var MUNICIPIOS =  <Combo  id="municipio"  claveSeleccionada={this.state.municipio} ref="municipio" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"map"} textoIndicativo={"Municipio"} datosOpciones={this.state.municipios} onChange={this.onChange} />          
          
   	   return (
  			<div>        
        <form className="col l12 m12 s12">
					<div className="row">
						<CajaTexto id="nombre"  expresion_reg="[ñÑa-zA-Z\s]{2,15}" icono={"account_circle"} titulo="Nombre(s)" ref="nombre"/>
						<CajaTexto id="paterno" expresion_reg="[ñÑa-zA-Z\s]{2,15}" titulo="Apellido Paterno" ref="paterno"/>
					</div>
					<div className="row">
	           <CajaTexto id="materno" expresion_reg="[ñÑa-zA-Z\s]{2,15}" titulo="Apellido Materno" ref="materno"/>	
					    <Combo  id="genero" ref="genero" claveSeleccionada={this.state.genero} tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"wc"} textoIndicativo={"Carreras Confirmadas"} datosOpciones={this.generos} onChange={this.onChange} />          
          </div>
					<div className="row">
						{DIAS}
	           <Combo  id="mes" claveSeleccionada={this.state.mes} ref="mes" tamanio={"input-field col l2 m4 s5"} titulo={"Mes"} datosOpciones={this.meses} onChange={this.onChange} />
	           <Combo  id="anio" ref="anio" claveSeleccionada={this.state.anio} tamanio={"input-field col l2 m4 s5"} titulo={"Año"} datosOpciones={this.anios} onChange={this.onChange} />			
             <Combo  id="entidad"  claveSeleccionada={this.state.entidad} ref="entidad" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"map"} textoIndicativo={"Entidad"} datosOpciones={this.estados} onChange={this.onChange}/>					
            {/*<CajaTexto id="cp" expresion_reg="[0-9\-().\s]{1,10}" icono={"local_convenience_store"} titulo={"Código Postal"} ref="cp"/>*/}
          </div>
          <div className="row">
            {MUNICIPIOS}
          
          	<CajaTexto id="email" icono={"email"} titulo={"Email"} ref="email"  tipo_caja="email" requerido={false} />
					</div>
					<div className="row">
					    <CajaTexto id="tel"  expresion_reg="[0-9\-().\s]{1,15}" icono={"phone"} titulo={"Teléfono"} ref="tel"/>
						  <CajaTexto id="alergias" expresion_reg="[ñÑa-zA-Z\s]{0,50}" icono={"local_hospital"} titulo={"Alergias y/o Condición Médica a Considerar (ej. diabetes, hipertensión, …)"} ref="alergia"/>
					</div>
					<div className="row">
					    <Combo id="categoria" claveSeleccionada={this.state.categoria}  ref="categoria" tamanio={"input-field col l6 m12 s12"} claseIcono={"material-icons prefix"} icono={"directions_bike"} textoIndicativo={"Categoría"} datosOpciones={this.categorias} onChange={this.onChange}/>					
						{this.state.enParejas ? <CajaTexto id="nomCiclista"  expresion_reg="[ñÑa-zA-Z\s]{2,50}" icono={"person_add"} titulo={"Adulto Responsable (El nombre se obtendra del email del responsable"} solo_lectura={true} ref="nomCiclista"/> : []}
					</div>
					<div className="row">
					    {this.state.enParejas ? <CajaTexto id="emailCiclista" tipo_caja="email" icono={"contact_mail"} titulo={"Email Responsable"} ref="emailCiclista" requerido={false} onBlur={this.onBlur} /> : []}
					</div>
          <div className="row">
            {this.state.errores}
          </div>
        <div className="row center-align" onClick={this.registrar}>
          <a className="waves-effect waves-light btn-large color orange"><i className="material-icons left">done</i>Registrar</a>
        </div>
        
				</form>
          </div>
        
	 		)
   	 }  
   });
 
var Detalle =React.createClass({
    getInitialState: function(){
       return{
          detalles: {},
          nombre: '',
       }    
    },
  componentDidMount: function(){
     console.log("Montado del id: " + this.props.params.id );
    this.llenarDetalles();
  },

  generarPDF: function(){
      var generar = new generarPDF();

      var nombre = this.state.detalles.nombre + ' ' + this.state.detalles.paterno + ' ' + this.state.detalles.materno;
      var registro = this.state.detalles.id.toString();
      generar.nombre = nombre;
      generar.num_participante = registro;
      generar.genero = this.state.detalles.genero;
      generar.generaPDF();
      console.log("generando pdf");
  },
  llenarDetalles: function(){
     this.datos = {}
     var self = this;

     var col = new Coleccion();
     col.id = this.props.params.id;
     self.setState({nombre:''});
     console.log("Buscando infomacion del id: " + col.id )
     col.funcionBusqueda(function(data){
                 
                self.state.detalles = data;
                self.setState({nombre:data.nombre, detalles: self.state.detalles})
                console.log(data);
                console.log("guardado datos")
              },
          function(model,response,options){
            self.setState({nombre:'',detalles: {}})
                console.log(response.responseText);
              });
  },
	render:function(){
    console.log("1--***" + this.state.detalles.nombre)
    console.log("2-****" + this.state.nombre)
    
    if(this.state.nombre === ''){
      return(
         <div className="input-field col l12 m12 s12">
        <h4 className="row">..Cargando datos..</h4>
      </div>
        )
    }
    var nombre = this.state.detalles.nombre + ' ' + this.state.detalles.paterno + ' ' + this.state.detalles.materno;
    var registro = "Num.Registro: " + this.state.detalles.id;
    var listaGeneros = Datos().Generos();
    var genero = listaGeneros[this.state.detalles.genero];
    var listaDuatlon =  this.categorias = Datos().Categorias();
    var duatlon =  listaDuatlon[this.state.detalles.duatlon];
    var ciclista = (this.state.detalles.duatlon === "duatlon-completo") ? '' : "Responsable: "  + this.state.detalles.ciclista;
	 return(
      <div className="input-field col l12 m12 s12">
        <h5 className="row">{registro}</h5>
		  	<h5 className="row">{nombre}</h5>
		    <h5 className="row">{genero}</h5>
        <h5 className="row">{duatlon}</h5>
        <h5 className="row">{ciclista}</h5>
        <button onClick={this.generarPDF}>Imprimir</button>
        <iframe id="impresion_registro" className="preview-pane" type="application/pdf" width="100%" height="750" frameBorder="0"  style={{position:'relative'}} >
        </iframe>
      </div>
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


// var routes=(
//       <Router history={createBrowserHistory()}>
//          <Route path="/" component={App}  />
//          <Route path="/registro/:registroId" component={Detalle} />
//          <Route path="*" component={NotFound}/>
//       </Router>
// 	)

var history = createBrowserHistory();

var routes = (
  <Router history={history}>
    <Route path='/' component={Plantilla}>
      <IndexRoute component={App} />
      <Route path=':id' component={Detalle} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);




ReactDOM.render(routes,document.querySelector('#main'));
 