import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar , Tabs, Tab, Box} from '@material-ui/core';
import './style.scss'
import DetailsTab from '../details-tab/details-tab.component'
import FoodTab from '../food-tab/food-tab.component'

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
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
  const tempFavoritFoodList =  [{key: "pastrama", value: "פסטרמה"}]
  const [foodList, setFoodList] = React.useState(tempFavoritFoodList);
  const [elseValue, setElseValue] = React.useState('');
  const [favoritFood, setFavoritFood] = React.useState([]);
  const [privateDetails, setPrivateDetails] = React.useState({email: email, firstName:'', lastName:'', birthday:'', id:'', phone:''})

  React.useEffect(() => {
    getfoodsList()
          .then((res: { foodslist: React.SetStateAction<{ key: string; value: string; }[]>; }) => setFoodList(res.foodslist))
          .catch((err: any) => console.log(err));
  });

  const getfoodsList = async () => {
    const response = await fetch('/form/foodslist');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const addElseValue = async () => {
    const data = [...foodList, elseValue]
    await fetch('/form/elsevalue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const insertNewFoodOptionToDB = async () => {
    const data =  {'option': elseValue}
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

  const insertfavoritFood = async () => {
    const data = {...favoritFood, favoritBeer: 'negev', email: email}
    await fetch('/favoritFood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const submit = async () => {
    elseValue!=='' && addElseValue();
    elseValue!=='' && insertNewFoodOptionToDB()
    insertUser()
    insertPrivateDetails()
    // insertfavoritFood()
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
            onSubmit={()=>setValue(1)}
            setPrivateDetails= {setPrivateDetails}
          />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <FoodTab 
            foodList = {foodList}
            onSubmit={submit}
            setElseValueMainForm={setElseValue}
            setFavoritFood = {setFavoritFood}
          />
        </TabPanel>
    </div>
  );
}