import React from 'react';


class Mycomponent extends React.Component {

  state = {
    name: "An",
    age: 30,
    email: "john.doe@example.com",
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

  handleOnClick = (event) => {
    alert("ban da click vao button ")
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
       <form action="/submit" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"/>
      <button type="submit">Submit</button>
      </form>
       </div>
       </>
      )
    }
  }

export default Mycomponent;

