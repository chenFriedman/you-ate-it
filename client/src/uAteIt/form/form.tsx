import React from 'react';
import { AppBar , Tabs, Tab } from '@material-ui/core';
import axios from 'axios'

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
  const [newFoodOptionObject, setNewFoodOptionObject] = React.useState({key: '', value:''});
  const [selectedBeer, setSelectedBeer] = React.useState('');
  const [privateDetails, setPrivateDetails] = React.useState({email: email, firstName:'', lastName:'', birthday:'', id:'', phone:''})
  const successResponseStatus = 200
  React.useEffect(() => {
    getBeerList()
  }, []);

  const getBeerList = async () => {
    axios.get('/beerList')
    .then(response => {
      if (response.status !== successResponseStatus) throw Error(response.statusText);
        setBeerList(response.data)
    });
  };

  const getfoodsList = async () => {
    axios.get('/favoritFoodOptions')
    .then(response => {
      if (response.status !== successResponseStatus) throw Error(response.statusText);
      setFoodList(response.data)
    });
  }

  const insertNewFoodOptionToDB = async () => {
console.log(newFoodOptionObject)
    await axios.post('/favoritFoodOptions', {
      key: newFoodOptionObject.key,
      value: newFoodOptionObject.value
    })
  }

  const insertUser = async () => {
    await axios.post('/users', {
      email: email
    })
  }
  
  const insertPrivateDetails = async () => {
    await axios.post('/privateDetails', {
      ...privateDetails,
      email: email
    })
  }

  const insertfavoritFood = async (favoritFoodselected: any) => {
    const filterSelectedFood = Object.fromEntries(Object.entries(favoritFoodselected).filter(([key, value]) => value === true))
    var selectedFood = Object.keys(filterSelectedFood).map((key) => [email, key]);
    await axios.post('/favoritFood', {
      selectedFood
    })
  }

  const insertFavoriteBeer = async () => {
    await axios.post('/favoritBeer', {
      email: email, 
      favoriteFoodOrBeer: selectedBeer
    })
  }

  const submit = async (favoritFoodselected: any) => {
    newFoodOptionObject.key!=='' && insertNewFoodOptionToDB()
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
            setNewFoodOptionObject={setNewFoodOptionObject}
          />
        </TabPanel>
    </div>
  );
}