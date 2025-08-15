 "use client";
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword, passwordResetToken: undefined, passwordResetExpires: undefined } }
    );

    return NextResponse.json({ message: 'Password has been reset' });
  } catch (err) {
    console.error('Reset password API error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
