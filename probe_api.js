
const fetch = require('node-fetch');

async function probeApi() {
    const candidates = [
        'https://shopwice.com/wp-json/wc/v3/products/reviews',
        'https://api.shopwice.com/wp-json/wc/v3/products/reviews',
        'https://shopwice.com/wp-json/wp/v2/comments',
        'https://api.shopwice.com/wp-json/wp/v2/comments',
        'https://shopwice.com/wc-api/v3/products/reviews',
        'https://api.shopwice.com/wc-api/v3/products/reviews'
    ];

    console.log("Probing API endpoints...");

    for (const url of candidates) {
        try {
            // Append a simple query to ensure we get a list (and minimal data)
            const testUrl = `${url}?per_page=1`;
            const res = await fetch(testUrl);

            console.log(`[${res.status}] ${url}`);

            if (res.ok) {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await res.json();
                    console.log(`   >>> SUCCESS! Found ${Array.isArray(data) ? data.length : 'object'} items.`);
                    console.log(`   >>> WORKING ENDPOINT: ${url}`);
                } else {
                    console.log(`   >>> Returned ${contentType}, not JSON.`);
                }
            }
        } catch (e) {
            console.log(`[ERR] ${url}: ${e.message}`);
        }
    }
}

probeApi();
