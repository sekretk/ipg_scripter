## Release
`node scripts/release.js`
or in app `npm run release`

## Change logs
commit with prefix in message `(d)`

## Hosting
scheduler run `scripts/deploy.js` 
need to have a `.env` file to setup local env
env NOTIFY_URL - is used to notify in TelegramChannel
win services should be runned from Administrator user