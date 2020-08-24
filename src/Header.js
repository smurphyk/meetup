import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <header>
        <div className="title__container">
          <h1 className="header__title">Murph's Meetups</h1>
        </div>
      </header>
    )
  }
}

export default Header