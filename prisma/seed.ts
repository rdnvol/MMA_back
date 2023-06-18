// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { CoachBusyLevel, CoachesName, LessonType } from '../types';

// initialize Prisma Client
const prisma = new PrismaClient();

async function generateCoaches() {
  const res = await prisma.coach.createMany({
    data: [
      { name: 'Vika', email: 'test@vika.com' },
      { name: 'Sasha', email: 'test@sasha.com' },
    ],
  });

  console.log({ res });
}

async function generateLessonTypesForCoach(
  coach: CoachesName,
  busyLevel: CoachBusyLevel,
) {
  const coachSasha = await prisma.coach.findUnique({
    where: { name: coach },
  });

  Object.values(LessonType).map(async (lessonType) => {
    return prisma.lessonType.create({
      data: {
        type: lessonType,
        coaches: { connect: [{ id: coachSasha.id }] },
        coachBusyLevel: busyLevel,
      },
    });
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
  await generateLessonTypesForCoach(CoachesName.Sasha, CoachBusyLevel.Full);
  await generateLessonTypesForCoach(CoachesName.Sasha, CoachBusyLevel.Half);
  await generateLessonTypesForCoach(CoachesName.Vika, CoachBusyLevel.Half);
  await generateLessonTypesForCoach(CoachesName.Vika, CoachBusyLevel.Full);
  await generateParticipants();
  await generateLessons();

  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
      participants: {
        select: {
          name: true,
          email: true,
        },
      },
      lessonType: {
        select: {
          id: true,
          coaches: {
            select: {
              name: true,
              email: true,
            },
          },
          coachBusyLevel: true,
          type: true,
        },
      },
    },
  });
  console.log(lessons);
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
