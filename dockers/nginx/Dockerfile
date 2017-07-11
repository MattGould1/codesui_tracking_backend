FROM nginx:latest

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

ADD start.sh /start.sh
RUN chmod 777 /start.sh
RUN mkdir /config

RUN mkdir /logs
RUN chmod -R 777 /logs

# RUN set -x ; \
#   addgroup -g 82 -S www-data ; \
#   adduser -u 82 -D -S -G www-data www-data;

# RUN chown -R www-data:www-data /var/www/html/*
# RUN chmod -R 0755 /var/www/html/*

# COPY ./ssl-certs /etc/nginx/ssl-certs
# COPY ./.env /var/www/html/
EXPOSE 80

ENTRYPOINT ["./start.sh"]
