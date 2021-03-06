import React from './react';
import ReactDOM from './react-dom';

// let element = React.createElement(
//   'h1',{className: 'title', style:{color: 'red'}},
//   React.createElement('span', null, 'hello'),
//   'world'
// )

// function FunctionComponent(props){
//   return (
//     <div className="title" style={{color: 'red'}}>
//       <span>{props.name}</span>
//       {props.children}
//     </div>
//   )
// }

class ClassComponent extends React.Component{
  render(){
    return (
      <div className="title" style={{color: 'red'}}>
        <span>{this.props.name}</span>
        {this.props.children}
      </div>
    )
  }
}
let element = <ClassComponent name="hello">world</ClassComponent>

ReactDOM.render(element,document.getElementById('root'))