import React from 'react'
import LogoutButton from './LogoutButton'

const Header = ({user}) => {
  return (
        <div className="flex justify-center items-center p-4">
        {user && <img
          src={user?.photoURL}
          alt={user?.diaplayName}
          className="rounded-full"
        />}
        <h1 className="text-2xl text-center">Welcome, {user ? user?.displayName : "user"}!</h1>
        <LogoutButton user={user}/>
      </div>
  )
}

export default Header
