import React from 'react';
import GoogleLogin from 'react-google-login';
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'

import useStyles from './googleLogInStyles'

interface IProps {
  onSubmit: (value: boolean) => void
  setUserName: (value: string) => void
  setEmail: (value: string) => void
}

export const GoogleLogIn: React.FC<IProps> = ({onSubmit, setUserName, setEmail}: IProps) => {
  const classes = useStyles();
  const responseGoogle = (response: any) => {
    onSubmit(true);
    setUserName(response.profileObj.name);
    setEmail(response.profileObj.email)
  }
  return (
    <div className={classes.GoogleLogInContainer} id='google-login-container'>
      <Box
        display="flex" 
        flexDirection= 'column'
        height= '75%'
        margin= '0 auto'
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" >ברוכים הבאים ל<span className={classes.bold}>אכלת אותה</span>! בואו נתחבר ומיד נתחיל</Typography>
        
        <GoogleLogin
          clientId="775424750969-lhsc55apvg63m3djgasblo51mlmsgu6b.apps.googleusercontent.com"
          buttonText="Sign in With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Box>
    </div>
  )
}
export default GoogleLogIn

