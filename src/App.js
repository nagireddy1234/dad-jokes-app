import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import uuid from "react-uuid";
import Joke from "./Components/Joke";
import laughing from "./Images/laughing.png"
//  import JokeList from './Components/JokeList';

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

  render() {
    return (
      <div className="App">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-tile"> <span>Dad</span> Jokes</h1>
         <img src={laughing} alt="laughingImage" /> 
         <button type="button">Fetch Jokes</button>
        </div>
          <div className="jokelist-jokes">
          {this.state.jokes.map((joke)=>{
            return <Joke key={uuid()} joke={joke} />
          })}
          {/* <JokeList /> */}
          </div>
      </div>
    )
  }
}
