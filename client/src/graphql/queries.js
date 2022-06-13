import { gql} from "@apollo/client";
import client from './client';

const addUserMutation = gql`
  mutation createUserMut($input:UserInput){
              user: createUser(input : $input){
                  id
                  lastName
                  gender
                  language
              }
          }
`;
/*
const updateUserMutation = gql`
  mutation updateUserMut($id:ID!, $input:UserInput){
              user: updateUser( id:$id, input : $input){
                  id
                  lastName
                  gender
                  language
              }
          }
`;
*/
export const MUTATION_ADD_ORDER = gql`
  mutation createOrderMut($input:OrderInput){
    order: createOrder(input : $input){
        id
        user
        ken3Amount
        ken5Amount
    }
  }
`;

/*
const updateOrderMutation = gql`
  mutation updateOrderMut($id:ID!, $input:OrderInput){
              user: updateUser( id:$id, input : $input){
                  id
                  lastName
                  gender
                  language
              }
          }
`;*/

const userQuery = gql`
    query queryUser($id:ID!) {
      user:getUser(id:$id){
          firstName
          lastName
          userName
          gender
          language
          age
          email
          password
          address
          phoneNumber
          walletAddress
          privateKey 
          coinName
          coinSymbol
        }
    }`;

const userCoinQuery = gql`
query queryUser($id:ID!) {
  user:getUser(id:$id){
      walletAddress
      privateKey 
      coinName
      coinSymbol
    }
}`;

export const QUERY_ORDER_BY_USER = gql`
    query queryOrderByUser($userId:ID!) {
      orders:getOrderByUser(userId:$userId){
          id
          user
          ken3Amount
          ken5Amount
          date
        }
    }`;


export const QUERY_USER_BY_KEYWORD = gql`
    query queryOrderByUser($keyword:String) {
      users:getUserByKeyword(keyword:$keyword){
          id
          firstName
          lastName
          email
          introduction
        }
    }`;

export const QUERY_FEED = gql`
    query queryFeed($userId:ID, $date:Date) {
      feeds:getFeed(userId:$userId, date:$date){
          id
          user
          text
          date
          comments
        }
    }`;

export const QUERY_QA_QUESTION = gql`
    query queryQAQuestion($pattern:String) {
      questions:searchQAQuestions(pattern:$pattern){
        id
        user
        text
        image
        date
        answers
        }
    }`;

export const QUERY_QA_QUESTION_BY_ID = gql`
    query QueryQAQuestionById($id:ID) {
      question:queryQAQuestionById(id:$id){
        id
        user
        text
        image
        date
        answers
        }
    }`;

export const QUERY_QA_ANSWERS = gql`
    query queryQAAnswers($answersId:ID) {
      answers:getQAAnswers(answersId:$answersId){
        id
        user
        text
        image
        date
        }
    }`;

export async function queryQAAnswers(answersId){
  const {data} = await client.query({
    query: QUERY_QA_ANSWERS,
    variables: {answersId: answersId}
  });
  return data;
}

export async function queryUserByKeyword(keyword){
  const {data} = await client.query({
    query: QUERY_USER_BY_KEYWORD,
    variables: {keyword: keyword}
  });
  return data.users;
}

export async function addUser(user) {
  const {data} = await client.mutate({
    mutation: addUserMutation,
    variables: {input: user}
  });
  return data.user;
}

export async function updateUser(id, user) {
  const {data} = await client.mutate({
    mutation: addUserMutation,
    variables: {id: id, input: user}
  });
  return data.user;
}

export async function getUser(id){
  const {data} = await client.query({
    query: userQuery,
    variables: {id: id}
  });
  return data.user;
}

export async function getUserCoin(id){
  const {data} = await client.query({
    query: userCoinQuery,
    variables: {id: id}
  });
  return data.user;
}

export async function addOrder(order) {
  const {data} = await client.mutate({
    mutation: MUTATION_ADD_ORDER,
    variables: {input: order}
  });
  return data.user;
}
/*
export async function getOrderByUser(userId){
  const {data} = await client.query({
    query: QUERY_ORDER_BY_USER,
    variables: {userId: userId}
  });
  return data.orders;
}*/

export const MUTATION_ADD_FOLLOW = gql`
  mutation createFollowMut($follower:ID!, $followee:ID!){
    result: addFollow(follower : $follower, followee:$followee)
  }
`;
export async function MutationAddFollow(follower, followee){ 
  const {data} = await client.mutate({
    mutation: MUTATION_ADD_FOLLOW,
    variables: {
      follower: follower, 
      followee: followee,
    }
  });
  return data;
}

export const MUTATION_ADD_POST = gql`
  mutation createPostMut($post:Post){
    result: addPost(post : $post)
  }
`;
export async function MutationAddPost(post){ 
  const {data} = await client.mutate({
    mutation: MUTATION_ADD_POST,
    variables: {
      post: post
    }
  });
  return data;
}

export const MUTATION_ADD_QAPOST = gql`
  mutation createQAPostMut($post:QAPost){
    result: addQAPost(post : $post)
  }
`;
export async function MutationAddQAPost(post){ 
  const {data} = await client.mutate({
    mutation: MUTATION_ADD_QAPOST,
    variables: {
      post: post
    }
  });
  return data;
}

export async function searchQAQuestions(id){
  const {data} = await client.query({
    query: QUERY_QA_QUESTION,
    variables: {id: id}
  });
  return data;
}

export const MUTATION_ADD_COMMENT = gql`
  mutation createCommentMut($commentsId:ID!, $comment:Comment){
    result: addComment(commentsId:$commentsId, comment : $comment)
  }
`;
export async function MutationAddComment(commentsId, comment){ 
  const {data} = await client.mutate({
    mutation: MUTATION_ADD_COMMENT,
    variables: {
      commentsId: commentsId,
      comment: comment
    }
  });
  return data;
}

export const QUERY_COMMENT = gql`
    query queryComment($commentsId:ID, $date:Date) {
      comments:getComment(commentsId:$commentsId, date:$date){
          id
          userId
          text
          date
        }
    }`;


export const MUTATION_UPDATE_COIN = gql`
    mutation updateCoinMut($userId:ID!, $input:CoinInput){
    result: updateUserCoin(userId:$userId, input : $input){
          id
        }
    }`;

export async function updateUserCoin(userId, input){ 
  const {data} = await client.mutate({
    mutation: MUTATION_UPDATE_COIN,
    variables: {
      userId: userId,
      input: input
    }
  });
  return data;
}



export const MUTATION_ADD_QAANSWER = gql`
  mutation createQAAnswerMut($answersId:ID!, $answer:QAAnswer){
    result: addQAAnswer(answersId:$answersId, answer : $answer)
  }
`;
export async function MutationAddQAAnswerPost(answersId, answer){ 
  const {data} = await client.mutate({
    mutation: MUTATION_ADD_QAANSWER,
    variables: {
      answersId: answersId,
      answer: answer
    }
  });
  return data;
}


