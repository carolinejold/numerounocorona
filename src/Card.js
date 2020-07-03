import React from 'react';

const Card = (props) => {


  if(props.err){
    return <h1 className="error">There was an error: {props.err}</h1>
  }

  const array = props.selected.map(el =>{
    return(
      <div className="card">
        <h1>Country: {el.Country}</h1>
        <p className="top">Total confirmed cases: {el.Confirmed}</p>
        <p>Total deaths: {el.Deaths}</p>
        <p>Total recovered: {el.Recovered}</p>
        <p className="bottom">Last updated: {el.Date}</p>
        <button className="card__button" onClick={props.delete} id={el.Country}>Remove</button>
      </div> 
  )})
  
  return (
    <article className="card-container">
      {array}
    </article>
  );
};

export default Card;
