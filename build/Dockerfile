# Have to use Ubuntu because images lib has an exotic subdepednency which doesn't exist on Alpine
FROM ubuntu:20.04

# note we cannot upgrade past nodejs 8 because of "images" lib
RUN apt-get update \
    && apt-get install bash -y \
    && apt-get install wget -y \
    && apt-get install git -y \
    && apt-get install curl -y \
    && wget -O /tmp/nodejs.deb https://deb.nodesource.com/node_12.x/pool/main/n/nodejs/nodejs_12.20.2-deb-1nodesource1_amd64.deb \
    && sh -c 'dpkg -i /tmp/nodejs.deb' \
    && mkdir -p /var/app \
    && useradd -u 1000 app \
    && chmod 700 -R /var/app \
    && chown -R app /var/app \
    && unlink /tmp/nodejs.deb

COPY ./build.tar.gz /tmp
# strips the first two folders when unzipping, getting rid of /tmp/build
RUN tar -xzvf /tmp/build.tar.gz -C /var/app --strip 2
RUN rm /tmp/build.tar.gz

USER app

CMD cd /var/app && npm start