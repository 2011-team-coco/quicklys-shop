import React from 'react'
import {connect} from 'react-redux'
import {modifyCandy, fetchSingleCandy} from '../redux/singleCandy'
import {guestAddCartCandyThunk, userAddCartCandyThunk} from '../store/cart'
import EditCandy from './EditCandy'

export class SingleCandy extends React.Component {
  constructor(props) {
    super(props)
    this.onAddCandyClick = this.onAddCandyClick.bind(this)
  }

  async componentDidMount() {
    await this.props.loadSingleCandy(this.props.match.params.id)
  }

  onAddCandyClick(e) {
    e.preventDefault()
    const candy = this.props.singleCandy
    if (this.props.isLoggedIn) {
      // TO DO: remove hard-coded quantity
      this.props.userAddCandy(this.props.userId, candy.id, 1)
    } else {
      // TO DO: remove hard-coded quantity
      this.props.guestAddCandy(
        1,
        candy.id,
        candy.name,
        candy.price,
        candy.imageUrl
      )
    }
  }
  render() {
    const singleCandy = this.props.singleCandy
    return (
      <div>
        <h1>{singleCandy.name}!</h1>
        <img src={singleCandy.imageUrl} width="250" />
        <div>Price: {singleCandy.price}</div>
        <div>
          <EditCandy {...this.props} />
        </div>
        <button
          disabled={this.props.candiesInCart.includes(
            this.props.singleCandy.id
          )}
          onClick={this.onAddCandyClick}
        >
          Add to cart
        </button>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleCandy: state.singleCandy,
  isLoggedIn: !!state.user.id,
  userId: state.user.id,
  candiesInCart: state.cart.order_candies.map((orderCandy) => {
    return orderCandy.candy.candyId
  }),
})

const mapDispatch = (dispatch) => ({
  loadSingleCandy: (id) => dispatch(fetchSingleCandy(id)),
  updateCandy: (previousCandyId, modifiedCandy) =>
    dispatch(modifyCandy(previousCandyId, modifiedCandy)),
  guestAddCandy: (quantity, candyId, candyName, candyPrice, imageUrl) =>
    dispatch(
      guestAddCartCandyThunk(quantity, candyId, candyName, candyPrice, imageUrl)
    ),
  userAddCandy: (userId, candyId, quantity) =>
    dispatch(userAddCartCandyThunk(userId, candyId, quantity)),
})

export default connect(mapState, mapDispatch)(SingleCandy)
