import React from 'react'
import {connect} from 'react-redux'
import {modifyUser, fetchSingleUser} from '../redux/singleUser'
import EditUser from './EditUser'

export class SingleUser extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleUser(this.props.match.params.id)
  }
  render() {
    const singleUser = this.props.singleUser
    return (
      <div>
        <h1>{singleUser.email}!</h1>
        <div>
          <EditUser {...this.props} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleUser: state.singleUser,
})

const mapDispatch = (dispatch) => ({
  loadSingleUser: (id) => dispatch(fetchSingleUser(id)),
  updateUser: (previousUserId, modifiedUser) =>
    dispatch(modifyUser(previousUserId, modifiedUser)),
})

export default connect(mapState, mapDispatch)(SingleUser)
