import React from 'react';

const Joke = (props) => {
  console.log(props.joke)
  return (
    <div className="container">
      <ul> <li>{props.joke}</li></ul>
    </div>
  );
};

export default Joke;