FROM node:14

LABEL version="1.0"
LABEL description="Docker for Netflix project - Backend. Tools and Process RMIT Course."

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]