export default {
  MAX_ATTACHMENT_SIZE: 25000000,
  s3: {
    MESSAGE_BUCKET: 'wr-messages',
    PHOTO_BUCKET: 'wr-uploads',
    REGION: 'eu-central-1',
  },
  apiGateway: {
    // reference https://serverless-stack.com/chapters/deploy-the-apis.html
    URL: 'https://5uzbedubg3.execute-api.eu-central-1.amazonaws.com/prod',
    REGION: 'eu-central-1',

  },
  cognito: {
    USER_POOL_ID: 'eu-central-1_tLEhzuF4Q',
    APP_CLIENT_ID: '1pc5l3lubj0jlcr392t3riae96',
    // USER_POOL_ID: "eu-central-1_3Te6V2Psc",
    // APP_CLIENT_ID: "5lbp4bcf4m7vc7l65lah5gaedq",
    REGION: 'eu-central-1', // for the userGroup
    IDENTITY_POOL_ID: 'eu-central-1:8595f025-dd72-44bb-8720-cdf4ea39f17a',
  },
};

// Want to turn these into environment variables