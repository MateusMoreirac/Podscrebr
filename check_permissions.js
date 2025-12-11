
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStockUpdate() {
    console.log('Testing stock update...');

    // 1. Get a product
    const { data: products, error: listError } = await supabase
        .from('products')
        .select('id, name, stock')
        .limit(1);

    if (listError) {
        console.error('Error listing products:', listError);
        return;
    }

    if (!products || products.length === 0) {
        console.log('No products found to test.');
        return;
    }

    const product = products[0];
    console.log(`Found product: ${product.name} (ID: ${product.id}), Stock: ${product.stock}`);

    // 2. Try to update stock
    const newStock = product.stock - 1;
    console.log(`Attempting to update stock to: ${newStock}`);

    const { data: updateData, error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', product.id)
        .select();

    if (updateError) {
        console.error('SERVER ERROR during update:', updateError);
    } else {
        console.log('Update successful!', updateData);
    }
}

testStockUpdate();
