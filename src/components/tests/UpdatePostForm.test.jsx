// Importing necessary dependencies
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UpdatePostForm from '../UpdatePostForm';

// Mocking axios
jest.mock('axios');

test('updates a post', async () => {
  // Mock post data
  const post = { id: 1, title: 'Post 1', body: 'Content of post 1' };

  // Mocking the put response
  axios.put.mockResolvedValue({
    data: { ...post, title: 'Updated Post', body: 'Updated content' }
  });

  // Mock function for onPostUpdated
  const onPostUpdated = jest.fn();

  // Rendering the UpdatePostForm component
  render(<UpdatePostForm post={post} onPostUpdated={onPostUpdated} />);

  // Simulating user input
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Post' } });
  fireEvent.change(screen.getByPlaceholderText(/Body/i), { target: { value: 'Updated content' } });

  // Simulating form submission
  fireEvent.click(screen.getByText(/Update Post/i));

  // Waiting for axios put to resolve
  await screen.findByText(/Update Post/i);

  // Checking if onPostUpdated was called with the updated post data
  expect(onPostUpdated).toHaveBeenCalledWith({
    ...post,
    title: 'Updated Post',
    body: 'Updated content'
  });
});