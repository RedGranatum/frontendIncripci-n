var React = require('react');
var ReactRouter= require('react-router');
var IndexLink = ReactRouter.IndexLink;

/*
  Plantilla
*/  

module.exports = React.createClass({
	render:function(){
       return (
    <div className="container">
		<div className="row valign-wrapper">
			<IndexLink to="/">Inscribir otro competidor</IndexLink>			
		</div>
		<div className="row valign-wrapper">
			<span className="titulo_ficha">Inscripción de Competidor</span>
		</div>
		
		<div className="row">
			<div className="col l8 m6 s12 card-panel grey lighten-3 z-depth-5">
				{this.props.children}
			</div>
			<div className="col l1 m1 s12">  
			</div>
			<div className="col l3 m5 s12 center-align">
				<div class="row">
					<img class="responsive-img" src="images/talento.png" width="280px" />
				</div>
				<br />
				<div className="row">
					<img className="responsive-img" src="images/CodificaSoluciones.png" />
				</div>
				<br />
				<div className="row">
				</div>
				<div className="row">
					<span className="otra-informacion">Informes:</span>
					<br />
					<span className="otra-informacion-i">contacto@quierocorrer.com.mx</span>
					<br />
					<span className="otra-informacion-i">contacto@formatalento.com</span>
					<br />
					<br />
					<span className="color orange ">¿Vas a apoyar a los corredores?</span>
					<br />
					<span className="otra-informacion-i">Manda un correo a contacto@formatalento.com con tu nombre y teléfono, para la rifa de los cursos de Microsoft Excel.</span>


				</div>
				<br />
				<div className="row">
					<img className="responsive-img" src="images/icono.jpg" width="75px" height="100px" />
				</div>
			</div>
		</div>
	</div>

       	      )		
	}
});
 