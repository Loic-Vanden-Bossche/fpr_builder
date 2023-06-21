import { BuilderConfig } from "./config";

export const getRepositoryUrlFromConfig = (config: BuilderConfig) => {
  return `${config.awsAccountId}.dkr.ecr.${config.awsRegion}.amazonaws.com/${config.ecrRepository}`;
}
