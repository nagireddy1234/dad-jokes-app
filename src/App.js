import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import uuid from "react-uuid";
import Joke from "./Components/Joke";
import laughing from "./Images/laughing.png";
import loader from './Images/loader.svg'

export default class App extends Component {

  static defaultProps = {
    numJokesToGet: 10
  }
  state = {
    jokes: JSON.parse(window.localStorage.getItem("jokes")||"[]"),
    isLoading:false,
  }
  
   seenJokes = new Set(this.state.jokes.map(joke=>joke.text));
    
  componentDidMount() {
    if(this.state.jokes.length===0){
       this.getJokes();
    }
  }

  async getJokes () {
    try {
      let jokes = []
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json"
        }
      });
      let sameJoke = res.data.joke;
      if(!this.seenJokes.has(sameJoke)){
        jokes.push({text:sameJoke, votes:0, id:uuid()})
      }else{
        console.log("Found Error");
        console.log(sameJoke)
      }
    }
    this.setState(st =>({
      isLoading:false,
      jokes:[...st.jokes,...jokes]
    }), 
      ()=>
      window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes) )
    )
  }catch(e){
    this.setState({
      isLoading:false,
    }, console.log(e))
  }
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
       <img src={loader} alt="loading" />
        <h1 className="jokelist-title">Loading...</h1>
      </div>
    )
  }

  let jokes=this.state.jokes.sort((a,b)=>b.votes-a.votes)
    return (
      <div className="App">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title"> <span className="">Dad</span> Jokes</h1>
         <img src={laughing} alt="laughingImage" /> 
         <button type="button" onClick={this.getMoreJokes}>Fetch Jokes</button>
        </div>
          <div className="jokelist-jokes">
          {jokes.map((joke)=>{
            return <Joke key={uuid()} joke={joke} upvote={()=>this.handleVotes(joke.id,1)} downvote={()=>this.handleVotes(joke.id,-1)}   />
          })}
          </div>
      </div>
    )
  }
}
