import React, { Component } from 'react';


export default props => (
  <tr>
    {
      props.data.map((category, i) => (<th key={i}> {category} </th>))
    }
  </tr>
)
// class Categories extends Component {
//   render() {
//     const categories = this.props.data.map((category, i) => {
//       return (
//         <th key={i}>{category}</th>
//       );
//     });

//     return (
//       <tr>
//         {categories}
//       </tr>
//     );
//   }
// }

// export default Categories;
