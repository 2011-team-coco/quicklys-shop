import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCandy} from '../store/singleCandy'

export class SingleCandy extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleCandy(this.props.match.params.id)
  }
  render() {
    const singleCandy = this.props.singleCandy
    console.log(singleCandy)
    return (
      <div>
        <h1>The name is {singleCandy.name}, plesed to meet you!</h1>
        <img src={singleCandy.imageUrl} width="250" />
        <div>Price: {singleCandy.price}</div>
      </div>
    )
  }
}

const mapState = state => ({
  singleCandy: state.singleCandy
})

const mapDispatch = dispatch => ({
  loadSingleCandy: id => dispatch(fetchSingleCandy(id))
})

export default connect(mapState, mapDispatch)(SingleCandy)
