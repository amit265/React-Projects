import React from 'react'

const comments = [
    {
        name: "amit",
        text: "lorem ipsum",
        replies: [{
            name: "amit",
            text: "lorem ipsum",
            replies: [
                
            ]
        },
            
        ]
    },

    {
        name: "amit",
        text: "lorem ipsum",
        replies: [
            
        ]
    },
    {
        name: "amit",
        text: "lorem ipsum",
        replies: [
            
        ]
    },
    {
        name: "amit",
        text: "lorem ipsum",
        replies: [
            
        ]
    },
]

const CommentsContainer = () => {
  return (
    <div>
      <h1 className='shadow-lg'>Commments:</h1>
    </div>
  )
}

export default CommentsContainer
