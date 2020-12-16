import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar , Tabs, Tab, Box, Button} from '@material-ui/core';
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

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const tempFavoritFoodList =  [
    {key: "pastrama", value: "פסטרמה"},
    // {key: "brokoli", value: "ברוקולי"},
    // {key: "regel", value: "רגל"},
    // {key: "bread", value: "לחם מחמצת"},
    // {key: "meatball", value: "קציצת סרטן"}
]
  const [foodList, setFoodList] = React.useState(tempFavoritFoodList);
  const [ isPrivateDetailsSubmited, setIsPrivateDetailsSubmited] = React.useState(false)
  const [ isFavoriteFoodsSubmited, setIsFavoriteFoodsSubmited] = React.useState(false)

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
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const submit = () => {
    console.log('submit')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
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
            setIsFormSubmited={setIsPrivateDetailsSubmited}
          />
          <Button variant="contained" color="primary" onClick={()=>setValue(1)}>המשך</Button>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <FoodTab 
            foodList = {foodList}
            setIsFormSubmited={setIsFavoriteFoodsSubmited}
          />
          <Button variant="contained" color="primary" onClick={submit}>סיום</Button>
        </TabPanel>
    </div>
  );
}