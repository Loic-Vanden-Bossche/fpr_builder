import JSZip from "jszip";
import fs from "fs";
import path from "path";

export const unzipFile = async () => {
  const filePath = "/files/game.zip";
  const zip = new JSZip();

  try {
    const fileData = await fs.promises.readFile(filePath);
    const loadedZip = await zip.loadAsync(fileData);

    for (const [relativePath, file] of Object.entries(loadedZip.files)) {
      if (!file.dir) {
        const extractedFilePath = path.join(path.dirname(filePath), relativePath);
        const extractedFileData = await file.async('nodebuffer');

        await fs.promises.mkdir(path.dirname(extractedFilePath), { recursive: true });

        await fs.promises.writeFile(extractedFilePath, extractedFileData);
      }
    }
  } catch (error) {
    console.error('An error occurred while unzipping the game file:', error);
  }
}
