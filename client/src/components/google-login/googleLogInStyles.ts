import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  bold: {
    fontWeight: 700
  },
  GoogleLogInContainer: {
    height: '91%',
    '& button': {
      width: '400px',
      marginTop: '80px',
      height: '70px',
      backgroundColor: 'currentColor !important',
    
      '& div': {
        height: '44px',
        width: '40px',
        border: '3px solid dimgray',
        '& svg': {
          marginTop: '13px',
          '& path': {
            fill: 'black',
          },
          '& path:nth-child(5)' :{
            fill: 'none',   
          }
        },
      },
      '& span': {
        color: 'white',
        fontSize: '20px',
        margin: '0 auto',
      }
    },
  }
});
export default useStyles

