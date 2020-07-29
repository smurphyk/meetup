import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className='Alert'>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontWeight: 'bold',
      fontStyle: 'italic',
      margin: '0.5rem auto'
    };
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange'
  }

  getStyle = () => {
    return {
      color: this.color,
      fontWeight: 'bold',
      fontStyle: 'italic',
      margin: '0.5rem auto'
    };
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontWeight: 'bold',
      fontStyle: 'italic',
      margin: '0.5rem auto'
    };
  }
}

export { InfoAlert, WarningAlert, ErrorAlert };
