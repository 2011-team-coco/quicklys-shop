import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    console.log('this is props', this.props.cart)
    return (
      <div>
        <h3>THIS WILL BE THE CART</h3>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
  }
}

export default connect(mapState)(Cart)
