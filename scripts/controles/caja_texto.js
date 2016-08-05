var React = require('react');

/*
  CajaTexto
*/  

module.exports = React.createClass({
	    getInitialState: function(){
       return{
   			claseError:""   			
       }    
    },


	getDefaultProps: function(){
	return{
		id:'icon_prefix',
		tipo_caja: 'text',
		expresion_reg: '*',
		requerido: true,
		}
	},
	esValido:function(){
		if(!this.refs.caja.validity.valid){
			this.setState({claseError:"invalid"})
			return false;
		}
		else{
			this.setState({claseError:""})			
		}
		return true;
	},
	valor:function(){
            return this.refs.caja.value;
	},
	render:function(){
		var claseCaja = "validate " + this.state.claseError;
		var claseEtiqueta = (this.state.claseError === "") ? '' : 'active';
		

       return (

			    <div className="input-field col l6 m12 s12">
					<i className="material-icons prefix">{this.props.icono}</i>
					<input id={this.props.id} 
						   type={this.props.tipo_caja} 
						   ref="caja" 
						   className={claseCaja} 
						   required={true} aria-required="true"
						   pattern={this.props.expresion_reg} />

					<label htmlFor={this.props.id} 
					       className={claseEtiqueta} 
					       data-error="Error" 
					       data-success="Ok">{this.props.titulo}</label>
			    </div>
       	      )		
	}
}); 
