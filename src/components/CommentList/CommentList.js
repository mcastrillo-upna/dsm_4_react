import React from 'react';
import axios from 'axios';

import './CommentList.css';

class CommentList extends React.Component {
    state = {
        error_comments: false,
        comments: []
    }

    componentDidMount() {
        axios.get('https://dsm-react-90c16.firebaseio.com/tarea4/comentarios.json')
            .then(response => {
                // console.log(response.data);
                let comments = [];
                for (let key in response.data) {
                    comments.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                // console.log(comments);
                this.setState({ comments: comments });
            }).catch(error => {
                this.setState({ error_comments: true });
            });

    }

    deleteCommentHandler = (idb) => {
        console.log(idb);
        axios.delete('https://dsm-react-90c16.firebaseio.com/tarea4/comentarios/' + idb + '.json')
            .then(response => {
                // console.log(response);
                alert('Comment deleted');
            });
        window.location.reload(false);
    }


    render() {
        let comments = <p style={{ textAlign: 'center' }}>There are no comments yet.</p>;
        if (!this.state.error_comments) {
            comments = this.state.comments.map(comment => {
                return (
                    <section key={comment.idb} className="CommentList">
                        <h1>{comment.title}</h1>
                        <p><small>Autor: {comment.author}</small></p>
                        <p>{comment.content}</p>
                        <div className="Edit">
                            <button onClick={() => this.deleteCommentHandler(comment.idb)} className="Delete">Delete</button>
                        </div>
                    </section>

                );
            });
        }


        return comments;
    }
}

export default CommentList;