import React from 'react'

const SkillsCapsule = ({text,Icon, color}) => {
  return (
    <div className='border border-zinc-400 flex flex-col items-center p-2 min-w-18 rounded'>
        <Icon className={`${color} w-10 h-10`} />
        <p>{text}</p>

    </div>
  )
}

export default SkillsCapsule