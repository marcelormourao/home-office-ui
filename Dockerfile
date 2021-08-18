FROM nginx:1.21.1-alpine

LABEL MAINTAINER="marcelo.rmourao@gmail.com"

COPY conf/nginx/ /etc/nginx/templates/

COPY dist/ /usr/share/nginx/html/

ENV NGINX_ENVSUBST_OUTPUT_DIR /etc/nginx
