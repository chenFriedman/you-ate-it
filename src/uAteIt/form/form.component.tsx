import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar , Tabs, Tab, Box, Button} from '@material-ui/core';
import './style.scss'
import FormTab from '../form-tab/form-tab.component'

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
    height: '100%'
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [ isPrivateDetailsSubmited, setIsPrivateDetailsSubmited] = React.useState(false)
  const [ isFavoriteFoodsSubmited, setIsFavoriteFoodsSubmited] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
          <FormTab 
            tabNumber={1} 
            setIsFormSubmited={setIsPrivateDetailsSubmited}
          />
          <Button variant="contained" color="primary">המשך</Button>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <FormTab 
            tabNumber={2}
            setIsFormSubmited={setIsFavoriteFoodsSubmited}
          />
          <Button variant="contained" color="primary">סיום</Button>
        </TabPanel>
    </div>
  );
}



