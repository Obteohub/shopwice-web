const url = 'https://shopwice.com/graphql';

async function test() {
    const queries = [
        {
            name: 'Offset Arg Check',
            query: `query { products(first: 1, where: { offset: 10 }) { nodes { name } } }`
        },
        {
            name: 'Total Field Check',
            query: `query { products(first: 1) { total } }`
        },
        {
            name: 'Count Field Check',
            query: `query { products(first: 1) { count } }`
        },
        {
            name: 'PageInfo Total Check',
            query: `query { products(first: 1) { pageInfo { total } } }`
        }
    ];

    for (const q of queries) {
        console.log(`--- Testing ${q.name} ---`);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: q.query })
            });
            const json = await res.json();
            if (json.errors) {
                console.log("Result: FAILED");
                // console.log(JSON.stringify(json.errors[0].message, null, 2));
            } else {
                console.log("Result: SUCCESS");
                console.log(JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.log("Result: ERROR", e.message);
        }
        console.log("\n");
    }
}

test();
