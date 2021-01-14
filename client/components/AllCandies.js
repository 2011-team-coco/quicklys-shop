// import React from 'react'

// const AllCandies = () => {
//   return (
//     <div>
//       <h1>Hello Candies</h1>
//     </div>
//   )
// }

// export default AllCandies
/* eslint-disable*/

import React from 'react'
import {connect} from 'react-redux'
import {fetchCandies} from '../redux/candies'
import {Link} from 'react-router-dom'

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllCandies extends React.Component {
  componentDidMount() {
    this.props.loadCandies()
  }

  render() {
    const isThereCandies = this.props.candies.length
    return (
      <div>
        <div>
          <h1>All Candies View</h1>
        </div>
        {isThereCandies && (
          <div className="flex">
            {this.props.candies.map(candy => (
              <ul key={candy.id}>
                <main>
                  <h4>Candies Name & Quatity</h4>
                  <Link to={`/candies/${candy.id}`}>
                    <h4>{candy.name}</h4>
                    <h4>{candy.quantity}</h4>
                  </Link>
                  <img className="image" src={candy.imageUrl} />
                </main>
              </ul>
            ))}
          </div>
        )}

        <div>
          {isThereCandies === undefined && (
            <p> Sorry ... There is no candies to display </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {candies: state.candies}
}

const mapDispatchToProps = dispatch => {
  return {
    loadCandies: () => dispatch(fetchCandies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCandies)
