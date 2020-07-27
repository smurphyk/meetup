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
    this.color = 'blue';
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: '#000',
      fontWeight: 'bold',
      borderRadius: '3px',
      padding: '5px',
      margin: '1rem auto'
    };
  }
}

export { InfoAlert };

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.colof = 'orange'
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: '#000',
      fontWeight: 'bold',
      borderRadius: '3px',
      padding: '5px',
      margin: '1rem auto'
    };
  }
}

export { WarningAlert };

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: '#000',
      fontWeight: 'bold',
      borderRadius: '3px',
      padding: '5px',
      margin: '1rem auto'
    };
  }
}

export { ErrorAlert };
