import { Request, Response } from 'express';
import express from 'express';
import * as ersUserDao from '../dao/ers-user-dao';

export const ersUserRouter = express.Router();

ersUserRouter.get('', async (req: Request, resp: Response) => {
    try {
      let users = await ersUserDao.findAll();
      resp.json(users);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  });

/**
  * Find user by id
**/
ersUserRouter.get('/:ers_user_id', async (req, resp) => {
  const ersUserId = +req.params.ers_user_id;
  try {
    let user = await ersUserDao.findById(ersUserId);

    if(user !== undefined){
      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err){
    console.log(err);
    resp.sendStatus(500);
  }
});


/**
 * Add a new user
 */
ersUserRouter.post('', async (req, resp) => {
  try {
    const id = await ersUserDao.create(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})

ersUserRouter.post('/login', async (req, resp) => {

  try {
    const user = await ersUserDao.findByUsernameAndPassword(req.body.username, req.body.password);

    if (user) {
      req.session.user = user;
      resp.json(user);
    } else {
      resp.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }

})

