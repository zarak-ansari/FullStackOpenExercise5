import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('Submit a new blog', async () => {
    const addNewBlog = jest.fn()
    const renderedForm = render(<NewBlogForm addNewBlog={addNewBlog} />).container

    const user = userEvent.setup()

    const titleField = renderedForm.querySelector('#title')
    const authorField = renderedForm.querySelector('#author')
    const urlField = renderedForm.querySelector('#url')

    await user.type(titleField, 'test-title')
    await user.type(authorField, 'test-author')
    await user.type(urlField, 'test-url')

    const button = screen.getByText('Submit')
    await user.click(button)

    expect(addNewBlog.mock.calls).toHaveLength(1)
    expect(addNewBlog.mock.calls[0][0].title).toBe('test-title')
    expect(addNewBlog.mock.calls[0][0].author).toBe('test-author')
    expect(addNewBlog.mock.calls[0][0].url).toBe('test-url')
  })
})