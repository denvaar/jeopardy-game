import React, { Component } from 'react';


export default props => (
  <tr>
    {
      props.categories.map((category, i) => (<th key={i}> {category} </th>))
    }
  </tr>
)

