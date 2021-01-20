import React from 'react'
import {connect} from 'react-redux'
import {fetchCandies, createCandy, destroyCandy} from '../redux/candies'
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

  async deleteHandler(event) {
    event.preventDefault()
    const candyId = Number(event.target.getAttribute('candyid'))
    await this.props.deleteCandy(candyId)
    await this.props.loadCandies()
  }

  render() {
    const isThereCandies = this.props.candies.length
    return (
      <div>
        <div>
          <h1>All Candies View</h1>
        </div>
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
                  <h4>Candies Name & Quantity</h4>
                  <Link to={`/candies/${candy.id}`}>
                    <h4>{candy.name}</h4>
                    <h4>{candy.quantity}</h4>
                  </Link>
                  <img className="image" src={candy.imageUrl} />
                  <button candyid={candy.id} onClick={this.deleteHandler}>
                    Delete
                  </button>
                </main>
              </ul>
            ))}
          </div>
        )}

        <div>
          {isThereCandies === undefined && (
            <p> Sorry ... There are no candies to display </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {candies: state.candies}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCandies: () => dispatch(fetchCandies()),
    addCandy: (candy) => dispatch(createCandy(candy)),
    deleteCandy: (candyId) => dispatch(destroyCandy(candyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCandies)
