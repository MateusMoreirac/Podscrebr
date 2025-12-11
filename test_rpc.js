
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRpc() {
    console.log('Testing RPC decrement_stock...');

    // 1. Get a product to test with
    const { data: products, error: listError } = await supabase
        .from('products')
        .select('id, name, stock')
        .gt('stock', 0) // Get one with stock
        .limit(1);

    if (listError) {
        console.error('Error listing products:', listError);
        return;
    }

    if (!products || products.length === 0) {
        console.log('No products with stock > 0 found to test.');
        return;
    }

    const product = products[0];
    console.log(`Found product: ${product.name}, Current Stock: ${product.stock}`);

    // 2. Try the RPC call
    console.log('Calling decrement_stock...');
    const { data, error } = await supabase.rpc('decrement_stock', {
        product_id: product.id,
        amount: 1
    });

    if (error) {
        console.error('RPC Error:', error);
        console.log('\n--- DIAGNOSIS ---');
        if (error.code === '42883') {
            console.log('Function does not exist. The SQL query likely did not run successfully or was created in the wrong schema.');
        } else if (error.code === '42501') {
            console.log('Permission denied. The function exists but the "anon" role cannot execute it.');
        } else {
            console.log('Unknown error. Check the code and message above.');
        }
    } else {
        console.log('RPC Call Successful!');

        // Verify
        const { data: updatedProduct } = await supabase
            .from('products')
            .select('stock')
            .eq('id', product.id)
            .single();

        console.log(`New Stock: ${updatedProduct.stock}`);
    }
}

testRpc();
