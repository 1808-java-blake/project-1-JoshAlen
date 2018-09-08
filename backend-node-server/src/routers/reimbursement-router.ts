import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';
import { authMiddleware } from '../security/authorization-middleware';
 
// // all routes defiend with this object will imply /movies
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application

// /**
//  * Find all reimbursement
//  */
reimbursementRouter.get('', [
  // authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      let reimbursement = await reimbursementDao.findAll();
      resp.json(reimbursement);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

// /**
//  * Find reimbursement by id
//  */
reimbursementRouter.get('/:reimb_id', async (req, resp) => {
  const reimbId = +req.params.reimb_id; // convert the id to a number
  try {
    let reimbursement = await reimbursementDao.findById(reimbId);
    if (reimbursement !== undefined) {
      resp.json(reimbursement);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

/**
 * Create Reimbursement
 */
reimbursementRouter.post('', [
//   authMiddleware('admin'),
  async (req, resp) => {
    try {
      const id = await reimbursementDao.createReimbursement(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])


// approve reimbursement expense
reimbursementRouter.post('/changestatus', [
  async (req, resp) => {
    try {
      const s = await reimbursementDao.changeReimbStatus(req.body);
      resp.status(201);
      resp.json(s);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

