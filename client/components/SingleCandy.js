import React from 'react'
import {connect} from 'react-redux'
import {modifyCandy, fetchSingleCandy} from '../redux/singleCandy'
import EditCandy from './EditCandy'

export class SingleCandy extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleCandy(this.props.match.params.id)
  }
  render() {
    const singleCandy = this.props.singleCandy
    return (
      <div>
        <h1>{singleCandy.name}!</h1>
        <img src={singleCandy.imageUrl} width="250" />
        <div>Price: {singleCandy.price}</div>
        <div>
          <EditCandy {...this.props} />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleCandy: state.singleCandy
})

const mapDispatch = dispatch => ({
  loadSingleCandy: id => dispatch(fetchSingleCandy(id)),
  updateCandy: (previousCandyId, modifiedCandy) =>
    dispatch(modifyCandy(previousCandyId, modifiedCandy))
})

export default connect(mapState, mapDispatch)(SingleCandy)
