web: vendor/bin/heroku-php-apache2 -i .user.ini public/
worker: php artisan queue:restart && php artisan queue:listen database --memory 100