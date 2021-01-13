import React from 'react';
import { useForm } from "react-hook-form";
import './style.scss';
import moment from 'moment'
interface IProps {
  onSubmit: () => void
  setPrivateDetails: (privateDetails: any) => void
  setSelectedBeer: (value: string) => void
  beerList: any
}

export const DetailsTab = ({ onSubmit, setPrivateDetails, setSelectedBeer, beerList }: IProps) => {
  const [toShowBeerField, setToShowBeerField] = React.useState(false)

  const checkAllowdBeer = (birtday: any) => {
    return moment().diff(birtday, 'years') > 18 ? setToShowBeerField(true) : setToShowBeerField(false)
  }

  const renderBeerOptions = () => {
    const options = beerList.map((beerOption: any) => (
      <option key={beerOption} value={beerOption}>{beerOption}</option>
    ));

    return (
      <select
        id="field"
        ref={requiredRef}
        name="beer"
      >
        <option aria-label="None" value="" />
        {options}
      </select>
    );
  }
  const nameErrorValidation = /^[A-Za-z\u0590-\u05fe]+$/
  const { register, handleSubmit, errors } = useForm();
  const onSubmitt = (data: any) => {
    setPrivateDetails(data)
    setSelectedBeer(data.beer)
    onSubmit()
  };
  const nameRef = register({ pattern: nameErrorValidation, maxLength: 50, required: true })
  const requiredRef = register({ required: true })
  return (
    <form onSubmit={handleSubmit(onSubmitt)} className='form-container'>
      <input
        className='row'
        name="firstName"
        type="text"
        placeholder="שם פרטי"
        ref={nameRef}
      />
      {errors.firstName && <span>שם מכיל אותיות בלבד</span>}

      <input
        name="lastName"
        type="text"
        placeholder="שם משפחה"
        ref={nameRef}
      />
      {errors.lastName && <span>שם מכיל אותיות בלבד</span>}

      <input
        name="birthdate"
        type="date" ref={requiredRef}
        onChange={e => { checkAllowdBeer(e.target.value) }}
      />
      {errors.birthdate && <span>לא ניתן לבחור תאריך עתידי</span>}

      <input
        name="id"
        placeholder="ת.ז"
        ref={requiredRef}
      />
      {errors.id && <span>This field is required</span>}

      <input
        name="phone"
        placeholder="טלפון"
        ref={requiredRef}
      />
      {errors.phone && <span>This field is required</span>}

      {toShowBeerField &&
        <span className='beer-field'>
          <span> ?מה הבירה האהובה עליך</span>
          {renderBeerOptions()}
        </span>}
      <input type="submit" />
    </form>
  );
}
export default DetailsTab