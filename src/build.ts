import { BuilderConfig } from "./config";
import { getExecutorRepositoryUrl, getGamesRepositoryUrl } from "./repository";

export const executeBuildCommand = async (config: BuilderConfig) => {
  const { $ } = await import('execa');

  try {
    const imageTag = `${getGamesRepositoryUrl(config)}:${config.gameId}`;
    const executorImageTag = `${getExecutorRepositoryUrl(config)}:executor-${config.language}-latest`;
    console.log('Building image with tag:', imageTag);
    await $`executor --dockerfile /dockerfiles/${config.language}.Dockerfile --build-arg=EXECUTOR_IMAGE_NAME=${executorImageTag} --context /files --skip-tls-verify --destination ${imageTag}`;
  } catch (error) {
    console.error('An error occurred while executing the build command:', error);
  }
}
