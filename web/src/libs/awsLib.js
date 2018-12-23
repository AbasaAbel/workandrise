import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from '../config';

export function getAwsCredentials(userToken) {
  const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

  AWS.config.update({ region: config.cognito.REGION });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken,
    },
  });

  return AWS.config.credentials.getPromise();
}

// export async function authUser() {
//   if (
//     AWS.config.credentials &&
//     Date.now() < AWS.config.credentials.expireTime - 60000
//   ) {
//     return true;
//   }

//   const currentUser = getCurrentUser();

//   if (currentUser === null) {
//     return false;
//   }

//   const userToken = await getUserToken(currentUser);

//   await getAwsCredentials(userToken);

//   return true;
// }

export async function s3Upload(file, userToken, bucket, username) {
  await getAwsCredentials(userToken);

  const s3 = new AWS.S3({
    region: 'eu-central-1',
    params: {
      Bucket: `${bucket}`,
    },
  });

  let filename;

  if (bucket === 'wr-uploads') {
    filename = username;
  } else {
    filename = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;
  }


  return s3.upload({
    Key: filename,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
    CacheControl: 'no-cache',
  }).promise();
}

export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
}

export function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  });
  return userPool.getCurrentUser();
}

export function getUserAttributes(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getUserAttributes((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function updateUserAttributes(currentUser, attribute) {
  return new Promise((resolve, reject) => {
    currentUser.updateUserAttributes(attribute, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
