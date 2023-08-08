const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leader = require('../models/leaders'); // Make sure to adjust the path accordingly

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .get((req, res, next) => {
    Leader.find({})
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Leader.create(req.body)
      .then((leader) => {
        console.log('Leader created:', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
  })
  .delete((req, res, next) => {
    Leader.deleteMany({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      })
      .catch((err) => next(err));
  });

leaderRouter.route('/:leaderId')
  .get((req, res, next) => {
    Leader.findById(req.params.leaderId)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
  })
  .put((req, res, next) => {
    Leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, { new: true })
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .patch((req, res, next) => { // Adding the PATCH route
    Leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, { new: true })
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      })
      .catch((err) => next(err));
  });

module.exports = leaderRouter;
