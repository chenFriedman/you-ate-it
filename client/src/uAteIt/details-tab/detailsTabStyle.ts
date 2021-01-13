import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formContainer: {
    direction: 'rtl',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '70px 40px 70px 70px',
    '& input': {
      margin: '10px',
    },
    '& select': {
      margin: '10px',
    },
  },
  beerField: {
    width: '170px',
    margin: '30px',
    '& label': {
      fontSize: '0.8rem',
    },
    '& div': {
      width: '170px'
    }
  },
  }
);
export default useStyles


 