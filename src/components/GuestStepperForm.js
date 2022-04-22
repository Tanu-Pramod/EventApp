import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import ContactDetail from './ContactDetail';
import PersonalDetail from './PersonalDetail';
import AccountDetail from './AccountDetail';
import { Link } from 'react-router-dom';


export default function GuestStepperForm(props) {
  const steps = ['Personal Details', 'Contact Detail', 'Bank Detail'];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (newData) => {
    props.setGuestData(prev => ({ ...prev, ...newData }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === step.length - 1) {
      props.setGuest([...props.guest, newData]);
      localStorage.setItem('guest_list', JSON.stringify([...props.guest, newData]));
      props.setGuestData({
        id: new Date().getTime(),
        name: '',
        age: '',
        img: '',
        gender: '',
        email: '',
        contact: '',
        address:'',
        account_no: '',


      })

    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };





  const step = [<PersonalDetail  activeStep={activeStep} setGuest={props.setGuest} guest={props.guest} guestData={props.guestData} setGuestData={props.setGuestData} next={handleNext} />, <ContactDetail  activeStep={activeStep} guestData={props.guestData} next={handleNext} back={handleBack} />, <AccountDetail  activeStep={activeStep} guestData={props.guestData} next={handleNext} back={handleBack} />]








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
          <Box sx={{ mt: 5, mb: 1 }}><div style={{ width: '50%', margin: 'auto' }}>{step[activeStep]}</div></Box>


        </React.Fragment>
      )}
    </Box>
  );
}
