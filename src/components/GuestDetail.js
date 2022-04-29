import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { eventContext } from '../App';
import { useContext } from 'react';







export default function GuestDetail() {
  const params = useParams();
  const {guest} = useContext(eventContext);
  

  return (

    <Box sx={{ pt: 4, display: 'flex', flexDirection: 'row',justifyContent:'center'}}>
      {
        guest.filter((guest) => {
          return guest.id === Number(params.id)
        }).map((guest,id)=>
          

          <Card key={id} sx={{ maxWidth: 550,p: 1}}>
            
          
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          
             
            <CardContent sx={{textAlign:'left'}}>
              <Typography sx={{p:1}} gutterBottom  component="div">
                Name : {guest.name}
              </Typography>
              <Typography sx={{p:1}} gutterBottom  component="div" >
              Email : {guest.email}
              </Typography>
              <Typography sx={{p:1}} gutterBottom  component="div" >
              Contact : {guest.contact}
              </Typography>
              <Typography sx={{p:1}} gutterBottom  component="div" >
              Address : {guest.address}
              </Typography>
            </CardContent>
            <Box sx={{ flex: ' 1 1 auto' }} />
            <CardMedia
              component="img"
              height="140"
              image={guest.img}
              sx={{width:'auto',p:1,alignSelf:'center'}}
              
            />
            </Box>
            <CardActions sx={{float:'right'}}>

              <Button size="small">Share</Button>
             
            </CardActions>
          </Card>
        )
      }
    </Box>
  );
}
