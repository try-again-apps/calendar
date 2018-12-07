FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

# Install app dependencies
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
