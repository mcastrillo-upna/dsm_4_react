import React from 'react';
import axios from 'axios';

import Product from '../../components/Product/Product';
import FullProduct from '../../components/FullProduct/FullProduct';
import NewComment from '../../components/NewComment/NewComment';
import CommentList from '../../components/CommentList/CommentList';
import './Blog.css';

class Blog extends React.Component {
    state = {
        products: [],
        selectedProductId: null,
        error_products: false,
    }

    componentDidMount() {
        //axios.get('https://firestore.googleapis.com/v1/projects/my-demoblog/databases/(default)/documents/posts/')
        axios.get('https://dsm-react-90c16.firebaseio.com/tarea4/productos.json')
            .then(response => {
                let products = [];
                for (let key in response.data) {
                    products.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                products = products.slice(1,);
                this.setState({ products: products });
            }).catch(error => {
                this.setState({ error_products: true });
            });

    }

    productSelectedHandler = (id) => {
        this.setState({ selectedProductId: id });
    }

    render() {
        let products = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error_products) {
            products = this.state.products.map(product => {
                // console.log(product.name);
                return <Product
                    name={product.name}
                    key={product.idb}
                    clicked={() => this.productSelectedHandler(product.idb)} />;
            });
        }


        return (
            <div>
                <h1 align="center">Music shop</h1>
                <section className="Products">
                    {products}
                </section>
                <section>
                    <FullProduct id={this.state.selectedProductId} />
                </section>
                <section>
                    <NewComment />
                </section>
                <section>
                    <h1 align="center">List of Comments</h1>
                    <CommentList />
                </section>
                
            </div>
        );
    }
}

export default Blog;