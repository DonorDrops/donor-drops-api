const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Account = require('../models/account');
const Measurement = require('../models/measurement');

exports.get = (req, res, next) => {
  Account.find()
  .exec()
  .then((account) => {
    return res.status(200).json(account.reverse())
  })
  .catch((err) => {
    return res.status(500).json({
      message:'An error occured',
      error: err
    })
  })
}
exports.getOne = (req, res, next) => {
  const { id } = req.params;
  Account.findById(id)
  .exec()
  .then((account) => {
    if (account === null) {
      return res.status(404).json({
        message:'Not Found'
      });
    }

    // Getting Measurements if
    if (account._doc.type == 'farmer') {
      Measurement.find({ account: account._doc._id })
      .exec()
      .then((measurements) => {
        return res.status(200).json({
          ...account._doc,
          measurements: measurements
        });
      });
    }
    else {
      res.status(200).json(account);
    }
  })
  .catch((err) => {
    return res.status(404).json({
      message:'Not Found',
      error: err
    })
  })
}
exports.register = (req, res, next) => {
  Account.findOne({ userName: req.body.userName })
    .exec()
    .then(account => {
      if (account != null) {
        return res.status(409).json({
          message: 'User name already exists'
        });
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
          if (err) {
            return res.status(500).json({
              message: 'Could not create account',
              error: err
            })
          }
          else {
            // Adding new account
            const id = new mongoose.Types.ObjectId();
            const href = '/api/v1/accounts/' + id;
            const body = {
              password: hash,
              userName: req.body.userName,
              type: req.body.type
            }

            Account.create({
              _id: id,
              href,
              ...body,
              created: Date.now()
            })
            .then((result) => {
              return res.status(201).json({
                message: 'Account created',
                data: result
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: 'Could not create account',
                error: err
              })
            })
          }
        });
      }
    })
}
exports.update = (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  // Check for account
  Account.findById(id)
    .exec()
    .then(account => {
      if (account == null) {
        return res.status(404).json({
          message: 'Account not found'
        });
      }

      // Checking if user name exists
      if (update.hasOwnProperty('userName')) {
        const userName = update.userName.toLowerCase();
        Account.findOne({ userName: userName })
          .exec()
          .then(accountWithUserName => {
            if (accountWithUserName != null) {
              return res.status(409).json({
                message: 'User name already exists'
              });
            }
            else {
              Account.findByIdAndUpdate(id, { $set: update})
                .exec()
                .then((account) => res.status(200).json({
                    message: 'Account Updated',
                    data: account
                }))
                .catch((err) => {
                  res.status(500).json({
                    message:'Could not update',
                    error: err
                  })
                })
            }
          })
      }
      else {
        Account.findByIdAndUpdate(id, { $set: update})
          .exec()
          .then((account) => {
            res.status(200).json({
              message: 'Account Updated',
              data: account
            })
          })
          .catch((err) => {
            res.status(500).json({
              message:'Could not update',
              error: err
            })
          })
      }

    })
    .catch(err => res.status(500).json({
      message: 'Could not update',
      error: err
    }))
}
exports.disable = (req, res, next) => {
  const { id } = req.params;

  Account.findById(id)
    .exec()
    .then(account => {
      if (account == null) {
        return res.status(404).json({
          message: 'Account not found'
        })
      }
      account.disabled = !account.disabled;
      account.save()
        .then(result => res.status(200).json({
          message: 'Account ',
          result
        }))
        .catch(err => res.status(500).json({
          message: 'Could not ',
          error: err
        }))
    })
    .catch(err => res.status(500).json({
      message: 'Could not ',
      error: err
    }))
}
exports.remove = (req, res, next) => {
  const { id } = req.params;

  Account.deleteOne({ _id: id })
  .exec()
  .then((result) => {
    res.status(200).json({
      message: 'Account Deleted'
    })
  })
  .catch((err) => {
    res.status(500).json({
      message:'Could not delete',
      error: err
    })
  })
}
exports.login = (req, res, next) => {
  const userName = req.body.userName.toLowerCase();
  Account.findOne({ userName })
  .exec()
  .then(account => {
    if (account == null) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
    else {
      bcrypt.compare(req.body.password, account.password, (err, result) => {
        if (err || (result == false)) {
          return res.status(401).json({
            message: 'Auth failed',
            err
          })
        }
        else {
          const token = jwt.sign(
            {
              user: account
            },
            process.env.JWT_KEY,
            {
              expiresIn: '24h'
            }
          )
          return res.status(200).json({
            message: 'Auth successful',
            token
          })
        }
      })
    }
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Oops! Something went wrong',
      error: err
    })
  })
}
