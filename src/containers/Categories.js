import React, { Component } from 'react';


class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let categories = this.props.data.map((category, i) => {
      return (
        <th key={i}>{category}</th>
      );
    });

    return (
      <tr>
        {categories}
      </tr>
    );
  }
}

export default Categories;
