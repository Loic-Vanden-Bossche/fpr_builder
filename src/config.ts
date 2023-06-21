export interface BuilderConfig {
  gameId: string;
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsAccountId: string;
  awsRegion: string;
  ecrRepository: string;
  s3Bucket: string;
}

export const getConfigFromEnv = (): BuilderConfig => {
  console.log('Getting config from env');

  return {
    gameId: process.env.GAME_ID!,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsAccountId: process.env.AWS_ACCOUNT_ID!,
    awsRegion: process.env.AWS_REGION!,
    ecrRepository: process.env.ECR_REPOSITORY!,
    s3Bucket: process.env.S3_BUCKET!,
  }
}
