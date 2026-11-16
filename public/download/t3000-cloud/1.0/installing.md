---
title: "Installation"
order: 30
---

## Server Requirements

The minimum server requirements to install this API are:

- 4 GB of free disk space
- Single-core CPU
- 64 bit Linux
- A Ubuntu server with a minimum of 1 GB RAM

## Installing the API on Rock Pi 4

First of all you should follow the official instructions to see how you can get your Rock Pi ready:

[https://wiki.radxa.com/Rockpi4/getting_started](https://wiki.radxa.com/Rockpi4/getting_started)

In this page we are gonna choose Ubuntu Server 20.04 as the operation system, but you can pick whatever Linux distro you like from here:

[https://wiki.radxa.com/Rockpi4/downloads](https://wiki.radxa.com/Rockpi4/downloads)

After you get your Rock Pi ready, you should connect the device with Internet because we need to install some necessary packages, you can connect to the internet via WiFi or by Ethernet cable, for that you can also follow the official Wiki to see how you can do that:

[https://wiki.radxa.com/Rockpi4/Ubuntu#Network_Connection](https://wiki.radxa.com/Rockpi4/Ubuntu#Network_Connection)

### Installing the necessary packages

After you get your Rock Pi connected to the internet run the following to install Git and Curl:

```
sudo apt update -y
sudo apt install curl git -y
```

### Installing Node JS

Now we are going to install Node JS 18.x like this:

```
cd ~
curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
```

Refer to the [NodeSource documentation](https://github.com/nodesource/distributions/blob/master/README.md) for more information on the available versions.

Inspect the contents of the downloaded script with `nano` (or your preferred text editor):

```
nano /tmp/nodesource_setup.sh
```

When you are satisfied that the script is safe to run, exit your editor, then run the script with `sudo`:

```
sudo bash /tmp/nodesource_setup.sh
```

The PPA will be added to your configuration and your local package cache will be updated automatically. You can now install the Node.js package:

```
sudo apt install nodejs
```

Verify that you’ve installed the new version by running `node` with the `-v` version flag:

```
node -v
```

```
Output
v18.15.0
```

### Installing PostgreSQL & creating/preparing the database

install the Postgres package along with a `-contrib` package that adds some additional utilities and functionality:

```
sudo apt install postgresql postgresql-contrib
```

Ensure that the service is started:

```
sudo systemctl start postgresql.service
```

The installation procedure created a user account called **postgres** that is associated with the default Postgres role. There are a few ways to utilize this account to access Postgres. One way is to switch over to the **postgres** account on your server by running the following command:

```
sudo -i -u postgres
```

Then you can access the Postgres prompt by running:

```
psql
```

Now we need to create a role and database to let the API use to store the data, in the following sql code we will create a role with this name `t3000`, feel free to pick another name if you want, the same for the role we will use `t3_api` as the role name, you can pick any name you want, **and the most important thing,** don't forget to change the password to a strong password, this password will be used by the API to connect to the database:

```plsql
CREATE DATABASE t3_api;
CREATE ROLE t3000 WITH LOGIN NOSUPERUSER INHERIT CREATEDB NOCREATEROLE NOREPLICATION PASSWORD 'change_this_to_your_password';
GRANT CONNECT ON DATABASE t3_api TO t3000;
GRANT ALL PRIVILEGES ON DATABASE t3_api TO t3000;
```

after you execute the above sql query, we can exit from the psql by writing `exit` and enter and one more time to go back to our normal ubuntu user:

```
exit;
exit
```

### Installing the API

We first clone the API repository like this:

```
cd ~
git clone https://github.com/temcocontrols/T3000-API.git
cd T3000_API
```

Then we install & build the API:

```
npm install --force
npm run build
```

After this finish we will need to configure the API to connect to the PostgreSQL database, the API use `.env` file to store the database connection URL and some other configurations, so first we will copy the `.env-example` file to `.env` then we will open it by nano text editor like this:

```
cp .env-example .env
nano .env
```

you will see the file content like this:

```
ACCESS_KEY=your_access_key

DATABASE_URL=postgres://username:password@localhost:5432/db_name

PORT=3000

```

As you see, you just need to fill it with the database connection info that we just created above, db user name (`t3000` in our example) and replace `password` with your password  and the database name in our example is`t3_api`,

And don't forget to fill the access key with a strong password like text, because it will be used to protect the API, so our `.env` file content will look like this:

```
ACCESS_KEY=your_access_key

DATABASE_URL=postgres://t3000:your_password@localhost:5432/t3_api

PORT=3000
```

When you finish press `CTRL` + `X` then `y` and press `Enter` twice to save the changes.

### Creating the API tables in the database

Use this command to auto create the required tables in the database

```
npm run prisma:db-push
```

### Starting the API

Now you can run the API like this:

```
npm start
```

When the API start successfully, you will see your API URL like in the following example (Note that, the IP address might be different in your device ):

```
🚀 Server ready at:
http://127.0.0.1:3000/graphql
http://192.168.0.109:3000/graphql
```

As you see you will get multiple urls to use, the first one will work only on the Pi itself and the other/s depend on your local network, You can access the API from any device in the same network as your API Pi, just make sure that your device is connected to the same network as your API.
