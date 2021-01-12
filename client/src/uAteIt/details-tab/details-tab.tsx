import React from 'react';
import { useForm } from "react-hook-form";
import './style.scss';
  interface IProps {
    onSubmit: () => void
    setPrivateDetails: (privateDetails: any) => void
    setSelectedBeer: (value: string) => void
    beerList: any
  }

  export const DetailsTab = ({onSubmit, setPrivateDetails, setSelectedBeer, beerList}: IProps) => {
  const [toShowBeerField, setToShowBeerField] = React.useState(false)

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
    } else {
      setToShowBeerField(false)
    }
  }

  const renderBeerOptions = () => {
    const options = beerList.map((beerOption: {} | null | undefined | any) => (
      <option key={beerOption} value={beerOption}>{beerOption}</option>
    ));

    return (
    <select
      id="field" 
      ref={register}
      name="beer"
    >
      <option aria-label="None" value="" />
      {options}
    </select>
    );
  }
  const nameErrorValidation =  /^[a-z\u0590-\u05fe]+$/i
  const { register, handleSubmit, errors  } = useForm();
  const onSubmitt = (data: any) => {
    setPrivateDetails(data)
    setSelectedBeer(data.beer)
    onSubmit()
  };
  return (
    <form onSubmit={handleSubmit(onSubmitt)} className='form-container'>
      <input 
        className='row'
        name="firstName" 
        type="text" 
        placeholder="שם פרטי" 
        ref={register({  pattern: nameErrorValidation, maxLength: 50, required: true,})}
      />
      {errors.firstName && <span>שם מכיל אותיות בלבד</span>}
      
      <input 
        name="lastName" 
        type="text" 
        placeholder="שם משפחה" 
        ref={register({ required: true, pattern: nameErrorValidation, maxLength: 50 })} 
      />
      {errors.lastName && <span>שם מכיל אותיות בלבד</span>}
     
      <input 
        name="birthdate" 
        type="date" ref={register({ required: true})} 
        onChange={ e => {checkAllowdBeer(e.target.value)}}
      />
      {errors.birthdate && <span>לא ניתן לבחור תאריך עתידי</span>}
      
      <input 
        name="id" 
        placeholder="ת.ז" 
        ref={register({ required: true })}
      />
      {errors.id && <span>This field is required</span>}
      
      <input 
        name="phone"
        placeholder="טלפון" 
        ref={register({ required: true })}
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