# postgres-massive-api-react

1. Postgres DB - 
    within the '/postgres'
    docker-compose up -d
2. Postgres API - 
   within the '/postgresApi' folder
   docker build -t wiezmankimchi/postgresapi .
   docker-compose up -d
3. massive - react - app
   within the '/massivejs'
   docker build -t wiezmankimchi/massive-react .
   docker-compose up -d
