import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
  title:'test-title',
  author:'test-author',
  url:'test-url',
  likes:4121468725,
  user:{
    username:'test-user',
    token:'test-token',
    name:'test-name'
  }
}

describe('<Blog />', () => {
  let renderedBlog
  beforeEach(() => {
    renderedBlog = render(<Blog blog={blog} />).container
  })

  test('title is rendered', () => {
    const titleElementByText = screen.queryByText('test-title', { exact: false })
    const titleElementByClassname = renderedBlog.querySelector('.blogTitleAndAuthor')
    expect(titleElementByText).toBeDefined()
    expect(titleElementByClassname).toBeDefined()
  })

  test('author is rendered', () => {
    const authorElementByText = screen.queryByText('test-author', { exact: false })
    const authorElementByClassname = renderedBlog.querySelector('.blogTitleAndAuthor')
    expect(authorElementByText).toBeDefined()
    expect(authorElementByClassname).toBeDefined()
  })

  test('url is not rendered before clicking show button', () => {
    const urlElementByText = screen.queryByText('test-url', { exact: false })
    const urlElementByClassname = renderedBlog.querySelector('.blogUrl')
    expect(urlElementByText).toBeNull()
    expect(urlElementByClassname).toBeNull()
  })

  test('likes is not rendered before clicking show button', () => {
    const likesElementByText = screen.queryByText('4121468725', { exact: false })
    const likesElementByClassname = renderedBlog.querySelector('.blogLikes')
    expect(likesElementByText).toBeNull()
    expect(likesElementByClassname).toBeNull()
  })
})

describe('<Blog /> after clicking show button', () => {

  let renderedBlog
  const incrementLikesMock = jest.fn()
  let user
  beforeEach( async () => {
    renderedBlog = render(<Blog blog={blog} incrementLikesOfBlog={incrementLikesMock} />).container
    user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)
  })

  test('likes is rendered', () => {
    const likesElementByClassname = renderedBlog.querySelector('blogLikes')
    const likesElementByText = screen.queryByText('4121468725', { exact:false })

    expect(likesElementByClassname).toBeDefined()
    expect(likesElementByText).toBeDefined()
  })
  test('url is rendered', () => {
    const urlElementByClassname = renderedBlog.querySelector('.blogUrl')
    const urlElementByText = screen.queryByText('test-url', { exact:false })

    expect(urlElementByClassname).toBeDefined()
    expect(urlElementByText).toBeDefined()
  })

  test('clicking like button twice calls function twice', async () => {
    const button = renderedBlog.querySelector('.likeButton')
    await user.click(button)
    await user.click(button)
    expect(incrementLikesMock.mock.calls).toHaveLength(2)
  })
})