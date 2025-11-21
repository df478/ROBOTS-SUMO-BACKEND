#!/bin/sh
set -e
# Aquí podrías agregar una espera para que la base de datos esté lista,
# por ejemplo, usando wait-for-it o similar.
npm run setup
exec node dist/src/main.js
