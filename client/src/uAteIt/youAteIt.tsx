import * as React from 'react'
import useStyles from './youAteItStyles'
import Header from './header/header'
import GoogleLogIn from './google-login/googleLogIn'
import Form from './form/form'

export const YouAteIt: React.FC = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const logout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setEmail('')
  }
  
  return (
    <div className={classes.youAteItContainer}>
      <Header isLoggedIn={isLoggedIn} userName={userName}/>
      {isLoggedIn && userName ? <Form email={email} logout={logout}/>
       : <GoogleLogIn onSubmit={setIsLoggedIn} setUserName={setUserName} setEmail={setEmail}/> }
    </div>
  )
}
export default YouAteIt

