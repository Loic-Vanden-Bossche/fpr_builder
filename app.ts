import Docker from 'dockerode';

(async () => {
  const docker = new Docker({socketPath: '/var/run/docker.sock'});
  await docker.info();
})();
