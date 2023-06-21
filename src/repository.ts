import { BuilderConfig } from "./config";

export const getGamesRepositoryUrl = (config: BuilderConfig) => {
  return getRepositoryUrlFromConfig(config, config.ecrGamesRepository);
}

export const getExecutorRepositoryUrl = (config: BuilderConfig) => {
  return getRepositoryUrlFromConfig(config, config.ecrExecutorRepository);
}

const getRepositoryUrlFromConfig = (config: BuilderConfig, repo: string) => {
  return `${config.awsAccountId}.dkr.ecr.${config.awsRegion}.amazonaws.com/${repo}`;
}
