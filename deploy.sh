yarn build
rsync -rvz --delete --force dist/ deploy@avfacts.org:/var/www/avfacts.org/
