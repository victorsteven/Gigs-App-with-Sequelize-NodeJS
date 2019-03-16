import { Router } from 'express';
import db from '../config/database';
import Gig from '../models/gig'


const router = Router();

// router.get('/', (req, res) => {
//  res.send('GIGS');
// });
router.get('/', (req, res) => {
 Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

export default router;