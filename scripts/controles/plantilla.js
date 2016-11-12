var React = require('react');

/*
  Plantilla
*/  

module.exports = React.createClass({

	render:function(){
       return (
    <div className="container">
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
				<div className="row">
					<img className="responsive-img" src="images/CodificaSoluciones.png" />
				</div>
				<br />
				<div className="row">
					<img className="responsive-img" src="./build/images/corredor.jpg" width="280px" height="120px" />
				</div>
				<div className="row">
					<span className="otra-informacion">Carrera:</span>
					<br />
					<span className="otra-informacion-i">18, Septiembre 2016</span>
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
 