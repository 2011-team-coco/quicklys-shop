import React from 'react'
import {connect} from 'react-redux'
import {fetchCandies} from '../store/allCandy'

const defaultState = {
  name: '',
  price: 0,
  imageUrl: '',
  quantity: 0,
  description: ''
}

export class AllCandy extends React.Component {
  constructor() {
    super()
    this.state = defaultState
  }

  componentDidMount() {
    this.props.getCandies()
  }

  render() {
    // const candies = this.props;
    console.log(candies)
    return (
      <div>
        <h2>Here are is all the candy!</h2>
        <div className="candyList">
          {this.props.candies.map(candy => {
            return (
              <div key={candy.id}>
                <img src={candy.imageUrl} width="250" />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {candies: state.candies}
}

const mapDispatch = dispatch => {
  return {
    getCandies: () => dispatch(fetchCandies())
  }
}

export default connect(mapState, mapDispatch)(AllCandy)
