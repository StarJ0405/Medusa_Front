const { default: Medusa } = require("@medusajs/medusa-js");


const medusaClient = new Medusa({
    baseUrl: "http://localhost:9000", // Medusa Backend URL
    maxRetries: 3,
});

export default medusaClient;