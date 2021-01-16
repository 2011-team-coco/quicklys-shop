import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import {
  Grid,
  Paper,
  makeStyles,
  CardHeader,
  Typography,
  Divider,
} from '@material-ui/core'

import CartItem from './CartItem'
import CartOrder from './CartOrder'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const classes = {
      cart: {
        height: '100vh',
      },
      paper: {
        // height: '100vh',
      },
      details: {
        paddingLeft: '24px',
      },
      innerGrid: {
        paddingTop: '20px',
        paddingBottom: '20px',
      },
    }
    return (
      <div style={classes.cart}>
        <Grid style={classes.cart} container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper style={classes.paper}>
              <CardHeader title="Shopping Cart"></CardHeader>
              <Divider></Divider>
              <Grid container style={classes.innerGrid} spacing={2}>
                <Grid item xs={6}>
                  <Typography style={classes.details} variant="subtitle1">
                    Product Details
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Quantity</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Price</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Total</Typography>
                </Grid>
              </Grid>
              <Divider></Divider>
              {this.props.cart.order_candies.map((orderCandy) => {
                return (
                  <CartItem
                    key={orderCandy.orderCandyId}
                    orderCandy={orderCandy}
                    userId={this.props.userId}
                  ></CartItem>
                )
              })}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CartOrder cart={this.props.cart}></CartOrder>
          </Grid>
        </Grid>
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
