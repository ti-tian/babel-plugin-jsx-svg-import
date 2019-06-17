import React from 'react';

export default class Header extends React.Component {
  onClick() {
    alert('a');
  }

  render() {
    return (
      <div className="header">
        <Icon
          color="#f00"
          fontSize="12"
          onClick={this.onClick.bind(this)}
          type="close"
        />
      </div>
    );
  }
}
