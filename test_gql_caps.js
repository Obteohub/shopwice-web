const url = 'https://shopwice.com/graphql';

async function test() {
    const query = `
    query TestPagination {
      foundCheck: products(first: 1) {
        found
        nodes { name }
      }
      offsetCheck1: products(first: 1, where: { offset: 0 }) {
        nodes { name }
      }
      offsetCheck2: products(first: 1, where: { offset: 1 }) {
        nodes { name }
      }
    }
  `;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (e) {
        console.error("Error:", e.message);
    }
}

test();
