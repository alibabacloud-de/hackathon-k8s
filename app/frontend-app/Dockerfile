FROM debian:jessie as helloword-app

WORKDIR /
RUN apt-get -qq update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
COPY . ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
