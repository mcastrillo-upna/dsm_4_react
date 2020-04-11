import React from 'react';
import axios from 'axios';

import './NewComment.css';

class NewComment extends React.Component {
    state = {
        title: '',
        content: '',
        author: ''
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            author: this.state.author,
            content: this.state.content
        };
        
        axios.post('https://dsm-react-90c16.firebaseio.com/tarea4/comentarios.json', data)
            .then(response => {
                alert('Comment sent!');
                //console.log(response);
                window.location.reload(false);
            });
    }

    render () {
        return (
            <div className="NewComment">
                <h1>Add a Comment</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Author</label>
                <input type="text" value={this.state.author} onChange={(event) => this.setState({author: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <button onClick={this.postDataHandler}>Send comment</button>
            </div>
        );
    }
}

export default NewComment;