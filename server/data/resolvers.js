import {Friends,Series, Users, Orders, Follows, Posts, Feeds, Comments, QAPosts, QAAnswers, QAAnswerScores } from '../db/dbConnector.js'
import {encode_password} from '../src/util.js';

/**
* GraphQL Resolvers 
**/

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
      //console.log("serialize " + value + ":" + value.getTime())
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    //console.log("parse date " + value + ":" + Date(value))
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
     // console.log("parse Literal" + ast)
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const resolvers={
    Date: dateScalar,

    Query:{
            getAllFriend:(root)=>{
                return new Promise((resolve,reject)=>{
                    Friends.find((err,friends)=>{
                        if(err) reject(err);
                        else resolve(friends);
                    })
                })
            },
            findASeries:(root,{id})=>{
                return new Promise((resolve,reject)=>{
                    Series.findOne({_id:id},(err,series)=>{
                        if(err) reject(err);
                        else resolve(series);
                    })
                })
            },
            getUser:(root,{id})=>{
                return new Promise((resolve,reject)=>{
                    Users.findOne({_id:id},(err,user)=>{
                        if(err) reject(err);
                        else resolve(user);
                    })
                })
            },
            /*getUserCoin:(root,{id})=>{
                return new Promise((resolve,reject)=>{
                    Users.findOne({_id:id},'walletAddress privateKey coinName coinSymbol', (err,user)=>{
                        if(err) reject(err);
                        else{ 
                            resolve(user);
                        }
                    })
                })
            },*/

            getUserByKeyword:(root,{keyword})=>{
                return new Promise((resolve,reject)=>{
                    Users.find({email:{ $regex: keyword }},(err,user)=>{
                        if(err) reject(err);
                        else resolve(user);
                    })
                })
            },
            getPasswordVerify:(root,{id,password})=>{
                return new Promise((resolve,reject)=>{
                    Users.findOne({_id:id},(err,user)=>{
                        if(err) reject(err);
                        else{ 
                            const passwd2verify = encode_password(password);
                            resolve(passwd2verify === user.password);
                        }
                    })
                })
            },
            getOrder:(root,{id})=>{
                return new Promise((resolve,reject)=>{
                    Orders.findOne({_id:id},(err,order)=>{
                        if(err) reject(err);
                        else resolve(order);
                    })
                })
            },
            getOrderByUser:(root,{userId})=>{
                return new Promise((resolve,reject)=>{
                    Orders.find({user:userId},(err,order)=>{
                        if(err) reject(err);
                        else resolve(order);
                    })
                })
            },
            QueryOrderByFilter:(root,{filter,sort})=>{
                const filterJson = JSON.parse(filter);
                const sortJson = JSON.parse(sort);
                console.log("filter:"+JSON.stringify(filterJson));
                console.log("sort:"+JSON.stringify(sortJson));
                return new Promise((resolve,reject)=>{
                    Orders.find(filterJson)
                            .sort(sortJson)
                            .exec((err,orders)=>{
                                if(err) reject(err);
                                else resolve(orders);
                            });
                })
            },

            getFeed:(root,{userId,date})=>{
                console.log("userId:"+userId);
                console.log("date:"+date);
                return new Promise((resolve,reject)=>{

                    Feeds.find({receiver:userId}, null, {sort:{date:-1}}, async (err, feeds) =>{
                        if(err) reject(err);
                        else{
                            console.log("feeds:"+feeds);
                            console.log("feeds type:"+ typeof feeds);
                            console.log("feeds length:"+ feeds.length);
                            let resPosts = [];
                            for(let i = 0; i < feeds.length; i++){
                                const feed = feeds[i];
                                console.log("feed:"+feed);
                                const post = await Posts.findById(feed.post).exec();
                                console.log("post:"+post);
                                resPosts.push(post);
                            }
                            resolve(resPosts);
                        }
                    });
                    /*const result = (await Feeds.find({receiver:userId}).sort({date:-1}).limit(10).exec()).map( async (feed)=>{
                                    const post = await Posts.findById(feed.post).exec();
                                    return post;
                                }).reduce( (total, element, i) =>{
                                    console.log("index:"+i);
                                    console.log("element:"+element);
                                    console.log("total:"+total);
                                    console.log("total type :"+ (typeof total));
                                    total.concat(element);
                                },[]);
                    console.log("result:"+result);
                    resolve(result);*/
                    /*let feeds = await Feeds.find({receiver:userId}).sort({date:-1}).limit(10).exec();
                    console.log("type of feeds:"+ typeof feeds);
                    console.log("feeds:"+feeds);
                    console.log("feeds keys"+feeds.keys.length);
                    if(feeds === null) reject(err);
                    else{ 
                        if(typeof feeds === 'object'){
                            if(feeds.keys.length===0){
                                resolve([]);
                            }
                            else{
                                console.log("find post by ID:"+feeds[0].post);
                                const post = await Posts.findById(feeds[0].post).exec();
                                console.log("post found:"+post);
                                resolve([post]);
                            }
                        }
                        else{
                            const result = feeds.map( async (feed)=>{
                                const post = await Posts.findById(feed.post).exec();
                                return post;
                            }).reduce( (total, element) =>{
                                return total.push(element);
                            },[])
                            resolve(result);
                        }
                    }*/
                })
            },

            getComment:(root,{commentsId,date})=>{
                console.log("commentsId:"+commentsId);
                console.log("date:"+date);
                return new Promise(async (resolve,reject)=>{
                    const commentsOfPost = await Comments.findById(commentsId).exec();
                    if(commentsOfPost) resolve(commentsOfPost.comments);
                    else reject("err");

                });
            },


            searchQAQuestions:(root,{keyword})=>{
                console.log("keyword:"+keyword);
                return new Promise((resolve,reject)=>{
                    let res = [];
                    if(!keyword) 
                        keyword = "";
                    QAPosts.find({text:{'$regex' : keyword, '$options' : 'i'}}, null, {sort:{date:-1}}, async (err, questions) =>{
                        if(err) reject(err);
                        else{
                            /*console.log("question:"+question);
                            let resPosts = [];
                            for(let i = 0; i < feeds.length; i++){
                                const feed = feeds[i];
                                console.log("feed:"+feed);
                                const post = await Posts.findById(feed.post).exec();
                                console.log("post:"+post);
                                res.push(post);
                            }*/
                            resolve(questions);
                        }
                    });
                })
            },

            queryQAQuestionById:(root,{id})=>{
                console.log("queryQAQuestionById:"+id);
                return new Promise((resolve,reject)=>{
                    let res = [];
                    QAPosts.findById(id, async (err, questions) =>{
                        if(err) reject(err);
                        else{
                            resolve(questions);
                        }
                    });
                })
            },

            getQAAnswers:(root,{answersId})=>{
                console.log("answersId:"+answersId);
                return new Promise(async (resolve,reject)=>{
                    const res = await QAAnswers.findById(answersId).exec();
                    if(res) resolve(res.answers);
                    else reject("err");

                });
            },

    },
    Mutation:{
        createFriend: (root,{ input }) => {
            const newFriend=new Friends({
                firstName : input.firstName,
                lastName : input.lastName,
                gender : input.gender,
                language : input.language,
                age : input.age,
                email : input.email,
                contacts:input.contacts
            });

            newFriend.id=newFriend._id;

            return new Promise((resolve,reject)=>{
                newFriend.save((err)=>{
                    if(err) reject(err);
                    else resolve(newFriend);
                })
            })
        },

        addASeries:(root,{series})=>{
            const newSeries=new Series({
                seriesName:series.seriesName,
                year:series.year,
                rating:series.rating
            });
            
            newSeries.id=series._id;
            
            return new Promise((resolve,reject)=>{
                newSeries.save(err=>{
                    if(err) reject(err);
                    resolve(newSeries);
                })
            })
        },

        createUser: (root,{ input }) => {
            const newUser=new Users({
                firstName : input.firstName,
                lastName : input.lastName,
                userName : input.userName,
                gender : input.gender,
                language : input.language,
                age : input.age,
                email : input.email,
                password : encode_password(input.password),
                contacts:input.contacts
            });

            newUser.id=newUser._id;

            return new Promise((resolve,reject)=>{
                newUser.save((err)=>{
                    if(err) reject(err);
                    else resolve(newUser);
                })
            })
        },
        updateUserCoin: (root,{ userId, input }) => {
            const filter = {"id":userId};
            const update = input;
            //input.date = Date(input.date);
            console.log("id:"+userId);
            console.log(input);
            return Users.findByIdAndUpdate(userId, update);
        },

        createOrder: (root,{ input }) => {
            console.log(input);
            const newOrder=new Orders({
                user:input.user,
                ken3Amount:input.ken3Amount,
                ken5Amount:input.ken5Amount,
                date:input.date,
            });

            newOrder.id=newOrder._id;

            return new Promise((resolve,reject)=>{
                newOrder.save((err)=>{
                    if(err) reject(err);
                    else resolve(newOrder);
                })
            })
        },

        updateOrder: (root,{ orderId, input }) => {
            const filter = {"id":orderId};
            const update = input;
            input.date = Date(input.date);
            console.log(input);
            return Orders.updateOne(filter, update);
        },

        addFollow: (root,{ follower, followee }) => {
            console.log("follower:" + follower + ",followee:" +followee);
            const newFollow=new Follows({
                follower:follower,
                followee:followee,
            });
            return new Promise((resolve,reject)=>{
                newFollow.save((err)=>{
                    if(err) reject(err);
                    else resolve(true);
                })
            });
        },

        addPost: async (root,{ post }) => {
            
            const newComments = new Comments({
                //post: post,
                comments:[]
            });
            await newComments.save();
            console.log("newComments"+newComments._id);
            post.comments = newComments._id;
            console.log("post:" + post );
            console.log("post user:" + post.user );
            const newPost=new Posts(post);
            return new Promise((resolve,reject)=>{
                newPost.save(async (err,result)=>{
                    console.log("post result:" + result );
                    if(err) reject(err);
                    else{ 
                        //to do: move to another module to reduce dependency
                        const follows = await Follows.find({ followee: post.user});
                        console.log("follows:" + follows );
                        follows.forEach((follow) =>{
                            let feed = new Feeds({
                                receiver: follow.follower, 
                                post:result._id,
                                data: Date.now()
                            });
                            feed.save( (err, feed) => {
                                if (err) return console.error(err);
                                console.log( " feed saved .");
                            });
                        });
                        newComments.post = result._id;
                        let doc = await Comments.updateOne({_id:result.comments}, {post:result._id});
                        resolve(true);
                    }
                })
            });
        },

        addQAPost: async (root,{ post }) => {
            
            const newQAAnswers = new QAAnswers({
                //post: post,
                answers:[]
            });
            await newQAAnswers.save();
            console.log("newQAAnswers"+newQAAnswers._id);
            post.answers = newQAAnswers._id;
            console.log("post:" + post );
            console.log("post user:" + post.user );
            const newPost=new QAPosts(post);
            return new Promise((resolve,reject)=>{
                newPost.save(async (err,result)=>{
                    console.log("post result:" + result );
                    if(err) reject(err);
                    else{ 
                        resolve(true);
                    }
                })
            });
        },

        addComment: (root,{ commentsId, comment }) => {
            console.log("commentsID:" + commentsId );
            console.log("comment userId:" + comment.userId );
            console.log("comment text:" + comment.text );
            
            //const newComment=new Comment(comment);
            return new Promise(async (resolve,reject)=>{
                const commentsOfPost = await Comments.findById(commentsId).exec();
                commentsOfPost.comments.push(comment)
                commentsOfPost.save(async (err,result)=>{
                    console.log("comment result:" + result );
                    if(err) reject(err);
                    else{ 
                        resolve(result);
                    }
                })
            });
        },

        addQAAnswer: async (root,{ answersId, answer }) => {
            const newScores = new QAAnswerScores({
                //post: post,
                scores:[]
            });
            newScores.totalscorer=0;
            newScores.totalscore=0;
            await newScores.save();
            console.log("newScores"+newScores._id);
            answer.scoresId = newScores._id;

            console.log("answersId:" + answersId );
            console.log("answer userId:" + answer.userId );
            console.log("answer text:" + answer.text );
            
            //const newComment=new Comment(comment);
            return new Promise(async (resolve,reject)=>{
                const QAAnswersOfAnswer = await QAAnswers.findById(answersId).exec();
                QAAnswersOfAnswer.answers.push(answer)
                QAAnswersOfAnswer.save(async (err,result)=>{
                    console.log("save answer result:" + result );
                    if(err) reject(err);
                    else{ 
                        resolve(result.answers);
                    }
                })
            });
        },
        //addQAAnswerScore
        addQAAnswerScore: (root,{ scoresId, score }) => {

            console.log("scoresId:" + scoresId );
            console.log("score:" + score.score );
            console.log("score date:" + score.date );
            console.log("score user:" + score.user );
            
            //const newComment=new Comment(comment);
            return new Promise(async (resolve,reject)=>{
                const scoresOfAnswer = await QAAnswerScores.findById(scoresId).exec();

                scoresOfAnswer.totalscorer = scoresOfAnswer.totalscorer+1;
                scoresOfAnswer.totalscore = scoresOfAnswer.totalscore + score.score;
                scoresOfAnswer.scores.push(score)
                scoresOfAnswer.save(async (err,result)=>{
                    console.log("save score result:" + result );
                    if(err) reject(err);
                    else{ 
                        resolve(result.scores);
                    }
                })
            });
        },
    },
};
