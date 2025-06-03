import React from 'react'
import {Button} from 'dpl-react'
import {Link} from 'react-router-dom'

export default function BtnAnswerLink(props) {
  const {onClick, className = '', style = {},to=''} = props
  return (
    <Button  type="primary-bordered" icon="edit" className={`card-btn ${className}`} style={style}>
    <Link key='problemDetail'
                  target="_blank"
                  to={to}
          style={{marginLeft:4}}
          onClick={onClick}
        >写回答</Link>
    </Button>
  )
}
