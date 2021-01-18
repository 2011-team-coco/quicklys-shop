import React from 'react'
import {Grid, Typography, Button, TextField, MenuItem} from '@material-ui/core'
import history from '../history'

const onItemClick = (e) => {
  history.push(`/candies/${e.currentTarget.value}`)
}

const OrderItem = (props) => {
  const {orderCandy} = props
  console.log(orderCandy)

  const classes = {
    details: {
      paddingLeft: '24px',
    },
    innerGrid: {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    image: {
      width: '100%',
      maxWidth: '200px',
    },
  }
  return (
    <Grid container style={classes.innerGrid} spacing={2}>
      <Grid item xs={6}>
        <Button
          value={orderCandy.candy.candyId}
          onClick={onItemClick}
          disabled={!!orderCandy.totalPrice}
        >
          <Grid direction="row" style={classes.details} container spacing={2}>
            <Grid item xs={4}>
              <div>
                <img
                  style={classes.image}
                  src={orderCandy.candy.imageUrl}
                ></img>
              </div>
            </Grid>
            <Grid item xs={8}>
              <Typography align="left">{orderCandy.candy.name}</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Typography>{orderCandy.quantity}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">
          {orderCandy.candy.price
            ? orderCandy.candy.price.toFixed(2)
            : 'ORDER TOTAL'}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">
          {orderCandy.candy.price
            ? (+orderCandy.candy.price * +orderCandy.quantity).toFixed(2)
            : orderCandy.totalPrice.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default OrderItem
