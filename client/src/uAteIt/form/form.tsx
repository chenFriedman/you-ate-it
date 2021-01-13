import React from 'react';
import { AppBar , Tabs, Tab } from '@material-ui/core';

import './style.scss'
import useStyles from './formStyles'
import TabPanel from '../tab-panel/tabPanel'
import DetailsTab from '../details-tab/details-tab'
import FoodTab from '../food-tab/food-tab'

interface IProps {
  email: any
  logout: () => void
}

export default function Form({email, logout}: IProps) {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = React.useState(0);
  const [foodList, setFoodList] = React.useState([]);
  const [beerList, setBeerList] = React.useState(0);
  const [newFoodOptionValue, setNewFoodOptionValue] = React.useState('');
  const [selectedBeer, setSelectedBeer] = React.useState('');
  const [privateDetails, setPrivateDetails] = React.useState({email: email, firstName:'', lastName:'', birthday:'', id:'', phone:''})
  const successResponseStatus = 200
  React.useEffect(() => {
    getBeerList()
  }, []);

  const getBeerList = async () => {
    const response = await fetch('/beerList');
    const res = await response.json();
    if (response.status !== successResponseStatus) throw Error(res.message);
    setBeerList(res)
  };

  const getfoodsList = async () => {
    const response = await fetch('/favoritFoodOptions');
    const body = await response.json();
    if (response.status !== successResponseStatus) throw Error(body.message);
    setFoodList(body)
  }

  const insertNewFoodOptionToDB = async () => {
    const data =  newFoodOptionValue
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
    await fetch('/favoritFood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedFood),
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
    newFoodOptionValue!=='' && insertNewFoodOptionToDB()
    insertUser()
    insertPrivateDetails()
    insertfavoritFood(favoritFoodselected)
    selectedBeer !== '' && insertFavoriteBeer()
    logout()
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={tabNumber}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='פרטים אישיים' />
          <Tab label='מאכלים אהובים' />
        </Tabs>
      </AppBar>
        <TabPanel value={tabNumber} index={0} >
          <DetailsTab 
            setSelectedBeer = {setSelectedBeer}
            onSubmit={()=>{
              setTabNumber(1)
              getfoodsList()
            }}
            setPrivateDetails= {setPrivateDetails}
            beerList = {beerList}
          />
        </TabPanel>
        <TabPanel value={tabNumber} index={1} >
          <FoodTab 
            foodList = {foodList}
            onSubmit={submit}
            setNewFoodOptionValueMainForm={setNewFoodOptionValue}
          />
        </TabPanel>
    </div>
  );
}