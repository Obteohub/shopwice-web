module.exports = {
    apps: [{
        name: "shopwice-web",
        script: "server.js",
        cwd: ".next/standalone",
        args: "",
        instances: "max",
        exec_mode: "cluster",
        env: {
            PORT: 3001,
            NODE_ENV: "production"
        }
    }]
}
