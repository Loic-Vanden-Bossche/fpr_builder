export const unzipFile = async () => {
  const { $ } = await import('execa');

  try {
    const { stdout, exitCode } = await $`unzip /files/game.zip -d /game`;
    console.log(stdout, exitCode);
  } catch (error) {
    console.error('An error occurred while unzipping the game file:', error);
  }
}
