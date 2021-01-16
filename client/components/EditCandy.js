import React from 'react'
import AddCandyForm from './AddCandyForm'

const defaultState = {
  name: '',
  price: 0,
  imageUrl: '',
  description: ''
}

class EditCandy extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler(event) {
    event.preventDefault()
    this.props.updateCandy(this.props.singleCandy.id, this.state)
  }

  render() {
    return (
      <div>
        <AddCandyForm
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          candyValues={this.state}
          formTitle="Update Candy"
        />
      </div>
    )
  }
}

export default EditCandy
