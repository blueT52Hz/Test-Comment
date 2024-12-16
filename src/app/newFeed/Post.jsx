import React from 'react'
import MarkdownRenderer from './MarkdownRenderer'

export const Post = (props) => {
  return (
        <MarkdownRenderer className="markdown" id={props.post.id} content={props.post.content_markdown}>
            
        </MarkdownRenderer>
    )
}
