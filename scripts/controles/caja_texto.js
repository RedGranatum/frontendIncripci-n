var React = require('react');

/*
  CajaTexto
*/  

module.exports = React.createClass({
	valor:function(){
            return this.refs.caja.value;
	},
	render:function(){
       return (

			    <div className="input-field col l6 m12 s12">
					<i className="material-icons prefix">{this.props.icono}</i>
					<input id="icon_prefix" type="text" ref="caja" className="validate" />
					<label htmlFor="icon_prefix">{this.props.titulo} </label>
			    </div>
       	      )		
	}
});
 