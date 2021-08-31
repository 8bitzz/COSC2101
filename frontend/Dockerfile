FROM node:14

LABEL version="1.0"
LABEL description="Docker for Netflix project - FrontEnd. Tools and Process RMIT Course."

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]