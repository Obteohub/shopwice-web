/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://shopwice.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
    exclude: ['/checkout', '/my-account', '/cart'], // sensitive paths
}
