FROM node:14

WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production

# Copy application files
COPY . .

# Install Prisma CLI
RUN yarn global add prisma ts-node typescript

# Start Prisma server and Nest.js application
CMD prisma migrate deploy && prisma db push && prisma db seed && yarn start:prod
