import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../data/resolvers';
import { typeDefs } from '../data/schema.graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
const jwt = require('jsonwebtoken');
import path from 'path';
import { PORT } from '../config/config';
import {encode_password} from './util.js';
//temp
import {Users} from '../db/dbConnector.js'


const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
app.use(cors(), bodyParser.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
    algorithms: ['HS256']
  }));

//static file
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.get('/', (req, res) => {
    console.log("Apollo GraphQL Express server is ready");
});

app.post('/login', (req, res) => {
    const {name, password} = req.body;
    console.log(req.body);
    //const user = Users.findOne({email:email}, function (err, user) {
    Users.findOne({email:name}, function (err, user) {
        if (err) {
            res.sendStatus(404);    //not found
            console.log("error:"+err);
            return;
        }
        if(user === null){
            res.sendStatus(404);    //not found
            console.log("error:user not found!"+err);
            return;
        }
        const encPassword = encode_password(password);
        console.log("encPassword:"+encPassword);
        console.log("user:"+user);
        if( user === null){
            res.sendStatus(404);    //unauthorized
            console.log("user not found");
            return;
        }
        if (encPassword !== user.password) {
            res.sendStatus(401);    //unauthorized
            console.log("password not match");
            return;
        }
        // Prints "Space Ghost is a talk show host".
        console.log(user.firstName);

        const token = jwt.sign({sub: user.id}, jwtSecret);
        res.status(200).send({token});
    });
});

app.listen({ port: PORT }, () => {
    console.log(`Server is running at http://localhost:8080${server.graphqlPath}`);
});


