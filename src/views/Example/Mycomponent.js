import React from 'react';
// import ParentComponent from './Nesting_Class_component.js';
import AddComponent  from './AddComponent.js';
import ParentComponent from './Nesting_Components.js';
class Mycomponent extends React.Component {

   state = {
    array : [
      { id: '111', title: 'developer', salary:'500$'},
      { id: '222', title: 'tester', salary:'400$'},
      { id: '333', title: 'managers', salary:'1000$'}
    ]
  };

  handleOnChange = (event) => {
    this.setState({
      name : event.target.value
    })
  } 

  handleOnKeyDown = (event) => {
    if(event.key === 'Enter'){
      alert("nop thanh cong ")
    }
  }

  
  addNewJob = (job) => {
    this.setState(prevState => ({
      array: [...prevState.array, job]
  }));
  
  }

  
    render() {
      return (
       <>
       {/* <AddComponent addNewJob={this.addNewJob}/>
       <div className='Third'>
        <ParentComponent array={this.state.array}/>
       </div> */}
       <ParentComponent/>
       </>
      )
    }
  }

export default Mycomponent;

