import React  from "react";

class AddComponent extends React.Component {

    state = {
        nameDetails: {
            title: "",
            salary: "",
        },
    
    }

    handleOnChange_TitleJobs = (event) => {
        this.setState((prevState) => ({
          nameDetails: {
              ...prevState.nameDetails,
              title: event.target.value,
          },
      }));
      }
    
    handleOnChange_Salary = (event) => {
        this.setState((prevState) => ({
          nameDetails: {
              ...prevState.nameDetails,
              salary: event.target.value,
          },
      }));
    }

    handleOnChange_class = (event) => {

    } 
    
    cancel_reload = (event) => {
        event.preventDefault()
        this.props.addNewJob({
            id : Math.floor(Math.random() * 1001),
            title : this.state.nameDetails.title,
            salary : this.state.nameDetails.salary
        })
        // this.props.Thuyan()  /// truy tu 1 function tu function component sang  class component
    }
    
   render (){
    return (
        <>
       <div className='fourth'>
       <form >
        <label htmlFor="email">Job's Title</label> <br/>
        <input type="email" id="email" name="email" value={this.state.nameDetails.title} onChange={(event)=> this.handleOnChange_TitleJobs(event)} /> <br/>
        <label htmlFor="email">Salary</label> <br/>
        <input type="email" id="email" name="email" value={this.state.nameDetails.salary} onChange={(event)=> this.handleOnChange_Salary(event)} /> <br/>
        <button type="button" onClick={(event)=> this.cancel_reload(event)}>Submit</button>
        
      </form>
       </div>
        </>
    )
   }
}

export default AddComponent;