import React from 'react';
import { Checkbox, FormControlLabel, FormControl, TextField, Button } from '@material-ui/core';

import useStyle from './foodTabStyle'

interface foodList {
  [key : string]: Boolean;
}

interface foodArrayObj {
  id: Number;
  value: string;
  key: string
} 

interface IProps {
  onSubmit: (favoritFoodselected: foodList) => void
  foodList: Array<foodArrayObj>
  setNewFoodOptionObject: (value: {key: string; value: string}) => void
}

export default function FoodTab({ onSubmit, foodList, setNewFoodOptionObject,
}: IProps) {

  const emptyFoodFormState: foodList = { else: false }
  const [foodFormState, setFoodFormState] = React.useState(emptyFoodFormState)
  const [newFoodOptionValue, setNewFoodOptionValue] = React.useState('')
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)

  const classes = useStyle()

  React.useEffect(() => {
    foodList.map((x: { key: string; }) => {
      const val = x.key
      emptyFoodFormState[val] = false
    })
  }, []);

  const updateFormValidStatus = () => {
    setIsFormValid(true)
    showErrorMsg && setShowErrorMsg(false)
  }

  const elseValueEntered = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (foodFormState.else) {
      setNewFoodOptionValue(e.target.value)
      const elseObject = { "key": e.target.value, "value": e.target.value }
      setNewFoodOptionObject(elseObject)
    }
  }

  const submit = () => {
    if (isFormValid) {
      let temp: foodList = foodFormState
      if (foodFormState.else) {
        let tmpelseValue = newFoodOptionValue
        temp[tmpelseValue] = true
      }
      delete temp.else;
      onSubmit(temp)
    } else {
      setShowErrorMsg(true)
    }
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
              setFoodFormState({ ...foodFormState, [option.key]: !foodFormState[option.key] })
              !foodFormState[option.key] && !isFormValid && updateFormValidStatus()
            }}
          />
        }
        label={option.value}
        labelPlacement="start"
      />
    ));

    return (
      <FormControl component="fieldset" className={classes.favoriteFoodForm}>
        {options}
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              value={foodFormState.else}
              onChange={() => {
                setFoodFormState({ ...foodFormState, else: !foodFormState.else });
              }}
            />
          }
          label="אחר"
          labelPlacement="start"
        />
        {foodFormState.else && <TextField
          className={classes.field}
          label="הקלד מאכל אחר"
          value={newFoodOptionValue}
          onChange={e => {
            elseValueEntered(e)
            foodFormState.else && newFoodOptionValue !== '' && updateFormValidStatus()
          }}
        />}
      </FormControl>
    );
  }

  return (
    <div className={classes.formContainer}>
      <div className={classes.subtitle}>אנה בחר את המאכלים האהובים עליך</div>
      {renderFavoriteFoodsTab()}
      {showErrorMsg && <div>please check at least one field</div>}
      <Button
        variant="contained"
        color="primary"
        onClick={isFormValid ? submit : () => setShowErrorMsg(true)}>סיום
      </Button>
    </div>
  );
}