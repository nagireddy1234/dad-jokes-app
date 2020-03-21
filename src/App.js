import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import uuid from "react-uuid";
import Joke from "./Components/Joke";
import laughing from "./Images/laughing.png";

//  import JokeList from './Components/JokeList';

//  <i class="em em-laughing" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES"></i> 
// <i class="em em-smiley" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>
// <i class="em em-slightly_smiling_face" aria-role="presentation" aria-label="SLIGHTLY SMILING FACE"></i>
{/* <i class="em em-neutral_face" aria-role="presentation" aria-label="NEUTRAL FACE"></i> */}
// <i class="em em-confused" aria-role="presentation" aria-label="CONFUSED FACE"></i>
// <i class="em em-angry" aria-role="presentation" aria-label="ANGRY FACE"></i>


export default class App extends Component {

  static defaultProps = {
    numJokesToGet: 10
  }

  state = {
    jokes: []
  }
  async componentDidMount() {
    let jokes = []
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json"
        }
      })
      // console.log(res.data.joke)
      jokes.push({text:res.data.joke, votes:0, id:uuid()})
    }
    // console.log(jokes);
    this.setState({
      jokes:jokes
    })
  }

   handleVotes = (id, delta)=>{
     this.setState(st=>({
       jokes:st.jokes.map(joke=>joke.id===id?{...joke, votes:joke.votes+delta}:joke)
     }))

  }

  render() {
    return (
      <div className="App">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title"> <span>Dad</span> Jokes</h1>
         <img src={laughing} alt="laughingImage" /> 
         <button type="button">Fetch Jokes</button>
        </div>
          <div className="jokelist-jokes">
          {this.state.jokes.map((joke)=>{
            return <Joke key={uuid()} joke={joke} upvote={()=>this.handleVotes(joke.id,1)} downvote={()=>this.handleVotes(joke.id,-1)}   />
          })}
          {/* <JokeList /> */}
          </div>
      </div>
    )
  }
}
