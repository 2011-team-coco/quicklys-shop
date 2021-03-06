/* eslint-disable no-useless-constructor */
import React from 'react'

import {connect} from 'react-redux'
import {Grid, Paper, CardHeader, Typography, Divider} from '@material-ui/core'

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
                    key={orderCandy.candy.candyId}
                    orderCandy={orderCandy}
                    userId={this.props.userId}
                    isLoggedIn={this.props.isLoggedIn}
                  ></CartItem>
                )
              })}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CartOrder
              cart={this.props.cart}
              isLoggedIn={this.props.isLoggedIn}
            ></CartOrder>
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
    //coercing into boolean to see if user is logged in
    isLoggedIn: !!state.user.id,
  }
}

export default connect(mapState)(Cart)
