# isolarcloud-api-test-call

Install dependencies.

    >_ npm install

Create environment variables file.

    >_ touch .env

Properties for .env

    NETWORK_PORT=<port>

    # login credentials to https://portal.isolarcloud.com.hk/
    ACCOUNT=<email>
    PASSWORD=<password>

    # provided upon request
    APP_KEY=<api_key>
    ACCESS_KEY=<access_key>
    RSA_KEY=<rsa_key>

Run the app.

    Development server:     >_ npm run dev
    Deployment server:      >_ npm run start
