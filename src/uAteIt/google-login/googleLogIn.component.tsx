import React from 'react';
import GoogleLogin from 'react-google-login';
import { Typography } from '@material-ui/core'

interface IProps {
  onSubmit: (value: boolean) => void
}

export const GoogleLogIn: React.FC<IProps> = ({onSubmit}: IProps) => {
  
  const responseGoogle = (response: any) => {
    console.log(response);
    onSubmit(true);
  }
  
  return (
    <div className='Google-log-in-container'>
      <Typography>ברוכים הבאים ל<span>אכלת אותה</span>! בואו נתחבר ומיד נתחיל</Typography>
      <GoogleLogin
        clientId="775424750969-itta4blbm33jlolla4fm0bvsqo6lkct8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
export default GoogleLogIn

