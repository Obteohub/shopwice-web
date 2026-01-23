module.exports = {
    apps: [{
        name: "shopwice",
        script: "npm",
        cwd: ".",
        args: "start",
        instances: "max",
        exec_mode: "cluster",
        env: {
            PORT: 3001,
            NODE_ENV: "production"
        }
    }]
}
