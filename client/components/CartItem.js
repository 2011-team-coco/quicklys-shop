import React from 'react'
import {connect} from 'react-redux'
import {Grid, Typography, Button, TextField, MenuItem} from '@material-ui/core'
import history from '../history'
import {
  userUpdateCartCandyQtyThunk,
  userDeleteCartCandyThunk,
} from '../store/cart'

const quantityOptions = () => {
  let arr = ['Remove']
  for (let i = 1; i <= 10; i++) {
    arr.push(i)
  }
  return arr
}

const onItemClick = (e) => {
  history.push(`/candies/${e.currentTarget.value}`)
}

const CartItem = (props) => {
  const onQuantityChange = (e) => {
    if (e.target.value === 'Remove') {
      // DELETE
      props.userDeleteCartCandy(props.userId, props.orderCandy.candy.candyId)
    } else {
      props.userUpdateCartCandyQty(
        props.userId,
        props.orderCandy.candy.candyId,
        e.target.value
      )
    }
  }
  console.log('HERE IS THE ORDER CANDY ', props.orderCandy)
  const {orderCandy} = props
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
        <Button value={orderCandy.candy.candyId} onClick={onItemClick}>
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
        <TextField
          onChange={onQuantityChange}
          select
          value={orderCandy.quantity}
        >
          {quantityOptions().map((num) => {
            return (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            )
          })}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">
          {orderCandy.candy.price.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">
          {(+orderCandy.candy.price * +orderCandy.quantity).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    userUpdateCartCandyQty: (userId, candyId, quantity) => {
      dispatch(userUpdateCartCandyQtyThunk(userId, candyId, quantity))
    },
    userDeleteCartCandy: (userId, candyId) => {
      dispatch(userDeleteCartCandyThunk(userId, candyId))
    },
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
