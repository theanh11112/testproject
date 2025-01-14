import React from "react";
import './ListTodo.scss';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class ListTodo extends React.Component{
    
    state = {
        listTodo : [
            {id: 100, title: 'Doing Homework', save: false},
            {id: 101, title: 'Making video', save: false},
            {id: 102, title: 'Creat content', save: false}
        ],
        Input : '',
         
        InputUpdate : '',
    }
   handleOnchangeInput = (event) => {
      this.setState({
        Input : event.target.value
      })
   }
   handleOnchangeInputUpdate = (event) => {
    this.setState({
      InputUpdate : event.target.value
    })
    }
    AddNewList = () => {
        if(this.state.Input){
        this.setState(prevState => ({
            listTodo: [...prevState.listTodo,
                {id: Math.floor(Math.random() * 1001),
                 title: this.state.Input}
            ]
          })); 
           toast.success("  Wow so easy!");
        }
        else {
            toast.error("  Missing Title's Todo");
        }
    }

    DeleteList = (job) => {
        let currentState = this.state.listTodo;
        currentState = currentState.filter(item => item.id !== job.id)
        this.setState({
            listTodo : currentState 
        })
        toast.info("Todo has been deleted!");
    }

    handleEdit = (job) => {
        this.setState ((prevState) => {
            const updatedListTodo = prevState.listTodo.map((item) => {
              return  item.id === job.id ? {...item, save : true } : {...item, save : false }
        })
            return {listTodo : updatedListTodo,
                     InputUpdate :  job.title}
        })
    }
    handleSave = (job) => {
        this.setState ((prevState) => {
            const updatedListTodo = prevState.listTodo.map((item) => {
              return  item.id === job.id ? {...item, title: prevState.InputUpdate , save : false } : item 
        }) 
            return {listTodo : updatedListTodo}
        })
    }

    render(){
        let listTodo = this.state.listTodo;
        let save = this.state.Save;
        
        return (
            <div className="list-todo-container">
                <div className="add-todo">
                    <input type="text" value={this.state.Input} onChange={(event) => this.handleOnchangeInput(event)}/> <></>
                    <button type="button" onClick={() => this.AddNewList()}>Add</button>
                </div>
                <div className="list_todo-content">
                {listTodo && listTodo.length > 0 && 
                listTodo.map((item, index) => {
                    return (
                        <div className="Todo-child" key={item.id}>
                         {item.save === false ?
                          <>
                          <span> {index + 1} - {item.title}</span> <></>
                          <button onClick={() => this.handleEdit(item)}> Edit </button> <></>
                          </>
                          :
                          <>
                          
                          <span>{index + 1} -</span>
                          <input type="text" value={this.state.InputUpdate} onChange={(event) => this.handleOnchangeInputUpdate(event)}/> <></>
                          <button onClick={() => this.handleSave(item)}> Save </button> <></>
                          
                          </>
                         }
                         <button onClick={() => this.DeleteList(item)}> Delete </button> 
                        </div>
                    )
                })}
               
                </div>
            </div>
        )
    }
}

export default ListTodo;