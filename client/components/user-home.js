import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.userId)
  }

  render() {
    const {email} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (userId) => {
      dispatch(getCartThunk(userId))
    },
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
