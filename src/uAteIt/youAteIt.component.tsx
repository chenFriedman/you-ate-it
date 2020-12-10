import * as React from 'react'
// import 'youAteIt.scss'
import './style.scss'

import Header from './header/header.component'
import GoogleLogIn from './google-login/googleLogIn.component'
import Form from './form/form.component'

export const YouAteIt: React.FC = (//{ parentId, onClose }: IProps
    ) => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const [showCongratulationsPaymentTab, setShowCongratulationsPaymentTab] = React.useState(false);

  // const renderHeader = () => {
  //   return (
  //     <div className='header-container'>
  //     </div>
  //   )
  // }
  
  return (
    <div className='youAteIt-container'>
      <Header />
      {!isLoggedIn && <GoogleLogIn onSubmit={setIsLoggedIn}/>}
      {isLoggedIn && <Form />}
     
    </div>
  )
}
export default YouAteIt

