/* eslint-disable no-lonely-if */
import React from 'react'
import {connect} from 'react-redux'
import {Grid, Typography, Button, TextField, MenuItem} from '@material-ui/core'
import history from '../history'
import {
  userUpdateCartCandyQtyThunk,
  userDeleteCartCandyThunk,
  guestDeleteCartCandy,
  guestUpdateCartCandyQty,
} from '../store/cart'

const quantityOptions = () => {
  let arr = ['Remove']
  for (let i = 1; i <= 10; i++) {
    arr.push(i)
  }
  return arr
}

//if candy is cicked, redirects to single candy view
const onItemClick = (e) => {
  history.push(`/candies/${e.currentTarget.value}`)
}

const CartItem = (props) => {
  //event handler
  const onQuantityChange = (e) => {
    const candyId = props.orderCandy.candy.candyId
    //if user is logged in
    if (props.isLoggedIn) {
      if (e.target.value === 'Remove') {
        // DELETE
        props.userDeleteCartCandy(props.userId, candyId)
      } else {
        props.userUpdateCartCandyQty(props.userId, candyId, e.target.value)
      }
    } else {
      // guest user
      if (e.target.value === 'Remove') {
        // DELETE
        props.guestDeleteCartCandy(candyId)
      } else {
        // update
        props.guestUpdateCartCandyQty(candyId, e.target.value)
      }
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
//connecting all my thunks to my component
//don't need to mapState because userId & candyId passed down as props
const mapDispatchToProps = (dispatch) => {
  return {
    userUpdateCartCandyQty: (userId, candyId, quantity) => {
      dispatch(userUpdateCartCandyQtyThunk(userId, candyId, quantity))
    },
    userDeleteCartCandy: (userId, candyId) => {
      dispatch(userDeleteCartCandyThunk(userId, candyId))
    },
    guestUpdateCartCandyQty: (candyId, quantity) => {
      dispatch(guestUpdateCartCandyQty(candyId, quantity))
    },
    guestDeleteCartCandy: (candyId) => {
      dispatch(guestDeleteCartCandy(candyId))
    },
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
