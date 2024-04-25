FROM nginx:1.18-alpine
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk update && apk add tzdata && rm -rf /var/cache/apk/*

ARG dist
COPY build/nginx/nginx.conf /etc/nginx/nginx.conf
COPY $dist /var/www/html
