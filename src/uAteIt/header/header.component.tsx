import * as React from 'react'
import './style.scss'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Avatar } from '@material-ui/core'

interface IProps {
//   onClose: () => void
//   parentId: string  
}

export const YouAteIt: React.FC<IProps> = () => {

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
  
  return (
    <div className='header-container'>
     <Grid
        container
        direction="row"
        justify='center'
        alignItems="center"
      >
        <Typography className='title'>אכלת אותה</Typography>
        <Avatar src='../../images/hamburger.jpeg' />
        </Grid>
    </div>
  )
}
export default YouAteIt

