import React, {Component} from 'react';
import axios from 'axios';
import UserList from './UserList';

class UserDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            username: '',
            edit: false
        }
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers = () => {
        axios.get('/api/users').then(res => {
            this.setState({
                users: res.data
            })
        })
        .catch(err => console.log(err))
    }

    handleInput = (val) => {
        this.setState({
            username: val
        })
    }

    addUser = () => {
        const newUser = {
            name: this.state.username
        }

        axios.post('/api/user', newUser).then(res => {
            this.setState({
                users: res.data
            })
        })
        .catch(err => console.log(err))
    }

    updateUser = (data) => {
        this.setState({
            users: data
        })
    }

    deleteUser = () => {

    }

    render(){
        const mappedUsers = this.state.users.map((user, i) => {
            return(
                <UserList
                    key={i}
                    user={user}
                    updateUser={this.updateUser}
                    getUsers={this.getUsers} />
            )
        })
        return(
            <div>
                <label>Add Username</label>
                <input
                    value={this.state.username}
                    onChange={(e) => this.handleInput(e.target.value)}/>
                <button onClick={this.addUser}>Submit</button>
                <ul>
                    {mappedUsers}
                </ul>
            </div>
        )
    }
};

export default UserDisplay;