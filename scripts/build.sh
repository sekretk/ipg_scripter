cd ../client
npm run build
cd ../server
npm run build
cd ..
cp -rf server/public server/dist/public
cp -rf server/views server/dist/views
cp -rf client/build/* server/dist/public/
cp server/.env server/dist/.env
