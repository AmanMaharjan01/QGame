FROM node:alpine
WORKDIR /SETUP

COPY . .
RUN npm run build
CMD ["npm","start"]