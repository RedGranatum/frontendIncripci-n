var React = require('react');
var ReactDOM  = require('react-dom');
/*
  Combo
*/  


module.exports = React.createClass({
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
    this.props.onChange(this.props.id,e.target.value);
  },
	valor:function(){
            return this.refs.combo.value;
	},
	llenarOpciones:function(key){
			return(
			    <option key={key} value={key}>{this.props.datosOpciones[key]}</option>
			)
		},	
	render: function(){
		var OPCIONES = Object.keys(this.props.datosOpciones).map(this.llenarOpciones);
		return(
                <div className={this.props.tamanio} >
					<i className={this.props.claseIcono}>{this.props.icono}</i>
					<select ref="combo"  value={this.props.claveSeleccionada}  >
					    {OPCIONES}			
					</select>
					<label htmlFor="icon_prefix">{this.props.textoIndicativo}</label>
				</div>

    		)
    }



});