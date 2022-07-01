const mongoose = require('mongoose');
const { environment } = require('../config/config');
const { friendSchema } = require('./schema/friendSchema.js');
const { seriesSchema } = require('./schema/seriesSchema.js');
const { userSchema } = require('./schema/userSchema.js');
const { orderSchema } = require('./schema/orderSchema.js');
const { followSchema } = require('./schema/followSchema.js');
const { postSchema } = require('./schema/postSchema.js');
const { feedSchema } = require('./schema/feedSchema.js');
const { commentsSchema, commentSchema } = require('./schema/commentSchema.js');
const { qapostSchema } = require('./schema/qapostSchema.js');
const { qaanswerSetSchema, qaanswerSchema } = require('./schema/qaanswerSchema.js');
const { qaAnswerScoresSchema,  qaAnswerScoreSchema} = require('./schema/qaAnswerScoreSchema.js');
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/

mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Friends = mongoose.model('Friends', friendSchema);
const Series = mongoose.model('Series', seriesSchema);
const Users = mongoose.model('Users', userSchema);
const Orders = mongoose.model('Orders', orderSchema);
const Follows = mongoose.model('Follows', followSchema);
const Posts = mongoose.model('Posts', postSchema);
const Feeds = mongoose.model('Feeds', feedSchema);
const Comments = mongoose.model('Comments', commentsSchema);
const QAPosts = mongoose.model('QAPosts', qapostSchema);
const QAAnswerSet = mongoose.model('QAAnswerSet', qaanswerSetSchema);
const QAAnswer = mongoose.model('QAAnswer', qaanswerSchema);
const QAAnswerScores = mongoose.model('QAAnswerScores', qaAnswerScoresSchema);
export { Friends, Series, Users, Orders, Follows, Posts, Feeds, Comments, QAPosts, QAAnswerSet, QAAnswer, QAAnswerScores };