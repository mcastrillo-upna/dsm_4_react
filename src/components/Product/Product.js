import React from 'react';

import './Product.css';

const product = (props) => (
    <article className="Product" onClick={props.clicked}>
        <h1>{props.name}</h1>
    </article>
);

export default product;