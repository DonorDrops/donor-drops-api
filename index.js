const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT } = process.env;
const port = PORT || 3002;
const { ApolloServer, gql } = require('apollo-server');
const ATLAS_USERNAME = 'DonorDrops';
const ATLAS_PASSWORD = '4DonorDrops283';

const { Admin, test } = require('./models');
test('Fuck Off');

// Connecting to db
mongoose.connect(`mongodb://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@cluster0-shard-00-00-diacx.mongodb.net:27017,cluster0-shard-00-01-diacx.mongodb.net:27017,cluster0-shard-00-02-diacx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {
  useNewUrlParser: true
})
.then(response => {
  const db = {
    admins: [
      {
        id: 'a2',
        userName: 'gtime',
        contact: '1245788'
      },
      {
        id: 'a3',
        userName: 'ike',
        contact: '12455448'
      }
    ],
    activities: [
      {
        id: 'act1',
        action: 'UPDATE_ACCOUNT',
        created: new Date(),
        admin: 'a3'
      }
    ]
  };
  const typeDefs = gql`
    type Activity {
      id: ID!
      action: String!
      created: String
    }

    type Admin {
      id: ID!
      userName: String!
      contact: String
      activities: [Activity!]!
    }

    type Query {
      admins: [Admin!]!
      admin(id: ID!): Admin
      activities: [Activity!]!
    }

    type Mutation {
      addAdmin(userName: String!, contact: String): Admin
    }
  `;
  const resolvers = {
    Query: {
      admins: () => db.admins,
      admin: args => db.admins.find(admin => admin.id === args.id),
      activities: db.activities
    },
    Mutation: {
      addAdmin: ({ userName, contact }) => {
        const admin = {
          id: 'a5',
          userName,
          contact
        };
        db.admins.push(admin);
        return admin;
      }
    },
    Admin: {
      activities: ({ id }) => db.activities.filter(activity => activity.admin === id)
    }
  }
  return new ApolloServer({ typeDefs, resolvers }).listen(port)
})
.then(serverInfo => {
  console.log(`Server is up at: http://localhost:${port}`)
})
.catch(err => {
  console.log("Failed", console.error)
})
