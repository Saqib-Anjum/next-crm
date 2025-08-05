import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Check if user already exists
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const result = await users.insertOne({ email, password: hashed, createdAt: new Date() });

    return NextResponse.json({ message: 'User created', userId: result.insertedId });
  } catch (err) {
    console.error('Signup API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
