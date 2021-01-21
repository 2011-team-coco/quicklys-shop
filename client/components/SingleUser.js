import React from 'react'
import {connect} from 'react-redux'
import {modifyUser, fetchSingleUser} from '../redux/singleUser'
import EditUser from './EditUser'
import {fetchUsers} from '../redux/users'

export class SingleUser extends React.Component {
  async componentDidMount() {
    await this.props.loadSingleUser(this.props.match.params.id)
    this.props.loadUsers()
  }
  render() {
    const singleUser = this.props.singleUser
    const isThereUsers = this.props.users

    return (
      <div>
        {Array.isArray(isThereUsers) && (
          <div className="flex">
            <div>
              <h1>{singleUser.email}!</h1>
              <div>
                <EditUser {...this.props} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state) => ({
  singleUser: state.singleUser,
  users: state.users,
})

const mapDispatch = (dispatch) => ({
  loadSingleUser: (id) => dispatch(fetchSingleUser(id)),
  loadUsers: () => dispatch(fetchUsers()),

  updateUser: (previousUserId, modifiedUser) =>
    dispatch(modifyUser(previousUserId, modifiedUser)),
})

export default connect(mapState, mapDispatch)(SingleUser)
