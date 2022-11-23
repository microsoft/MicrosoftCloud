##### Stage 1
FROM node:lts as build
LABEL author="Microsoft Cloud Advocates"

# Grab the Azure Functions URL values from the build args passed in
ARG REACT_APP_ACS_USER_FUNCTION
ARG REACT_APP_ACS_MEETING_FUNCTION

## Used to pass Azure Functions URLs into the React build process
ENV REACT_APP_ACS_USER_FUNCTION=$REACT_APP_ACS_USER_FUNCTION
ENV REACT_APP_ACS_MEETING_FUNCTION=$REACT_APP_ACS_MEETING_FUNCTION

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY . .
RUN npm run build

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t nginx-react .
# docker run -p 8080:80 nginx-react