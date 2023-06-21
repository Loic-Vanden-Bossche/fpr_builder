import { BuilderConfig } from "./config";
import { ECRClient, GetAuthorizationTokenCommand } from "@aws-sdk/client-ecr";
import { getCredentialProvider } from "./credential-provider";
import fs from "fs";
import { getRepositoryUrlFromConfig } from "./repository";

export const configureEcr = async (config: BuilderConfig) => {
  const ecrClient = new ECRClient({
    credentials: getCredentialProvider(config),
  });

  console.log('Retrieving ECR token...');

  const res = await ecrClient.send(
    new GetAuthorizationTokenCommand({
      registryIds: [config.awsAccountId],
    }),
  );

  const token = res.authorizationData?.reduce((acc, data) => {
    if (data?.authorizationToken) {
      return data.authorizationToken;
    }
    return acc;
  }, '');

  if (!token) {
    throw new Error('No token found for ECR');
  }

  const repositoryUrl = getRepositoryUrlFromConfig(config);

  console.log('Configuring ECR in kaniko...');

  fs.writeFileSync('/kaniko/.docker/config.json', JSON.stringify({
    "auths": {
      [repositoryUrl]: {
        "auth": token,
      }
    }
  }));
}
