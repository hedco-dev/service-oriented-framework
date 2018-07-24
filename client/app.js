import React, { Component } from 'react';
import { render } from 'react-dom';

class Message extends Component {
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

render(<Message title="Majid" />, document.getElementById('root'));
