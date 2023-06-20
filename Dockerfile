FROM public.ecr.aws/lambda/nodejs:18
COPY package*.json ./
COPY build/app.js ./
RUN npm install
CMD [ "app.handler" ]
