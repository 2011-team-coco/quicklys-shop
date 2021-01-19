import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, createUser, destroyUser} from '../redux/users'
import {Link} from 'react-router-dom'
import AddUserForm from './AddUserForm'

const defaultState = {
  email: '',
  isAdmin: false,
}

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitHandler(event) {
    event.preventDefault()
    this.props.addUser(this.state)
    this.setState(defaultState)
  }

  deleteHandler(event) {
    event.preventDefault()
    const userId = Number(event.target.getAttribute('userid'))
    this.props.deleteUser(userId)
  }

  render() {
    const isThereUsers = this.props.users.length

    return (
      <div>
        <div>
          <h1>All Users View</h1>
        </div>
        <AddUserForm
          formTitle="Create User"
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          userValues={this.state}
        />
        {isThereUsers && (
          <div className="flex">
            {this.props.users.map((user) => (
              <ul key={user.id}>
                <main>
                  <h4>User Information</h4>
                  <Link to={`/users/${user.id}`}>
                    <h4>Email: {user.email}</h4>
                    <h4>ID: {user.id}</h4>
                    <h4>IsAdmin: {user.isAdmin.toString()}</h4>
                  </Link>
                  <button userid={user.id} onClick={this.deleteHandler}>
                    Delete
                  </button>
                </main>
              </ul>
            ))}
          </div>
        )}

        <div>
          {isThereUsers === undefined && (
            <p> Sorry ... Unauthorized User - MUST BE ADMIN </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {users: state.users}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    addUser: (user) => dispatch(createUser(user)),
    deleteUser: (userId) => dispatch(destroyUser(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
