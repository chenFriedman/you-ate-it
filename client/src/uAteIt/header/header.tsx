import * as React from 'react'
import './style.scss'
import { Grid, Typography, Avatar } from '@material-ui/core'

interface IProps {
  isLoggedIn: boolean
  userName: string
}

export const YouAteIt: React.FC<IProps> = ({isLoggedIn, userName}: IProps) => {
  return (
    <div className='header-container'>
     <Grid
        container
        direction="row"
        justify='space-between'
        alignItems="center"
      >
        <div className='logo'>
          <Typography className='title'>אכלת אותה</Typography>
          <Avatar src='/hamburger.jpeg' />
        </div>
        {isLoggedIn && userName && <Typography className='title'><span className='bold'>{userName}</span> שלום </Typography>}
        </Grid>
    </div>
  )
}
export default YouAteIt

