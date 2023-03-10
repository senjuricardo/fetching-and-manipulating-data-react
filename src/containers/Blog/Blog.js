import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state= {
        posts:[],
        selectedPostID : null
    }
    componentDidMount(){
       axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0,4)
                const updatedPost =  posts.map(post => {
                    return{
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPost});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostID: id});
    }
   

    render () {
        const posts = this.state.posts.map(post =>{
            return <Post key={post.id} title={post.title} author={post.author} view={() =>this.postSelectedHandler(post.id)} />
        }
        );


        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostID} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;