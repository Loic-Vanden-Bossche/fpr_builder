import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { streamCollector } from "@aws-sdk/fetch-http-handler";

(async () => {
  console.log('Running build command...');
  const gameId = await getGameIdFromEnv();

  await getFilesFromS3(gameId);

  await executeBuildCommand();
})();


async function executeBuildCommand() {
  const { $ } = await import('execa');

  try {
    const { stdout, exitCode } = await $`executor --no-push --dockerfile /dockerfiles/python.Dockerfile --context /game`;
    console.log(stdout, exitCode);
  } catch (error) {
    console.error('An error occurred while executing the build command:', error);
  }
}

async function getFilesFromS3(gameId: string) {
  const client = new S3Client({})

  const command = new GetObjectCommand({
    Bucket: "game-upload",
    Key: `${gameId}-game.zip`,
  });

  if (fs.existsSync('/files/game.zip')) {
    console.log('Game file already exists, skipping download');
    return;
  }

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const body = response.Body;

    const readableStream = await streamCollector(body);

    const filePath = `/files/game.zip`;
    fs.writeFileSync(filePath, readableStream);

  } catch (err) {
    console.error(err);
  }
}

async function getGameIdFromEnv() {
  const gameId = process.env.GAME_ID;
  if (!gameId) {
    throw new Error('GAME_ID not set');
  }

  return gameId;
}

async function unzipFile() {
  const { $ } = await import('execa');

  try {
    const { stdout, exitCode } = await $`unzip /files/game.zip -d /game`;
    console.log(stdout, exitCode);
  } catch (error) {
    console.error('An error occurred while unzipping the game file:', error);
  }
}
