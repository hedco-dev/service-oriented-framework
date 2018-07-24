import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    render() {
        return (<h1>{this.props.title} {this.state.seconds}</h1>);
    }
}

render(<App title="Majid" />, document.getElementById('root'));

const store = createStore(reducers, applyMiddleware(thunk), applyMiddleware(promiseMiddleware()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
