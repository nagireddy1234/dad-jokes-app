import React from 'react';
import "./Joke.css"

const Joke = (props) => {
  // console.log(props.joke)

 const getColor = () => {
  if(props.joke.votes>=15) {
      return "#4caf50";
  }
  else if(props.joke.votes>=12){
     return "#8bc34a";
  }
  else if(props.joke.votes>=9){
    return "#cddc39";
  }
  else if(props.joke.votes>=6){
    return "#ffeb3b";
  }
  else if(props.joke.votes>=3){
    return "#ffc107";
  }
  else if(props.joke.votes>=0){
    return "#ff9800";
  }
  else {
    return "#f44336";
  }
}

const getEmoji = () => {
  if(props.joke.votes>=15) {
      return <i className="em em-rolling_on_the_floor_laughing"  aria-label="ROLLING ON THE FLOOR LAUGHING"></i>;
  }
  else if(props.joke.votes>=12){
     return <i className="em em-laughing" aria-label="SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES"></i>;
  }
  else if(props.joke.votes>=9){
    return <i className="em em-smiley" aria-label="SMILING FACE WITH OPEN MOUTH"></i>;
  }
  else if(props.joke.votes>=6){
    return <i className="em em-slightly_smiling_face"  aria-label="SLIGHTLY SMILING FACE"></i>;
  }
  else if(props.joke.votes>=3){
    return  <i className="em em-neutral_face"  aria-label="NEUTRAL FACE"></i>;
  }
  else if(props.joke.votes>=0){
    return <i className="em em-confused"  aria-label="CONFUSED FACE"></i>;
  }
  else {
    return <i className="em em-angry"  aria-label="ANGRY FACEName"></i>;
  }
}

  return (
    <div className="joke container">
      <div className="joke-buttons">
      <i className='fas fa-arrow-up' onClick={props.upvote}></i>
      <span className="joke-votes" style={{borderColor:getColor()}}> {props.joke.votes} </span>
      <i className='fas fa-arrow-down' onClick={props.downvote}></i>
      </div>
     <div className="joke-text"> {props.joke.text} </div>
  <div className="joke-smiley">{getEmoji()}</div>
    </div>
  );
};

export default Joke;