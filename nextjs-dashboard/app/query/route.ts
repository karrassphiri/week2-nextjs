import { db } from "@vercel/postgres";
import { NextResponse } from 'next/server';

const client = await db.connect();

async function listInvoices() {
  const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  
  return data.rows;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    // Ensure the result is returned as a valid NextResponse.
    return NextResponse.json(invoices);
  } catch (error) {
    // Handle error and return a proper response
    return Response.json({error}, { status: 500 });
  }
}
