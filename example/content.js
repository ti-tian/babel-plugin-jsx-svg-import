import React from 'react';
import Icon from './Icon';

export default class Content extends React.Component {
  onClick() {
    alert('a');
  }

  render() {
    return (
      <div className="content">
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
