import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from "./Components/Joke";
import JokeList from './Components/JokeList';

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
      jokes.push(res.data.joke)
    }
    // console.log(jokes);
    this.setState({
      jokes:jokes
    })
  }

  render() {
    return (
      <div>
          <h1>Dad Jokes</h1>
          {this.state.jokes.map((j)=>{
            return <Joke key={uuid()} j={j} />
          })}
          <JokeList />
      </div>
    )
  }
}
