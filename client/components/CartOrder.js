import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core'

import {clearCart} from '../store/cart'
import history from '../history'

const getTotalItems = (orderCandies) => {
  return orderCandies.reduce((sum, candyOrder) => {
    return sum + candyOrder.quantity
  }, 0)
}

const getTotalPrice = (orderCandies) => {
  return orderCandies.reduce((sum, orderCandy) => {
    return sum + +orderCandy.quantity * +orderCandy.candy.price
  }, 0)
}

const CartOrder = (props) => {
  const onCheckoutClickHandler = async (e) => {
    e.preventDefault()
    console.log('Checkout Triggered')
    console.log('cart props ', props)
    //if logged in, call order api
    let order
    if (props.isLoggedIn) {
      const {data} = await axios.post(`/api/orders/${props.cart.cartId}`)
      order = data
    } else {
      //if guest, save everything in cart as "order"
      order = {
        ...props.cart,
        order_candies: [...props.cart.order_candies],
      }
    }
    //dispatch clearCart to clear cart in redux state
    props.clearCart()
    //redirect to confirmation page, make order info available on props.location.state.order
    history.push('/confirmation', order)
  }
  const styles = {
    right: {
      textAlign: 'right',
    },
    innerGrid: {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
  }
  return (
    <Card>
      <CardHeader title="Order Summary"></CardHeader>
      <Divider></Divider>
      <CardContent>
        <Grid
          style={styles.innerGrid}
          container
          direction="row"
          justify="space-between"
        >
          <Grid item xs={6}>
            Items:
          </Grid>
          <Grid style={styles.right} item xs={6}>
            {getTotalItems(props.cart.order_candies)}
          </Grid>
        </Grid>
        <Grid
          style={styles.innerGrid}
          container
          direction="row"
          justify="space-between"
        >
          <Grid item xs={6}>
            Subtotal:
          </Grid>
          <Grid style={styles.right} item xs={6}>
            {getTotalPrice(props.cart.order_candies).toFixed(2)}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          disabled={!props.cart.order_candies.length}
          color="primary"
          variant="contained"
          fullWidth
          onClick={onCheckoutClickHandler}
        >
          Checkout
        </Button>
      </CardActions>
    </Card>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
  }
}
export default connect(null, mapDispatchToProps)(CartOrder)
