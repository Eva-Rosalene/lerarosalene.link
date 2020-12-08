#!/bin/bash

cd dist
rsync -r ./. "${SERVER}":/var/www/html/
