-- CreateTable
CREATE TABLE "Coach" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lessonTypeId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "coachBusyLevel" TEXT NOT NULL,

    CONSTRAINT "LessonType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoachToLessonType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LessonToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "Coach"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_name_key" ON "Coach"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CoachToLessonType_AB_unique" ON "_CoachToLessonType"("A", "B");

-- CreateIndex
CREATE INDEX "_CoachToLessonType_B_index" ON "_CoachToLessonType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LessonToParticipant_AB_unique" ON "_LessonToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_LessonToParticipant_B_index" ON "_LessonToParticipant"("B");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_lessonTypeId_fkey" FOREIGN KEY ("lessonTypeId") REFERENCES "LessonType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToLessonType" ADD CONSTRAINT "_CoachToLessonType_A_fkey" FOREIGN KEY ("A") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToLessonType" ADD CONSTRAINT "_CoachToLessonType_B_fkey" FOREIGN KEY ("B") REFERENCES "LessonType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToParticipant" ADD CONSTRAINT "_LessonToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToParticipant" ADD CONSTRAINT "_LessonToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
