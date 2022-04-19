import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';



export default function GuestDetail(props) {
  const params = useParams();
  console.log("propsss",props)

  return (

    <Box sx={{ pt: 4}}>
      {
        props.guest.filter((guest) => {
          return guest.id === Number(params.id)
        }).map(guest =>
          

          <Card sx={{ maxWidth: 350, m: 'auto',p: 1}}>
            {console.log("image",guest.img)}
            {console.log("imageUrl====>", guest.img)}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          
             
            <CardContent sx={{width:'70%',textAlign:'left'}}>
              <Typography gutterBottom  component="div">
                Name : {guest.name}
              </Typography>
              <Typography gutterBottom  component="div" >
              Email : {guest.email}
              </Typography>
              <Typography gutterBottom  component="div" >
              Contact : {guest.contact}
              </Typography>
              <Typography gutterBottom  component="div" >
              Address : {guest.address}
              </Typography>
            </CardContent>
            <Box sx={{ flex: '1 1 auto' }} />
            <CardMedia
              component="img"
              height="140"
              image={guest.img}
              sx={{width:'30%'}}
              
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
