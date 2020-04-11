import React from 'react';
import axios from 'axios';

import './FullProduct.css';

class FullProduct extends React.Component {
    state = {
        loadedProduct: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedProduct || this.state.loadedProduct.idb !== this.props.id) {
                axios.get('https://dsm-react-90c16.firebaseio.com/tarea4/productos.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    .then(response => {
                        const products = [];
                        for (let key in response.data) {
                            products.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        this.setState({ loadedProduct: products[0] });
                    });
            }
        }
    }

    render() {
        let product = <p style={{ textAlign: 'center' }}>Please select a product!</p>;
        if (this.props.id) {
            product = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedProduct) {
            product = (
                <div className="FullProduct">
                    <h1>{this.state.loadedProduct.name}</h1>
                    <p><small>Ref: {this.state.loadedProduct.reference}</small></p>
                    <img src={this.state.loadedProduct.image} alt="Product image" />
                    <p>Precio: {this.state.loadedProduct.price} €</p>
                    <p>{this.state.loadedProduct.description}</p>
                </div>

            );
        }
        return product;
    }
}

export default FullProduct;