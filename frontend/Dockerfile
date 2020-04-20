FROM node

#set working directory
RUN mkdir /usr/src/app

#copy all files from current directory to docker
COPY . /usr/src/app

WORKDIR /usr/src/app


#add this to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

#install dependencies
RUN npm install

EXPOSE 8080

CMD ["npm","start"]