import React from 'react'
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core'

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
        <Button color="primary" variant="contained" fullWidth>
          Checkout
        </Button>
      </CardActions>
    </Card>
  )
}

export default CartOrder
