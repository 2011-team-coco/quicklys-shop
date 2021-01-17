import React from 'react'
import {Grid, Paper, CardHeader, Typography, Divider} from '@material-ui/core'
import OrderItem from './OrderItem'
import history from '../history'

const getTotalPrice = (orderCandies) => {
  return orderCandies.reduce((sum, orderCandy) => {
    return sum + +orderCandy.quantity * +orderCandy.candy.price
  }, 0)
}

const Confirmation = (props) => {
  const cart = props.location.state
  if (!cart) history.push('/')
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
    <div>
      {cart ? (
        <Paper style={classes.paper}>
          <CardHeader title="Order Confirmation"></CardHeader>
          <Divider></Divider>
          <Grid container style={classes.innerGrid} spacing={2}>
            <Grid item xs={6}>
              <Typography style={classes.details} variant="subtitle1">
                Details
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
          {cart.order_candies.map((orderCandy) => {
            return (
              <OrderItem
                key={orderCandy.orderCandyId}
                orderCandy={orderCandy}
                userId={null}
              ></OrderItem>
            )
          })}
          <Divider></Divider>
          <OrderItem
            key="total"
            orderCandy={{
              totalPrice: getTotalPrice(cart.order_candies),
              quantity: null,
              candy: {
                candyId: null,
                name: null,
                price: null,
                imageUrl: null,
              },
            }}
          ></OrderItem>
        </Paper>
      ) : null}
    </div>
  )
}

export default Confirmation
