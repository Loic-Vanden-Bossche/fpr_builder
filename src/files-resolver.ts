import { BuilderConfig } from "./config";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getCredentialProvider } from "./credential-provider";
import fs from "fs";
import { streamCollector } from "@aws-sdk/fetch-http-handler";

export const getFilesFromS3 = async (config: BuilderConfig) => {
  if (fs.existsSync('/files/game.zip')) {
    console.log('Game file already exists, skipping download');
    return;
  }

  const client = new S3Client({
    credentials: getCredentialProvider(config),
  });

  const command = new GetObjectCommand({
    Bucket: config.s3Bucket,
    Key: `${config.gameId}-game.zip`,
  });

  try {
    const response = await client.send(command);
    const body = response.Body;
    const readableStream = await streamCollector(body?.transformToWebStream()!);
    const filePath = `/files/game.zip`;

    if (!fs.existsSync('/files')) {
      fs.mkdirSync('/files');
    }

    fs.writeFileSync(filePath, readableStream);

  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while downloading the game file');
  }
}
