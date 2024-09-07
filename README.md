#Config

need to create `.env` file to store `SENTRY_DSN` information, or can easily copy `.env.test` to `.env`.

each service has own `.env.*-serivice` to store all env information related with that service.

this project using supabase as wrapper postgres database, so all service must have `SUPABASE_PROJECT_URL` and
`SUPABASE_SERVICE_KEY` in each `.env.*-serivice`

#How to Run

after install all dependency, to run all application can run each service with command

```bash
yarn start #to run api gateway
yarn start user-service #to run user service
yarn start order-service #to run order service
yarn start product-service #to run product service
yarn start warehouse-service #to run warehouse service
```
