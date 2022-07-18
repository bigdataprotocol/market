After BE infrastructure is deployed - you can deploy frontend using any static website service you like (S3, Vercel, Netlify, etc.). 
For that you will have to use the combination of 4 repos. For BDP Marketplace the links to the repos are the following:
1. [Market (this repo)](https://github.com/bigdataprotocol/market)
2. [Contracts](https://github.com/compositedev/contracts)
3. [JS lib](https://github.com/compositedev/bdp.js)
4. [Art](https://github.com/compositedev/art)

The repos are connected in the following way:
```
Art -> Market <- JS lib <- Contracts
```

When deploying Marketplace to the new network - you'll have the new addresses of backend components and contract addresses. Here is the list of files that you need to update:
1. [Backend components here](https://github.com/compositedev/bdp.js/blob/v3/src/utils/ConfigHelper.ts)
2. [Contract addresses](https://github.com/compositedev/contracts/blob/main/artifacts/address.json)
3. [Aquarius URI, supported chains, etc.](https://github.com/bigdataprotocol/market/blob/v3/app.config.js)
4. [Subgraph URI](https://github.com/bigdataprotocol/market/blob/v3/apollo.config.js)

**Note**: when you update the dependent library (`JS lib`, `art` or `contracts`) you will need to update the dependencies in **each upstream library**.
It means that if you update the `contracts` - you'll have to update both `JS lib` and `Market`. 
Essentially, updating library means repointing library to the new commit in `package.json` file in the upstream repo.
Example:
Let's say we changed Rinkeby BDP token address at `contracts` repo, and commited it under the [b106cc377fbe8b74ede487403021d4d325ff696d](https://github.com/compositedev/contracts/commit/b106cc377fbe8b74ede487403021d4d325ff696d) hash.
1. We go to the `JS lib` repo and commit the update the `package.json`. In our example we got the following commit: [c20a9eb79d6fde61ea65279656b3ef8392cc1220](https://github.com/compositedev/bdp.js/commit/c20a9eb79d6fde61ea65279656b3ef8392cc1220)
2. We update `package-lock.json`. For that we need to run the following commands:
```
rm -R node_modules
npm i
```
`package-lock.json` will be automatically updated. Now you need to commit this change as well: [d868f98a3f41e42531f0aa26694d1f6bf8f5cef4](https://github.com/compositedev/bdp.js/commit/d868f98a3f41e42531f0aa26694d1f6bf8f5cef4)

3. We update, patch and commit the dependencies in main repo: [7dd372b834423967c06bc47d5ef46579105cf540](https://github.com/bigdataprotocol/market/commit/7dd372b834423967c06bc47d5ef46579105cf540)
```
rm -R node_modules
npm i
git add -A
git commit -m "update dependencies"
git push
npm start # optionally, to start the website
```
