// Importing necessary dependencies
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostList from '../PostList';

// Mocking axios
jest.mock('axios');

test('fetches and displays posts', async () => {
  // Mock posts data
  const posts = [
    { id: 1, title: 'Post 1', body: 'Content of post 1' },
    { id: 2, title: 'Post 2', body: 'Content of post 2' },
  ];

  // Mocking the axios get request
  axios.get.mockResolvedValue({ data: posts });

  // Rendering the PostList component
  render(<PostList />);

  // Waiting for posts to be fetched and displayed
  await waitFor(() => {
    posts.forEach(post => {
      // Checking if each post title and body are displayed
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });
});