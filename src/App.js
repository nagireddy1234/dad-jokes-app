import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Joke from "./Components/Joke"

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
      let res = await axios.get("https://icanhazdadjoke.com?limit=20", {
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
          {this.state.jokes.map((joke)=>{
            return <Joke key={uuidv4()} joke={joke} />
          })}
      </div>
    )
  }
}
