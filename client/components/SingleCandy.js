import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCandy} from '../redux/singleCandy'

export class SingleCandy extends React.Component {
  async componentDidMount() {
    console.log('props in componentDidMount', this.props)
    await this.props.loadSingleCandy(this.props.match.params.id)
  }
  render() {
    const singleCandy = this.props.singleCandy
    return (
      <div>
        <h1>{singleCandy.name}!</h1>
        <img src={singleCandy.imageUrl} width="250" />
        <div>Price: {singleCandy.price}</div>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleCandy: state.singleCandy,
})

const mapDispatch = (dispatch) => ({
  loadSingleCandy: (id) => dispatch(fetchSingleCandy(id)),
})

export default connect(mapState, mapDispatch)(SingleCandy)
