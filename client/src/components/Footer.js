import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

const Footer = () => {
  const today = new Date();
  //console.log(today);
  const year = today.getFullYear();
  return (
    <Grid
      textAlign='center'
      verticalAlign='middle'
      style={{ color: 'white', margin: '40px 15px 20px 15px', width: '90%' }}
    >
      <Grid.Row>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={9}>
          Copyright &copy; {year}
          <br />
          Created and Designed by Ahmet Kenar
        </Grid.Column>
        <Grid.Column width={3}>
          <Image
            src='https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png'
            floated='right'
            size='small'
            verticalAlign='middle'
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Footer;
