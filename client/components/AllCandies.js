import React from 'react'
import {connect} from 'react-redux'
import {fetchCandies, createCandy, destroyCandy} from '../redux/candies'
import {fetchUsers} from '../redux/users'

import {Link} from 'react-router-dom'
import AddCandyForm from './AddCandyForm'

const defaultState = {
  name: '',
  price: 0,
  imageUrl: '',
  quantity: 1,
}

export class AllCandies extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }

  componentDidMount() {
    this.props.loadCandies()
    this.props.loadUsers()
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitHandler(event) {
    event.preventDefault()
    this.props.addCandy(this.state)
    this.setState(defaultState)
  }

  deleteHandler(event) {
    event.preventDefault()
    const candyId = Number(event.target.getAttribute('candyid'))
    this.props.deleteCandy(candyId)
  }

  render() {
    const isThereCandies = this.props.candies.length
    const isThereUsers = this.props.users

    console.log(this.props.users)

    return (
      <div>
        <div>
          <h1>All Candies View</h1>
        </div>

        {Array.isArray(isThereUsers) && (
          <div className="flex">
            <AddCandyForm
              formTitle="Create Candy"
              submitHandler={this.submitHandler}
              changeHandler={this.changeHandler}
              candyValues={this.state}
            />
            {isThereCandies && (
              <div className="flex">
                {this.props.candies.map((candy) => (
                  <ul key={candy.id}>
                    <main>
                      <h4>Candies Name & Quatity</h4>
                      <Link to={`/candies/${candy.id}`}>
                        <h4>{candy.name}</h4>
                        <h4>{candy.quantity}</h4>
                      </Link>
                      <img className="image" src={candy.imageUrl} />
                      <button
                        type="button"
                        candyid={candy.id}
                        onClick={this.deleteHandler}
                      >
                        Delete
                      </button>
                    </main>
                  </ul>
                ))}
              </div>
            )}
          </div>
        )}

        {!Array.isArray(isThereUsers) && (
          <div className="flex">
            {isThereCandies && (
              <div className="flex">
                {this.props.candies.map((candy) => (
                  <ul key={candy.id}>
                    <main>
                      <h4>Candies Name & Quatity</h4>
                      <Link to={`/candies/${candy.id}`}>
                        <h4>{candy.name}</h4>
                        <h4>{candy.quantity}</h4>
                      </Link>
                      <img className="image" src={candy.imageUrl} />
                    </main>
                  </ul>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          {isThereCandies === undefined && (
            <p> Sorry ... There is no candies to display </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {candies: state.candies, users: state.users}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCandies: () => dispatch(fetchCandies()),
    loadUsers: () => dispatch(fetchUsers()),

    addCandy: (candy) => dispatch(createCandy(candy)),
    deleteCandy: (candyId) => dispatch(destroyCandy(candyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCandies)
