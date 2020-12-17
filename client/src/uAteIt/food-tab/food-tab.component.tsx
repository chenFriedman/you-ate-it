import React from 'react';
import {Checkbox, FormControlLabel, FormControl, TextField, Button} from '@material-ui/core';
import './style.scss'

  interface IProps {
    onSubmit: () => void
    foodList: any
  }

  export default function FoodTab({onSubmit, foodList}: IProps) {

  const emptyFoodFormState: any= { pastrama: false, brokoli: false, regel: false, bread: false, meatball: false, else: false}
  const [foodFormState, setFoodFormState] = React.useState(emptyFoodFormState)
  const [elseValue, setElseValue] = React.useState('')
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)

  const updateFormStatus = () => {
    setIsFormValid(true)
    showErrorMsg && setShowErrorMsg(false)
  }
  
  const renderFavoriteFoodsTab = () => {
    const options = foodList.map((option: { key: string; value: string }) => (
      <FormControlLabel
        key={option.key}
        control={
          <Checkbox 
            color="primary" 
            value={foodFormState[option.key]} 
            onChange={() => {
              setFoodFormState({...foodFormState, [option.key] : !foodFormState[option.key]})
              !foodFormState[option.key] && !isFormValid && updateFormStatus()
            }}
          />
        }
        label={option.value}
        labelPlacement="start"
      />
    ));

    return ( 
        <FormControl component="fieldset" className='favoriteFoodForm'>
            {options}
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  value={foodFormState.else} 
                  onChange={() => {
                    setFoodFormState({...foodFormState, else: !foodFormState.else}); 
                    !foodFormState.else && elseValue && !isFormValid && updateFormStatus()
                  }}
                />
              }
              label="אחר"
              labelPlacement="start"
            />
            {foodFormState.else && <TextField 
              id="field" 
              label="הקלד מאכל אחר" 
              value={elseValue}
              onChange={e => setElseValue(e.target.value)}
            />}
        </FormControl>
    );
  }

  return (
    <div className='form-container'>
      <div className='subtitle'>אנה בחר את המאכלים האהובים עליך</div>
      {renderFavoriteFoodsTab()}
      {showErrorMsg && <div>please check at least one field</div>}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={isFormValid ? onSubmit : () => setShowErrorMsg(true)}>סיום</Button>
    </div>
  );
}