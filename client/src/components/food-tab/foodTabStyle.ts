import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '70px 40px 70px 70px',
  },
  subtitle: {
    textAlign: 'right',
    marginBottom: '30px',
  },
  field: {
    textAlign: 'right'
  },
  row: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  favoriteFoodForm: {
    border: '3px solid #F6F6F6',
    boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.15)',
    padding: '30px',
  }
}
);
export default useStyles


 