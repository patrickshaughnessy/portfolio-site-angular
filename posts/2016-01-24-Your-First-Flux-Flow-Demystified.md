---
title: 'Your First Flux Flow, Demystified'
image: 'water-flow.jpg'
date: '01-24-2016'
tags: ['Flux', 'React', 'Javascript']
---
Last week at [Coding House](https://codinghouse.co/#!home "Coding House"), some of us chose to create a web app using React. Our group made a forum for prospective or current students and alumni of dev bootcamps to ask questions and share their experiences. Check it out [here](https://reddit-for-devcamps.herokuapp.com/ "Link To DevCampFire").

Listening to some of the frustrations from the other teams as well as working through our own issues during the project, I thought that doing a little Flux flow tutorial would be beneficial. I'll use Robbie McLellan's SwordOfTheNinja template to start out, which you can find [here](https://github.com/rlm14/SwordOfTheNinja "Sword Of The Ninja Link"). I like to use it whenever I start React projects because it has all the essentials for creating a full stack React app like babel and jspm without any unnecessary sugar. Make sure to give him a star if you use it in your projects!

### Getting Started

I'll be working off a modified clone of the link above, which you can find [here](https://github.com/patrickshaughnessy/Flux-Flow-Tutorial "link to github repo"). Feel free to follow along, or checkout the "final" branch to see the end result.

To start, I removed a few things from our SwordOfTheNinja template, mostly GraphQL stuff, since we won't be using it in this project. I've also installed the dependencies for the flux flow - *events* and *flux* - using jspm.

A lot of tutorials out there, including Facebook's own getting started projects, are pretty intense. It's easy to lose the forest for the trees. So in this example, I'm going to try to break it down as simply as possible while still being informative.

What I'd like to do is set up a simple input that will display a message on the page when I click the 'submit' button. Let's add those as components and import them into our app controller, because we can (and it's good for practicing modularization).

    // AppController.js
    import React from "react";
    import Input from "./Input";
    import Messages from "./Messages";

    class AppController extends React.Component{
      constructor(props){
        super(props);
        this.state = {  }
      }
      render(){
        return(
          <div className="app">
            <Input />
            <Messages />
          </div>
        )
      }
    }

    export default AppController

and the components:

Input.js

    // Input.js
    import React from "react";

    class Input extends React.Component{
      constructor(props){
        super(props);
        this.state = {  }
      }
      render(){
        return(
          <form className="input">
            <input type="text" placeholder="Enter a new message" />
            <button type="submit">Submit</button>
          </form>
        )
      }
    }

    export default Input

and Messages.js

    // Messages.js
    import React from "react";

    class Messages extends React.Component{
      constructor(props){
        super(props);
        this.state = {  }
      }
      render(){
        return(
          <div className="messages">
            <h1>New Messages:</h1>
          </div>
        )
      }
    }

    export default Messages


### The Main Event

Ok, now that we have our scaffold ready, let's set up the flow. One thing to keep in mind is that we want to keep our components "stupid", meaning we want to keep them stateless as much as possible and handle the business logic of our app in the AppController. We'll start by adding an onClick listener to our submit button, which we'll pass in as a prop on our Input component.

    // AppController.js
      <Input clickHandler={this.submitMessage.bind(this)} />

The new message text will be updated in our Input's state, and passed up to the AppController for processing.

    // Input.js
    updateMessageText(e){
        this.setState({ newMessage: e.target.value })
    }

    render(){
        let newMessage = this.state.newMessage;
        return(
          <form className="input">
            <input onChange={this.updateMessageText.bind(this)} type="text" placeholder="Enter a new message" />
            <button onClick={this.props.clickHandler.bind(this, newMessage)} type="submit">Submit</button>
          </form>
        )
      }
    }

Now that we have our message text available to the AppController, let's process the data on submit. The flux flow works as follows:

1. The COMPONENT emits an ACTION on user interaction
2. The ACTION executes a function in your app's internal API
3. The API sends the request to your server, which then returns a response. The response is then sent as an ACTION from the API
4. The server ACTION dispatches a message to your STORE with the response (i.e. data) from the server.
5. The STORE processes the data according to the type of message. This usually involves manipulating private variables inside the STORE with the new information.
6. The STORE emits a CHANGE event, signalling that the data in the STORE has changed.
7. The COMPONENT receives the message that data in the STORE has changed, and re-renders the view accordingly.

Sounds a bit complicated, but we'll take it slow. If you've ever worked with websockets or Firebase, the principle is very similar here.


#### 1) The COMPONENT emits an ACTION

Let's start by adding our submitMessage function to the AppController. Then let's emit a message ACTION with the newMessage data.

    // AppController.js
    import MessageActions from '../actions/MessageActions';

    submitMessage(newMessage, event){
        event.preventDefault();
        MessageActions.addNewMessage({ text: newMessage });
    }


#### 2) The ACTION executes a function in your API

Now we'll need to create the MessageActions.js file in a new directory: lib/actions

    // MessageActions.js
    import API from '../API';

    let MessageActions = {
      addNewMessage(message){
        API.addNewMessage(message);
      }
    }

    export default MessageActions;


#### 3) The API sends the request to your server & emits a server ACTION with the response

Create an API.js file in lib

    // API.js
    import {get, post} from 'jquery';
    import ServerActions from './actions/ServerActions';

    let API = {
      addNewMessage(message) {
        post('/messages', message).done(data => ServerActions.receiveMessages(data));
      }
    }

    export default API;


A few things to note here:
- I'm expecting to receive all of my messages from this request to the server. You could totally choose to send back only the new message, or whatever data you like. For this example, I think it's the easiest to handle in the view.
- I'm not handling any errors from the server response. This is the place to do it (maybe even as an ErrorAction!).

Let's take a moment to configure our route while we're here. I'll just stick it in the index route for simplicity, but feel free to put it wherever you like. Also, I'm just going to simulate a database here as a local variable, messages. You'll want to hook up to your database here (e.g. create a new Message document and save it to your MongoDB).

    // routes/index.js
    import express from 'express';
    const router = express.Router();

    let messages = [];

    router.post('/messages', (req, res) => {
      messages.push(req.body.text);
      res.send(messages);
    })

    export default router;

Now that we've got all of our messages coming back from the server, our API will emit the server ACTION.


#### 4) The server ACTION dispatches a message to the STORE

Back in the actions folder, make a new file, ServerActions.js. Inside our server actions, we'll dispatch the messages we received from the API to our STORE via the App Dispatcher.

    // ServerActions.js
    import AppDispatcher from '../AppDispatcher';

    let ServerActions = {
      receiveMessages(messages) {
        AppDispatcher.dispatch({
          actionType: 'RECEIVE_MESSAGES',
          messages
        });
      }
    }

    export default ServerActions;

The App Dispatcher is basically like your internal flux router. And it's super simple to setup.

    // lib/AppDispatcher.js
    import Flux from 'flux';
    export default new Flux.Dispatcher();

Shweet!


#### 5) The STORE processes the data

Let's set up our store so the AppDispatcher has somewhere to send this data. Make a new directory lib/stores with a MessageStore.js file. Inside we'll create the MessageStore class which extends the EventEmitter from the 'events' library we installed at the beginning.

First we'll register the action type with the AppDispatcher. When the AppDispatcher receives this particular message of 'RECEIVE_MESSAGES', we want to set our private variable _messages to the new array of messages coming back from the server. This data is attached to the action that we dispatched from ServerActions. Finally, we'll want to emit a 'CHANGE' event, notifying all interested components that data in our Message Store has changed.

    // stores/MessageStore.js
    import {EventEmitter} from 'events';
    import AppDispatcher from '../AppDispatcher';

    let _messages = [];

    class MessageStore extends EventEmitter {
      constructor(props){
        super(props);

        AppDispatcher.register(action => {
          switch (action.actionType) {
            case 'RECEIVE_MESSAGES':
              _messages = action.messages;
              this.emit('CHANGE');
              break;
          }
        });
      }

    export default new MessageStore();


#### 6) The STORE emits a CHANGE event

Before we move on from the store, let's anticipate the next step. We'll want our component to listen for changes to data in our store. So let's set up some listener functions, as well as a way for our component to access the private variable, messages.

    // MessageStore.js
    import {EventEmitter} from 'events';
    import AppDispatcher from '../AppDispatcher';

    let _messages = [];

    class MessageStore extends EventEmitter {
      constructor(props){
        super(props);

        AppDispatcher.register(action => {
          switch (action.actionType) {
            case 'RECEIVE_MESSAGES':
              _messages = action.messages;
              this.emit('CHANGE');
              break;
          }
        });
      }

      getAllMessages() {
        return _messages;
      }

      startListening(cb){
        this.on('CHANGE', cb);
      }

      stopListening(cb){
        this.removeListener('CHANGE', cb);
      }
    }

    export default new MessageStore();


#### 7) The COMPONENT receives the message and re-renders the view

Lastly, we'll head back to AppController and register our change listeners and data fetching functions to update the view whenever we get a new message. I'll use a private function, _getAppState here to handle state changes and data fetching. This is useful because we can simply add calls to our stores as we add data requirements to our app.

    // AppController.js
    import React from "react";
    import Input from "./Input";
    import Messages from "./Messages";

    import MessageActions from '../actions/MessageActions';
    import MessageStore from '../stores/MessageStore';

    let _getAppState = () => {
      return {
        messages: MessageStore.getAllMessages()
      }
    }

    class AppController extends React.Component{
      constructor(props){
        super(props);
        this.state = _getAppState();
        this._onChange = this._onChange.bind(this);
      }


      componentDidMount(){
        MessageStore.startListening(this._onChange);
      }

      componentWillUnmount(){
        MessageStore.stopListening(this._onChange);
      }

      _onChange() {
        this.setState(_getAppState());
      }

      submitMessage(newMessage, event){
        event.preventDefault();
        MessageActions.addNewMessage({ text: newMessage });
      }

      render(){
        return(
          <div className="app">
            <Input clickHandler={this.submitMessage.bind(this)} />
            <Messages messages={this.state.messages} />
          </div>
        )
      }
    }

    export default AppController


When the component mounts and unmounts, we'll add and remove the change listener. When we receive new data about messages, we'll update the state of the application to reflect the new data. Finally, we'll pass in the message data to our Messages component.

Inside the Messages component we can display new messages by mapping over our array, rendering each as an <li> component. I set the key attribute to the index of the element, but in practice you should consider setting this to the message ID.

    // Messages.js
    import React from "react";

    class Messages extends React.Component{
      constructor(props){
        super(props);
        this.state = {  }
      }
      render(){
        let messages = this.props.messages.map((message, i) => {
          return <li key={i}>{message}</li>
        })

        return(
          <div className="messages">
            <h1>New Messages:</h1>
            <ul>
              {messages}
            </ul>
          </div>
        )
      }
    }

    export default Messages

And that's about it! Spin up that server, add some new messages and watch them appear to your heart's content.


### Final Thoughts

The first time I saw flux, I was pretty lost. Even after I'd set it up on a few apps, I still didn't see the value in writing ALL that code just for a simple API call. I think the key is really understanding this idea of unidirectional data flow. Angular is great for a lot of things, and it's famous for its two-way data binding.

But when your app starts growing and you start working with a lot of data, keeping track of it in both the view and the controller can become cumbersome. With the flux flow, you always know where your data is coming from and can more easily regulate which components get to know about it. I think this helps to both reduce bugs and headaches as your app grows, allowing you to spend more time working up that next rad feature.

Was this helpful? Let me know on twitter [@pattshaughnessy](https://twitter.com/pattshaughnessy 'Twitter Link')!

* * *
