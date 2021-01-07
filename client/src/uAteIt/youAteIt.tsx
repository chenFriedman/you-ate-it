import * as React from 'react'
import './style.scss'

import Header from './header/header'
import GoogleLogIn from './google-login/googleLogIn'
import Form from './form/form'

export const YouAteIt: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const logout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setEmail('')
  }
  
  return (
    <div className='youAteIt-container'>
      <Header isLoggedIn={isLoggedIn} userName={userName}/>
      {!isLoggedIn && <GoogleLogIn onSubmit={setIsLoggedIn} setUserName={setUserName} setEmail={setEmail}/>}
      {isLoggedIn && userName && <Form email={email} logout={logout}/>}
    </div>
  )
}
export default YouAteIt

