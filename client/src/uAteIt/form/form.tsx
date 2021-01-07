import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar , Tabs, Tab, Box} from '@material-ui/core';
import './style.scss'
import DetailsTab from '../details-tab/details-tab'
import FoodTab from '../food-tab/food-tab'

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#ababab',
    width: '100%',
    float: 'right',
    height: '92%'
  },
}));
interface IProps {
  email: any
  logout: () => void
}

export default function Form({email, logout}: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [foodList, setFoodList] = React.useState([]);
  const [elseValue, setElseValue] = React.useState('');
  const [selectedBeer, setSelectedBeer] = React.useState('');
  const [privateDetails, setPrivateDetails] = React.useState({email: email, firstName:'', lastName:'', birthday:'', id:'', phone:''})

  const bringFoodList = async () =>{
    getfoodsList()
      .then((res: any) => {
        setFoodList(res)})
          .catch((err: any) => console.log(err));
  }

  const getfoodsList = async () => {
    const response = await fetch('/favoritFoodOptions');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const insertNewFoodOptionToDB = async () => {
    const data =  elseValue
    await fetch('/favoritFoodOptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const insertUser = async () => {
    const data =  {'email': email}

    await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  
  const insertPrivateDetails = async () => {
    const data = {...privateDetails, email: email}
    await fetch('/privateDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const insertfavoritFood = async (favoritFoodselected: any) => {
    const filterSelectedFood = Object.fromEntries(Object.entries(favoritFoodselected).filter(([key, value]) => value === true))
    var selectedFood = Object.keys(filterSelectedFood).map((key) => [email, key]);
    const data = selectedFood
    await fetch('/favoritFood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const insertFavoriteBeer = async () => {
    const data = {email: email, favoriteFoodOrBeer: selectedBeer}
    await fetch('/favoritBeer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const submit = async (favoritFoodselected: any) => {
    elseValue!=='' && insertNewFoodOptionToDB()
    insertUser()
    insertPrivateDetails()
    insertfavoritFood(favoritFoodselected)
    selectedBeer !== '' && insertFavoriteBeer()
    logout()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="פרטים אישיים" />
          <Tab label="מאכלים אהובים" />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} >
          <DetailsTab 
            setSelectedBeer = {setSelectedBeer}
            onSubmit={()=>{
              setValue(1)
              bringFoodList()
            }}
            setPrivateDetails= {setPrivateDetails}
          />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <FoodTab 
            foodList = {foodList}
            onSubmit={submit}
            setElseValueMainForm={setElseValue}
          />
        </TabPanel>
    </div>
  );
}