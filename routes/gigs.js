import { Router } from 'express';
import db from '../config/database';
import Gig from '../models/gig'
import { Op } from 'sequelize';

const router = Router();

// router.get('/', (req, res) => {
//  res.send('GIGS');
// });

//Get gig list
router.get('/', (req, res) => {
 Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      // res.sendStatus(200);

      // console.log(res.render());
      res.render('gigs', {
       gigs
      });
    })
    .catch(err => console.log(err));
});

//Display add gig form
router.get('/add', (req, res) => res.render('add'));

//Add a gig
router.post('/add', (req, res) => {
 // const data = {
 //  title: 'Third Looking for a React developer',
 //  technologies: 'Third react, javascript, html, css',
 //  budget: '$5000',
 //  description: 'Third THis is the description of the text',
 //  contact_email: 'Thirdvictor@gmail.com'
 // }


 let {title, technologies, budget, description, contact_email } = req.body;

 let errors = [];
 if(!title){
  errors.push({text: 'Please add a title'});
 }
 if(!technologies){
  errors.push({text: 'Please add some technologies'});
 }
 if(!description){
  errors.push({text: 'Please add a description'});
 }
 if(!contact_email){
  errors.push({text: 'Please add a contact email'});
 }

 //check for errors:
 if(errors.length > 0 ){
   res.render('add', {
    errors,
    title,
    technologies,
    budget,
    description,
    contact_email
   });

 }else {
  if(!budget){
   budget = 'Unknown';
  }else {
   budget = `$${budget}`;
  }
//replace comma space with just a comma
  technologies = technologies.toLowerCase().replace(/, /g, ',');
    //insert into table 
  Gig.create({
   title,
   technologies,
   description,
   budget,
   contact_email
  })
   .then(gig => res.redirect('/gigs'))
   .catch(err => console.log(err));
 }
});

router.get('/search', (req, res) => {
  // req.query.term
   let { term } = req.query;
   //make lowercase
   term = term.toLowerCase();

   Gig.findAll({ where: { technologies: {[Op.like]: '%' + term + '%'}}})
   .then(gigs => res.render('gigs', { gigs }))
   .catch(err => console.log(err));
});

export default router;