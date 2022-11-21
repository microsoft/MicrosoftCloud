##### Stage 1
FROM node:lts as node
LABEL author="Microsoft Cloud Advocates"
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY . .
RUN npm run build

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t nginx-react .
# docker run -p 8080:80 nginx-react