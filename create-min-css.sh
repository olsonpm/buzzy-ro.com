#! /usr/bin/env sh

cat css/ress.css css/hover.css css/index.css > dist/css/all.css
npx cleancss --compatibility ie7 -o dist/css/all.min.css dist/css/all.css
rm dist/css/all.css
