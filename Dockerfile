FROM node:14-alpine

WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production

# Copy application files
COPY . .

RUN yarn build
# Install Prisma CLI
RUN yarn global add prisma ts-node typescript

# Start Prisma server and Nest.js application
CMD prisma migrate deploy && yarn start:prod
