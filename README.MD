npm install

npm test

debug file path
```
node_modules/@uniswap/v3-sdk/dist/v3-sdk.cjs.development.js

```



compile https://github.com/Uniswap/v3-sdk.git


```
cd v3-sdk
yarn
npm start


# make some code change
cp dist/*.js ../node_modules/@uniswap/v3-sdk/dist
```


### process with watch:

run this in separate terminal window
```
cd v3-sdk && yarn && npm start
```

make some change in the v3-sdk code
```
npm run copy && npm test
```
