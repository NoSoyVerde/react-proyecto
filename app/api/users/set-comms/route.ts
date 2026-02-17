import { NextResponse } from 'next/server';
import { prismaBase } from '@/db/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, comms, phone } = body;

    if (!email || !comms) {
      return NextResponse.json({ error: 'email and comms are required' }, { status: 400 });
    }

    const updated = await prismaBase.user.updateMany({
      where: { email },
      data: {
        comms: comms === 'phone' ? 'PHONE' : 'MAIL',
        phone: phone || null,
      },
    });

    return NextResponse.json({ ok: true, updatedCount: updated.count });
  } catch (err: any) {
    console.error('set-comms error', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
