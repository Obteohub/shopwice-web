
const fetch = require('node-fetch');

async function checkRefurbishedReviews() {
    console.log("----------------------------------------------------------------");
    console.log("STARTING DIAGNOSTIC CHECK FOR REFURBISHED REVIEWS");
    console.log("----------------------------------------------------------------");

    try {
        console.log("Step 1: Fetching recent 100 approved reviews...");
        const reviewsResponse = await fetch(
            'https://api.shopwice.com/wp-json/wc/v3/products/reviews?status=approved&per_page=100',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!reviewsResponse.ok) {
            console.error(`ERROR: Failed to fetch reviews. Status: ${reviewsResponse.status}`);
            return;
        }

        const reviewsData = await reviewsResponse.json();
        console.log(`SUCCESS: Fetched ${reviewsData.length} reviews.`);

        if (reviewsData.length === 0) {
            console.log("No reviews found.");
            return;
        }

        // Get unique product IDs
        const productIds = [...new Set(reviewsData.map(r => r.product_id))];
        console.log(`Step 2: Found reviews for ${productIds.length} unique products.`);
        console.log("Product IDs:", productIds);

        // Fetch details specifically for the first 30 products (matching component logic)
        console.log("Step 3: Fetching details for up to 30 products to check 'Condition' attribute...");

        const productsToCheck = productIds.slice(0, 30);
        const products = [];

        for (const productId of productsToCheck) {
            try {
                // Fetch individually to see progress, although slower
                process.stdout.write(`Fetching Product ID ${productId}... `);
                const response = await fetch(
                    `https://api.shopwice.com/wp-json/wc/v3/products/${productId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const product = await response.json();
                    products.push(product);
                    console.log("OK");
                } else {
                    console.log(`FAILED (${response.status})`);
                }
            } catch (err) {
                console.log(`ERROR: ${err.message}`);
            }
        }

        console.log("Step 4: Analyzing Products for 'Condition: Refurbish'...");

        const refurbishedProductIds = new Set();

        products.forEach(product => {
            const conditionAttr = product.attributes?.find(
                attr => attr.name?.toLowerCase() === 'condition'
            );

            let isRefurbished = false;
            let conditionValue = "Not Found";

            if (conditionAttr) {
                conditionValue = JSON.stringify(conditionAttr.options);
                isRefurbished = conditionAttr.options?.some(
                    opt => opt.toLowerCase().includes('refurbish')
                );
            }

            console.log(`Product ID: ${product.id} | Name: ${product.name}`);
            console.log(`   > Condition Attribute: ${conditionValue}`);

            if (isRefurbished) {
                console.log("   > MATCH: Identified as REFURBISHED");
                refurbishedProductIds.add(product.id);
            } else {
                console.log("   > No Match");
            }
            console.log("-----------------------------------------");
        });

        console.log(`Step 5: Filtering Reviews...`);
        const finalReviews = reviewsData.filter(review => refurbishedProductIds.has(review.product_id));

        console.log(`\n=========================================`);
        console.log(`FINAL RESULT: Found ${finalReviews.length} Refurbished Reviews`);
        console.log(`=========================================`);

        if (finalReviews.length > 0) {
            finalReviews.forEach((review, index) => {
                console.log(`#${index + 1} Review by ${review.reviewer} on ${review.date_created}`);
                console.log(`   > Product ID: ${review.product_id}`);
                console.log(`   > Content: "${review.review.replace(/<[^>]*>?/gm, '').substring(0, 50)}..."`);
                console.log(`-----------------------------------------`);
            });
        } else {
            console.log("No reviews matched the criteria. This explains why they are not showing on the site.");
        }

    } catch (err) {
        console.error("CRITICAL ERROR:", err);
    }
}

checkRefurbishedReviews();
