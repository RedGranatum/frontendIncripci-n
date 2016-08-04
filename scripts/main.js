var React = require('react');
var ReactDOM  = require('react-dom');
var ReactRouter= require('react-router');
var Router= ReactRouter.Router;
var Route= ReactRouter.Route;
var Navigation= ReactRouter.Navigation;
var History=ReactRouter.History;
var createBrowserHistory =require('history/lib/createBrowserHistory');
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
    render:function(){
   	   return (
            <div>
            	Hola mundo
            </div>
   		)
   	 }  
   });


/*
  Routes
*/
var routes=(
      <Router history={createBrowserHistory()}>
         <Route path="/" component={StorePicker}  />
         <Route path="/store/:storeId" component={App} />
         <Route path="*" component={NotFound}/>
      </Router>
	)


ReactDOM.render(routes,document.querySelector('#main'));
 