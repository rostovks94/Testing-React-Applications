// Importing necessary dependencies
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CreatePostForm from '../CreatePostForm';

// Mocking axios
jest.mock('axios');

test('creates a new post', async () => {
  // Mocking the post response
  axios.post.mockResolvedValue({
    data: { id: 101, title: 'New Post', body: 'This is a new post' }
  });

  // Mock function for onPostCreated
  const onPostCreated = jest.fn();

  // Rendering the CreatePostForm component
  render(<CreatePostForm onPostCreated={onPostCreated} />);

  // Simulating user input
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByPlaceholderText(/Body/i), { target: { value: 'This is a new post' } });

  // Simulating form submission
  fireEvent.click(screen.getByText(/Create Post/i));

  // Waiting for axios post to resolve
  await screen.findByText(/Create Post/i);

  // Checking if onPostCreated was called with the new post data
  expect(onPostCreated).toHaveBeenCalledWith({
    id: 101,
    title: 'New Post',
    body: 'This is a new post'
  });
});