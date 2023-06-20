(async () => {
  console.log('Hello World');

  await executeBuildCommand();

  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('Hello World 2');
      resolve();
    }, 10000000);
  });
})();


async function executeBuildCommand() {
  const { $ } = await import('execa');

  try {
    const { stdout } = await $`executor`;
    console.log(stdout);
  } catch (error) {
    console.error('An error occurred while executing the build command:', error);
  }
}
