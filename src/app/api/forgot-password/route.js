import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { email } = await request.json();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User with that email does not exist' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 3600000; // 1 hour

    await users.updateOne(
      { _id: user._id },
      { $set: { passwordResetToken, passwordResetExpires } }
    );

    const resetUrl = `${request.headers.get('origin')}/auth/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Forgot password API error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
