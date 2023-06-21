import { BuilderConfig } from "./config";
import { ECRClient, GetAuthorizationTokenCommand } from "@aws-sdk/client-ecr";
import { getCredentialProvider } from "./credential-provider";
import fs from "fs";
import { getExecutorRepositoryUrl, getGamesRepositoryUrl } from "./repository";

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

  console.log('Configuring ECR in kaniko...');

  fs.writeFileSync('/kaniko/.docker/config.json', JSON.stringify({
    "auths": [
      getGamesRepositoryUrl(config),
      getExecutorRepositoryUrl(config)
    ].reduce((acc, url) => {
      acc[url] = {
        "auth": token,
      };
      return acc;
    }, {} as Record<string, { auth: string }>)
  }));
}
