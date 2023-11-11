import crypto from 'crypto';

import { createAssignmentBundleDataSchema } from '@open-data-capture/common/assignment';

import prisma from '@/lib/prisma';

export async function GET() {
  const data = await prisma.assignment.findMany();
  return Response.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();
  const result = await createAssignmentBundleDataSchema.safeParseAsync(data);
  if (!result.success) {
    return Response.json({ issues: result.error.issues, message: 'Bad Request' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await prisma.assignment.create({
    data: {
      assignedAt: new Date(),
      id,
      status: 'OUTSTANDING',
      url: `${process.env.GATEWAY_URL}/assignments/${id}`,
      ...result.data
    }
  });
  return Response.json({ success: true }, { status: 201 });
}
