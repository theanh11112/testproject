import React from 'react';


class Mycomponent extends React.Component {

   state = {
    personalInfo: {
      name: "An",
      age: 30,
      email: "john.doe@example.com",
    },
    nameDetails: {
      first_name: "",
      last_name: "",
    },
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

  
  handleOnChange_fistname = (event) => {
    this.setState({
      first_name : event.target.value
    })
  }

  handleOnClick = (event) => {
    alert("ban da click vao button ")
  }
  cancel_reload = (event) => {
    event.preventDefault()
    alert("123")
  }
    render() {
      console.log("Call render : ",this.state)
      return (
       <>
       <div className='First'>
            <p>Hello my component , My name is  {this.state.name}</p>
       </div>

       <div className='Second'>
        <input value={this.state.name} 
        type='text' 
        onChange={(event)=>this.handleOnChange(event)}
        onKeyDown={(event)=>this.handleOnKeyDown(event)}
        /> 
       </div>

       

       <div className='Third'>
           <button onClick={(event)=> this.handleOnClick(event)}> Yeu an</button>
       </div>

       <div className='fourth'>
       <form >
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={this.state.first_name} onChange={(event)=> this.handleOnChange_fistname(event)} />
        <button type="button" onClick={(event)=> this.cancel_reload(event)}>Submit</button>
      </form>
       </div>
       </>
      )
    }
  }

export default Mycomponent;

