import * as React from 'react'
import './style.scss'

import Header from './header/header.component'
import GoogleLogIn from './google-login/googleLogIn.component'
import Form from './form/form.component'

export const YouAteIt: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  
  return (
    <div className='youAteIt-container'>
      <Header isLoggedIn={isLoggedIn} userName={userName}/>
      {!isLoggedIn && <GoogleLogIn onSubmit={setIsLoggedIn} setUserName={setUserName} setEmail={setEmail}/>}
      {isLoggedIn && userName && <Form email={email}/>}
    </div>
  )
}
export default YouAteIt

