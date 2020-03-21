import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import uuid from "react-uuid";
import Joke from "./Components/Joke";
import laughing from "./Images/laughing.png";

export default class App extends Component {

  static defaultProps = {
    numJokesToGet: 10
  }
  state = {
    jokes: JSON.parse(window.localStorage.getItem("jokes")||"[]"),
    isLoading:false
  }
   componentDidMount() {
    if(this.state.jokes.length===0){
       this.getJokes();
    }
  }

  async getJokes () {
    let jokes = []
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json"
        } 
      })
      jokes.push({text:res.data.joke, votes:0, id:uuid()})
    }
    this.setState(st =>({
      isLoading:false,
      jokes:[...st.jokes,...jokes]
    }), 
      ()=>
      window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes) )
    )
  }
  
   handleVotes = (id, delta)=>{
     this.setState(st=>({
       jokes:st.jokes.map(joke=>joke.id===id?{...joke, votes:joke.votes+delta}:joke)
     }),
     ()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
     )
  }
 getMoreJokes = () =>{
   this.setState({isLoading:true});
   this.getJokes();
 } 

  render() {
  if(this.state.isLoading){
    return(
      <div className="spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="jokelist-title">Loading...</h1>
      </div>
    )
  }
    return (
      <div className="App">
        <div className="jokelist">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title"> <span className="">Dad</span> Jokes</h1>
         <img src={laughing} alt="laughingImage" /> 
         <button type="button" onClick={this.getMoreJokes}>Fetch Jokes</button>
        </div>
          <div className="jokelist-jokes">
          {this.state.jokes.map((joke)=>{
            return <Joke key={uuid()} joke={joke} upvote={()=>this.handleVotes(joke.id,1)} downvote={()=>this.handleVotes(joke.id,-1)}   />
          })}
          </div>
          </div>
      </div>
    )
  }
}
