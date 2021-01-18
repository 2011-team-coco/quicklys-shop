import React from 'react'

const AddUserForm = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <h3>{props.formTitle}</h3>
      <label>User Email</label>
      <input
        name="email"
        type="text"
        value={props.userValues.email}
        onChange={props.changeHandler}
      />
      <label>Password:</label>
      <input
        name="password"
        type="text"
        value={props.userValues.password}
        onChange={props.changeHandler}
      />
      <button type="submit" disabled={props.userValues.password === ''}>
        Submit
      </button>
    </form>
  )
}

export default AddUserForm
