import React from 'react'

const AddCandyForm = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <h3>{props.formTitle}</h3>
      <label>Candy Name</label>
      <input
        name="name"
        type="text"
        value={props.candyValues.name}
        onChange={props.changeHandler}
      />
      <label>Price:</label>
      <input
        name="price"
        type="number"
        value={props.candyValues.price}
        onChange={props.changeHandler}
      />
      <label>Image URL</label>
      <input
        type="text"
        id="priority"
        name="image URL"
        onChange={props.changeHandler}
      />
      <br />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={props.candyValues.description}
        onChange={props.changeHandler}
      />
      <br />
      <label>Quantity:</label>
      <input
        type="number"
        name="quantity"
        value={props.candyValues.quantity}
        onChange={props.changeHandler}
      />

      <button type="submit" disabled={props.candyValues.title === ''}>
        Submit
      </button>
    </form>
  )
}

export default AddCandyForm
