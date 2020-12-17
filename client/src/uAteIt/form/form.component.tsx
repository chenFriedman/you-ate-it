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
  
}

export default function Form({email}: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const tempFavoritFoodList =  [{key: "pastrama", value: "פסטרמה"}]
  const [foodList, setFoodList] = React.useState(tempFavoritFoodList);

  React.useEffect(() => {
    getfoodsList()
          .then((res: { foodslist: React.SetStateAction<{ key: string; value: string; }[]>; }) => setFoodList(res.foodslist))
          .catch((err: any) => console.log(err));
  });

  const getfoodsList = async () => {
    const response = await fetch('/api/getfoodslist');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const submit = () => {
    console.log('submit', email)    
    //send api post request with all the data
    //logout the user
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
          />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <FoodTab 
            foodList = {foodList}
            onSubmit={submit}
          />
        </TabPanel>
    </div>
  );
}