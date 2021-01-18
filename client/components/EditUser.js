import React from 'react'
import AddUserForm from './AddUserForm'

const defaultState = {
  email: '',
  password: '',
}

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitHandler(event) {
    event.preventDefault()
    this.props.updateUser(this.props.singleUser.id, this.state)
  }

  render() {
    return (
      <div>
        <AddUserForm
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          userValues={this.state}
          formTitle="Update User"
        />
      </div>
    )
  }
}

export default EditUser
