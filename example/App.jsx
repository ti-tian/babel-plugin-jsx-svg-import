import React from 'react';
import Header from './header';
import Content from './content';

export default class App extends React.Component {
  onClick() {
    alert('a');
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Content />
      </div>
    );
  }
}
