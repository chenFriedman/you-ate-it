import React from 'react';
import {Checkbox, FormControlLabel, FormControl, TextField} from '@material-ui/core';
import './style.scss'

  interface IProps {
    setIsFormSubmited: (value: boolean) => void
    foodList: any
  }

  export default function FoodTab({setIsFormSubmited, foodList}: IProps) {

  const emptyFoodFormState: any= { pastrama: false, brokoli: false, regel: false, bread: false, meatball: false, else: false}
  const [foodFormState, setFoodFormState] = React.useState(emptyFoodFormState)
  const [elseValue, setElseValue] = React.useState('')

  const renderFavoriteFoodsTab = () => {
    const options = foodList.map((option: { key: string; value: string }) => (
      <FormControlLabel
        key={option.key}
        control={
          <Checkbox 
            color="primary" 
            value={foodFormState[option.key]} 
            onChange={() => setFoodFormState({...foodFormState, [option.key] : !foodFormState[option.key]})}
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
                  onChange={() => {setFoodFormState({...foodFormState, else: !foodFormState.else}); console.log(foodFormState)}}
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
      <div className='subtitle'>אנה בחר אתהמאכלים האהובים עליך</div>
      {renderFavoriteFoodsTab()}
    </div>
  );
}