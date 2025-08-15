import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
