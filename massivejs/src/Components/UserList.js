import React, {Component} from 'react';
import axios from 'axios';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateInput: '',
            edit: false
        }
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleInput = (val) => {
        this.setState({
            updateInput: val
        })
    }

    handleSubmit = () => {
        const updatedUser = {
            name: this.state.updateInput
        }

        axios.put(`/api/user/${this.props.user.user_id}`, updatedUser)
        .then(res => {
            this.props.updateUser(res.data)
        })
        this.toggleEdit()
    }

    handleDelete = () => {
        axios.delete(`/api/user/${this.props.user.user_id}`)
        .then(res => {
            this.props.getUsers()
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                {!this.state.edit
                ? (<>
                    <li>{this.props.user.name}</li>
                    <button onClick={this.toggleEdit}>Edit</button>
                    <button onClick={this.handleDelete}>Delete</button>
                   </>)
                : (
                    <>
                        <input 
                            value={this.state.updateInput}
                            onChange={(e) => this.handleInput(e.target.value)}/>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </>
                )}
            </div>
        )
    }
}

export default UserList;