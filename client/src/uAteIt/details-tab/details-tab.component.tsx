import React from 'react';
import {TextField, Select, InputLabel, Button} from '@material-ui/core';
import './style.scss';
  interface IProps {
    onSubmit: () => void
    setPrivateDetails: (privateDetails: any) => void
  }

  export default function DetailsTab({onSubmit, setPrivateDetails}: IProps) {

  const emptyFormState: any= { firstName:'', lastName:'', birthday:'', id:'', phone:'', beer:''}
  const [formState, setFormState] = React.useState(emptyFormState)
  const [beersList, setbeersList] = React.useState([])
  const [toShowBeerField, setToShowBeerField] = React.useState(false)
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)

  const updateFormStatus = () => {
    if (formState.firstName && formState.lastName && formState.birthday &&  formState.id && formState.phone && (!toShowBeerField || formState.beer)) {
      setPrivateDetails({...formState})
      onSubmit()
      showErrorMsg && setShowErrorMsg(false)
    } else {
      setShowErrorMsg(true)
    }
  }

  const MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
  const get_age = (time: any) => {
      let date_array = time.split('-')
      let years_elapsed: any = 
        (+new Date() - +new Date(date_array[0],date_array[1],date_array[2]))
        /(MILLISECONDS_IN_A_YEAR);
      return years_elapsed; }


  const checkAllowdBeer = (birtday: any) => {
    if (get_age(birtday) > 18) {
      setToShowBeerField(true)
      getBeersList()
          .then(res => setbeersList(res.beerslist))
          .catch(err => console.log(err));
    }
    else {
      setToShowBeerField(false)
    }
  }

  const getBeersList = async () => {
    const response = await fetch('/form/beerslist');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const renderBeersOptions = () => {
    const options = beersList.map(beerOption => (
      <option key={beerOption} value={beerOption}>{beerOption}</option>
    ));

    return (
    <Select
      id="field" 
      native
      value={formState.beer}
      onChange={e => setFormState({...formState, beer: e.target.value})}
    >
      <option aria-label="None" value="" />
      {options}
    </Select>
    );
  }

  return (
    <form noValidate autoComplete="off">
        <div className='form-container'>
          <span className='row'>
            <TextField 
              id="field" 
              label="שם פרטי" 
              value={formState.firstName}
              onChange={e => setFormState({...formState, firstName: e.target.value})}
              error={formState.firstName!=='' && (!/^[a-z\u0590-\u05fe]+$/i.test(formState.firstName) || formState.firstName.length > 50)}
              helperText={formState.firstName!=='' && ( !/^[a-z\u0590-\u05fe]+$/i.test(formState.firstName) || formState.firstName.length > 50) ? 'שם מכיל אותיות בלבד' : ' '}
            />
            <TextField 
              id="field" 
              label="שם משפחה" 
              value={formState.lastName}
              onChange={e => setFormState({...formState, lastName: e.target.value})}
              error={formState.lastName!=='' && (!/^[a-z\u0590-\u05fe]+$/i.test(formState.lastName) || formState.lastName.length > 50)}
              helperText={ formState.lastName!=='' && (!/^[a-z\u0590-\u05fe]+$/i.test(formState.lastName) || formState.lastName.length > 50) ? 'שם מכיל אותיות בלבד' : ' '}
            />
          </span>
          <span className='row'>
            <TextField
              id="date field"
              label="תאריך לידה"
              error={get_age(formState.birthday) < 0 }
              helperText={get_age(formState.birthday) < 0 ? 'לא ניתן לבחור תאריך עתידי' : ' '}
              type="date"
              className={'date-field'}
              InputLabelProps={{
                shrink: true,
              }}
              value={formState.birthday}
              onChange={
                e => {
                  setFormState({...formState, birthday: e.target.value})
                  checkAllowdBeer(e.target.value)}}
            />
            { toShowBeerField && <span className='beer-field'>
              <InputLabel id="demo-simple-select-label field">
                ?מה הבירה האהובה עליך</InputLabel>
                {renderBeersOptions()}
            </span>}
          </span>
          <span className='row'>
            <TextField 
              id="field" 
              label="טלפון" 
              value={formState.phone}
              onChange={e => setFormState({...formState, phone: e.target.value})}
            />
          </span>
          <span className='row'>
            <TextField 
              id="field" 
              label="ת.ז" 
              value={formState.id}
              onChange={e => setFormState({...formState, id: e.target.value})}
            />
          </span>
        </div>
        {showErrorMsg && <div>please fill all fields</div>}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={updateFormStatus}>סיום
        </Button>
      </form>
    );
}