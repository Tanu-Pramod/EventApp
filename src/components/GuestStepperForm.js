import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormAddGuest from './FormAddGuest';

import ContactDetail from './ContactDetail';
import PersonalDetail from './PersonalDetail';
import AccountDetail from './AccountDetail';


export default function GuestStepperForm(props) {
  const steps = ['Personal Details', 'Contact Detail', 'Bank Detail'];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (newData) => {

    props.setGuestData(prev => ({ ...prev, ...newData }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    

    if(activeStep === step.length-1){
      props.setGuest([...props.guest,newData]);
      localStorage.setItem('guest_list',JSON.stringify([...props.guest,newData]));
      props.setGuestData({
        name:'',
        age:'',
        email:'',
        contact:'',
        account_no:''
  
      })
      
    }
  };
  React.useEffect(()=>{
    console.log("guestData",props.guestData)
  },[props.guestData])
  React.useEffect(()=>{
    console.log("newguest",props.guest)
  },[props.guest])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
   
    props.setGuestData({
      name:'',
      age:'',
      email:'',
      contact:'',
      account_no:''

    })
    
  };




  const step = [<PersonalDetail steps={steps} activeStep={activeStep} guestData={props.guestData} next={handleNext} />, <ContactDetail steps={steps} activeStep={activeStep} guestData={props.guestData} next={handleNext} back={handleBack} />, <AccountDetail steps={steps} activeStep={activeStep} guestData={props.guestData} next={handleNext} back={handleBack} />]








  return (

    <Box sx={{ width: '100%', marginTop: '20px' }}>

      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>


      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 5, mb: 1 }}>{step[activeStep]}</Box>


        </React.Fragment>
      )}
    </Box>
  );
}
