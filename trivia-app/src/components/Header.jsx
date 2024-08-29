import React from 'react'
import LogoutButton from './LogoutButton'

const Header = ({user}) => {

  console.log(user?.displayName.split(" ")[0]);
  return (
        <div className="flex justify-center items-center p-4">
        {user && <img
          src={user?.photoURL}
          alt={user?.diaplayName}
          className="rounded-full"
        />}
        <h1 className="text-2xl text-center px-4">Welcome, {user ? user?.displayName.split(" ")[0] : "user"}!</h1>
        <LogoutButton user={user}/>
      </div>
  )
}

export default Header
