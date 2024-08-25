import React from 'react'
import LogoutButton from './LogoutButton'

const Header = ({user}) => {
  return (
        <div className="flex justify-between items-center p-4">
        <img
          src={user.photoURL}
          alt="user.diaplayName"
          className="rounded-full"
        />
        <h1 className="text-2xl">Welcome, {user.displayName}!</h1>
        <LogoutButton />
      </div>
  )
}

export default Header
