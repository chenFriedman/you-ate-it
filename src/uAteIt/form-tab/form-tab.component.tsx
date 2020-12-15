import React from 'react';
import {TextField, Select, InputLabel, Checkbox, FormControlLabel, FormControl} from '@material-ui/core';
import './style.scss'
  interface IProps {
    tabNumber: any
    setIsFormSubmited: (value: boolean) => void
  }

  export default function FormTab({tabNumber, setIsFormSubmited}: IProps) {

  const emptyFormState: any= { firstName:'', lastName:'', birthday:'', id:'', phone:'', beer:''}
  const [formState, setFormState] = React.useState(emptyFormState)

  const emptyFoodFormState: any= { pastrama: false, brokoli: false, regel: false, bread: false, meatball: false, else: false}
  const [foodFormState, setFoodFormState] = React.useState(emptyFoodFormState)
  const checkAllowdBeer = (birtday: any) => {
  }

  const checkIfElseEntered = () => {
  }

  const renderPrivatDetailsTab = () => {
    return (  
      <form noValidate autoComplete="off">
        { tabNumber===1 && <div className='form-container'>
          <span className='row'>
            <TextField 
              id="field" 
              label="שם פרטי" 
              value={formState.firstName}
              onChange={e => setFormState({...formState, firstName: e.target.value})}
            />
            <TextField 
              id="field" 
              label="שם משפחה" 
              value={formState.lastName}
              onChange={e => setFormState({...formState, lastName: e.target.value})}
            />
          </span>
          <span className='row'>
            <TextField
              id="date field"
              label="תאריך לידה"
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
            <span className='beer-field'>
              <InputLabel id="demo-simple-select-label field">
                ?מה הבירה האהובה עליך</InputLabel>
              <Select
                id="field" 
                native
                value={formState.beer}
                onChange={e => setFormState({...formState, beer: e.target.value})}
              >
                <option aria-label="None" value="" />
                <option value={'goldstar'}>goldstar</option>
                <option value={'bazelet'}>bazelet</option>
              </Select>
            </span>
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
        </div>}
      </form>
    );
  }

  const renderFavoriteFoodsTab = () => {
    return ( 
      <div className='form-container'>
        <div className='subtitle'>אנה בחר אתהמאכלים האהובים עליך</div>
        <FormControl component="fieldset" className='favoriteFoodForm'>
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.pastrama} 
                  onChange={() => setFoodFormState({...foodFormState, pastrama: !foodFormState.pastrama})}
                />
              }
              label="פסטרמה"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.pastrama} 
                  onChange={() => setFoodFormState({...foodFormState, pastrama: !foodFormState.pastrama})}
                />
              }
              label="ברוקולי"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.pastrama} 
                  onChange={() => setFoodFormState({...foodFormState, pastrama: !foodFormState.pastrama})}
                />
              }
              label="רגל כרושה"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.pastrama} 
                  onChange={() => setFoodFormState({...foodFormState, pastrama: !foodFormState.pastrama})}
                />
              }
              label="לחם מחמצת"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.pastrama} 
                  onChange={() => setFoodFormState({...foodFormState, pastrama: !foodFormState.pastrama})}
                />
              }
              label="קציצת סרטן"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.pastrama} 
                  onChange={() => setFoodFormState({...foodFormState, pastrama: !foodFormState.pastrama})}
                />
              }
              label="אחר"
              labelPlacement="start"
            />
        </FormControl>
      </div>
    );
  }

  return (
    <>
    {tabNumber===1 && renderPrivatDetailsTab()}
    {tabNumber===2 && renderFavoriteFoodsTab()}
   </>
  );
}











