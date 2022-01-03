import React, { Component } from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const {itemsCount, pageSize} = props;
    
    const pagesCount = Math.ceil(itemsCount / pageSize);
    console.log(pagesCount)
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1)
 

    return ( 
        <nav aria-label="...">
  <ul className="pagination">
    {pages.map(page => (
        <li key={page}className="page-item disabled">
      <a className="page-link">{page}</a>
    </li>
    ))}
  </ul>
</nav>
     );
}
 
export default Pagination;