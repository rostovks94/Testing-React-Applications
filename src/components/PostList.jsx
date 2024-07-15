import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePostForm from './CreatePostForm';
import UpdatePostForm from './UpdatePostForm';
import styled from 'styled-components';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PostItem = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style-type: none;
`;

const PostTitle = styled.h2`
  margin: 0 0 10px 0;
`;

const PostBody = styled.p`
  margin: 0 0 10px 0;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    setEditingPost(null);
  };

  const handlePostDeleted = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <PostContainer>
      <h1>Posts</h1>
      <CreatePostForm onPostCreated={handlePostCreated} />
      {editingPost && (
        <UpdatePostForm post={editingPost} onPostUpdated={handlePostUpdated} />
      )}
      <ul>
        {posts.map(post => (
          <PostItem key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostBody>{post.body}</PostBody>
            <Button onClick={() => setEditingPost(post)}>Edit</Button>
            <Button onClick={() => handlePostDeleted(post.id)}>Delete</Button>
          </PostItem>
        ))}
      </ul>
    </PostContainer>
  );
};

export default PostList;