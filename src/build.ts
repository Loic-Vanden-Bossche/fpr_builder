import { BuilderConfig } from "./config";
import { getRepositoryUrlFromConfig } from "./repository";

export const executeBuildCommand = async (config: BuilderConfig) => {
  const { $ } = await import('execa');

  try {
    const imageTag = `${getRepositoryUrlFromConfig(config)}:${config.gameId}`;
    console.log('Building image with tag:', imageTag);
    await $`executor --dockerfile /dockerfiles/python.Dockerfile --context /game --skip-tls-verify --destination ${imageTag}`;
  } catch (error) {
    console.error('An error occurred while executing the build command:', error);
  }
}
