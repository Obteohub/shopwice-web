module.exports = {
    apps: [{
        name: "shopwice",
        script: "npm",
        cwd: ".",
        args: "start",
        instances: 1,
        exec_mode: "fork",
        env: {
            PORT: 3001,
            NODE_ENV: "production"
        }
    }]
}
