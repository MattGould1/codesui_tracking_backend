#!/bin/bash

#cp -a /config/default.conf /etc/nginx/conf.d/

 set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data;

chown -R www-data:www-data /var/www/html/
chmod -R 0755 /var/www/html/

nginx -g "daemon off;"