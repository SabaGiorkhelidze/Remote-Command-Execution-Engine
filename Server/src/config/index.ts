export const sshConfig = {
    host: process.env.SSH_HOST, // Remote server IP
    port: 22,                   // SSH Port (default is 22)
    username: process.env.SSH_USER, // SSH username
    privateKey: process.env.SSH_PRIVATE_KEY, // SSH private key (or password if using that)
};