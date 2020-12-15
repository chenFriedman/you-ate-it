import React from 'react';
import GoogleLogin from 'react-google-login';
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import './style.scss'

interface IProps {
  onSubmit: (value: boolean) => void
  setUserName: (value: string) => void
}

export const GoogleLogIn: React.FC<IProps> = ({onSubmit, setUserName}: IProps) => {
  
  const responseGoogle = (response: any) => {
    onSubmit(true);
    setUserName(response.profileObj.name);
    // console.log("LoginScreen.js.js 21 | ", result.user.givenName, result.user.familyName, result.user.email, result.user.photoUrl);

  }
  
  return (
    <div className='Google-log-in-container'>
      <Box
        display="flex" 
        flexDirection= 'column'
        height= '75%'
        margin= '0 auto'
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" >ברוכים הבאים ל<span className='bold'>אכלת אותה</span>! בואו נתחבר ומיד נתחיל</Typography>
        
        <GoogleLogin
          clientId="775424750969-lhsc55apvg63m3djgasblo51mlmsgu6b.apps.googleusercontent.com"
          buttonText="Sign in With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          style={{width: '500px' }}
        />
      </Box>
    </div>
  )
}
export default GoogleLogIn

