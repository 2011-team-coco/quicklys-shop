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
        height: '100vh',
      },
      details: {
        paddingLeft: '24px',
      },
      innerGrid: {
        paddingTop: '20px',
      },
    }
    console.log('this is props', this.props.cart)
    return (
      <div style={classes.cart}>
        <Grid style={classes.cart} container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Paper style={classes.paper}>
              <CardHeader title="Shopping Cart"></CardHeader>
              <Divider></Divider>
              <Grid container style={classes.innerGrid} spacing={2}>
                <Grid item xs={6}>
                  <Typography style={classes.details} variant="h7">
                    Product Details
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h7">Quantity</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h7">Price</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h7">Total</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper style={classes.paper}>Left side</Paper>
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
