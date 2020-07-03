import React from 'react';

const Search = (props) => {
  return (
      <form className="form" onSubmit={props.find.handleSubmit}>
        <label>
          <input type="text" className="form__textfield" placeholder="Enter Country..." value={props.find.value} onChange={props.find.handleChange}/>
        </label>
        <input className="form__button" type="submit" value="Submit" />
      </form>
  );
};

export default Search;
