// RSU Meloy Production Server - Standalone Build
// Wrapper untuk menjalankan Next.js standalone server

const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

// Set NODE_ENV to production
process.env.NODE_ENV = 'production';

// Get port from environment or use 3000
const port = process.env.PORT || 3000;

console.log('================================================');
console.log('   RSU Meloy Production Server');
console.log('================================================');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${port}`);
console.log(`Starting server...`);
console.log('================================================\n');

// Import and start the standalone server
require('./standalone/server.js');

console.log(`\n✅ Server ready on http://localhost:${port}`);