import { getConfigFromEnv } from "./config";
import { configureEcr } from "./ecr";
import { getFilesFromS3 } from "./files-resolver";
import { executeBuildCommand } from "./build";
import { unzipFile } from "./files-extractor";

(async () => {
  console.log('Running FPR game builder...');

  const config = getConfigFromEnv();

  await getFilesFromS3(config);
  await unzipFile();

  await configureEcr(config);
  await executeBuildCommand(config);
})();








