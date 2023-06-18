// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { CoachBusyLevel, CoachesName, LessonType } from '../types';

// initialize Prisma Client
const prisma = new PrismaClient();

async function generateCoaches() {
  await prisma.coach.createMany({
    data: [
      { name: CoachesName.Vika, email: 'test@vika.com' },
      { name: CoachesName.Sasha, email: 'test@sasha.com' },
    ],
  });
}

async function generateParticipants() {
  await prisma.participant.createMany({
    data: [
      { name: 'John Smith', email: 'john.smith@example.com' },
      { name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
      { name: 'Michael Davis', email: 'michael.davis@example.com' },
      { name: 'Emily Wilson', email: 'emily.wilson@example.com' },
      { name: 'David Lee', email: 'david.lee@example.com' },
      { name: 'Olivia Brown', email: 'olivia.brown@example.com' },
      { name: 'James Martin', email: 'james.martin@example.com' },
      { name: 'Sophia Rodriguez', email: 'sophia.rodriguez@example.com' },
      { name: 'Daniel Hernandez', email: 'daniel.hernandez@example.com' },
      { name: 'Ava Garcia', email: 'ava.garcia@example.com' },
    ],
  });
}

async function generateLessonTypes() {
  const coachVika = await prisma.coach.findUnique({
    where: { name: CoachesName.Vika },
  });

  const coachSasha = await prisma.coach.findUnique({
    where: { name: CoachesName.Sasha },
  });

  const lessonTypes = [
    // Sasha's lessons
    {
      type: LessonType.Personal,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id],
    },
    {
      type: LessonType.Group,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id],
    },
    {
      type: LessonType.Split,
      coachBusyLevel: CoachBusyLevel.Half,
      coaches: [coachSasha.id],
    },
    {
      type: LessonType.Massage,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id],
    },
    {
      type: LessonType.Other,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id],
    },

    // Vika's lessons
    {
      type: LessonType.Personal,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachVika.id],
    },
    {
      type: LessonType.Group,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachVika.id],
    },
    {
      type: LessonType.Split,
      coachBusyLevel: CoachBusyLevel.Half,
      coaches: [coachVika.id],
    },
    {
      type: LessonType.Massage,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachVika.id],
    },
    {
      type: LessonType.Other,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachVika.id],
    },

    // Shared lessons
    {
      type: LessonType.Personal,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id, coachVika.id],
    },
    {
      type: LessonType.Group,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id, coachVika.id],
    },
    {
      type: LessonType.Other,
      coachBusyLevel: CoachBusyLevel.Full,
      coaches: [coachSasha.id, coachVika.id],
    },
  ];

  console.log(lessonTypes);

  return Promise.all(
    lessonTypes.map((lessonType) => {
      return prisma.lessonType.create({
        data: {
          type: lessonType.type,
          coachBusyLevel: lessonType.coachBusyLevel,
          coaches: {
            connect: lessonType.coaches.map((coachId) => ({ id: coachId })),
          },
        },
      });
    }),
  );
}

async function generateLessons() {
  const participants = await prisma.participant.findMany();
  const lessonTypes = await prisma.lessonType.findMany();
  console.log('lessonTypes', lessonTypes);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const startTime = new Date();
  startTime.setHours(9);
  startTime.setMinutes(0);
  startTime.setSeconds(0);

  const lessonDuration = 60;

  participants.forEach((participant) => {
    days.forEach((day, i) => {
      let lessonStartTime = new Date(
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate() + i - startTime.getDay(),
      );
      console.log('lessonStartTime', { lessonStartTime, day });
      lessonStartTime.setHours(startTime.getHours());
      lessonStartTime.setMinutes(startTime.getMinutes());

      Array.from({ length: 10 }, async (_, i) => {
        const endTime = new Date(
          lessonStartTime.getTime() + lessonDuration * 60 * 1000,
        );

        await prisma.lesson.create({
          data: {
            name: `Lesson ${i + 1}`,
            startDate: lessonStartTime,
            endDate: endTime,
            lessonType: {
              connect: {
                id:
                  Math.floor(
                    Math.random() *
                      (lessonTypes[0].id -
                        lessonTypes[lessonTypes.length - 1].id +
                        1),
                  ) + lessonTypes[lessonTypes.length - 1].id,
              },
            },
            participants: {
              connect: { id: participant.id },
            },
          },
        });

        lessonStartTime = new Date(endTime.getTime() + 60 * 60 * 1000);
      });
    });
  });
}

async function main() {
  await generateCoaches();
  await generateParticipants();
  await generateLessonTypes();
  // await generateLessons();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
