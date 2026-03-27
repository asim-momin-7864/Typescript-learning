//* fetch with typescript
// same Web Resquest as axios but with fetch
const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplacholder.typecode.com/todo/1");
        // we need to manually check
        if (!response.ok) {
            throw new Error(` HTTP error ${response.status} `);
        }
        // data
        const data = await response.json();
    }
    catch (error) {
        console.log(" Error ", error.message);
    }
};
export {};
//# sourceMappingURL=14-webReq-fetch.js.map