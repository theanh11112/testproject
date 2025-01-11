import React ,{Component} from "react";


class ChildComponent extends Component {
    render(){
        return <p>This is a ChildComponent. Your name is {this.props.name}</p>
    }
}


class ParentComponent extends Component {
    state = {
        showJobs : false
    }

    handleShowHide = () => {
        this.setState ({
            showJobs : !this.state.showJobs
        })
    } 
    render (){
        let { array } = this.props;
        let { showJobs } = this.state;
        let  check  = showJobs === true ? 'showJobs === true' : 'showJobs === false'  ;
        return (
            <>
                {showJobs === false ?
                    <>
                    <button onClick={() =>{this.handleShowHide()}}>Show</button>
                   </>
                :
                    <div>
                    <div className="Job_List">{
                        array.map((item,index)=>{
                            return (
                                <div key={item.id}>
                                {item.title} - {item.salary} 
                                </div>
                            )
                        })
                    }</div>
                    <div> <button onClick={() =>{this.handleShowHide()}}>Hide</button></div>
                   </div>
                }
            </>
        )
    }
}

export default ParentComponent ;