import { BuilderConfig } from "./config";
import { fromContainerMetadata, fromEnv } from "@aws-sdk/credential-providers";

export const getCredentialProvider = (config: BuilderConfig) => {
  if (config.awsAccessKeyId && config.awsSecretAccessKey) {
    return fromEnv();
  }

  return fromContainerMetadata();
}
