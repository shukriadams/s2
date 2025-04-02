# Have to use Ubuntu because images lib has an exotic subdepednency which doesn't exist on Alpine
FROM ubuntu:20.04

# note we cannot upgrade past nodejs 8 because of "images" lib
RUN apt-get update \
    && apt-get install bash -y \
    && apt-get install wget -y \
    && apt-get install git -y \
    && apt-get install curl -y \
    && apt-get install python3-minimal -y \
    && apt-get install python3-pip -y \
    && curl -s -O https://deb.nodesource.com/node_12.x/pool/main/n/nodejs/nodejs_12.20.2-deb-1nodesource1_amd64.deb \
    && dpkg -i nodejs_12.20.2-deb-1nodesource1_amd64.deb \
    && rm nodejs_12.20.2-deb-1nodesource1_amd64.deb \
    && mkdir -p /var/s2 \
    && useradd -u 1000 s2 \
    && chmod 700 -R /var/s2 \
    && chown -R s2 /var/s2 

COPY ./build.tar.gz /tmp
# strips the first two folders when unzipping, getting rid of /tmp/build
RUN tar -xzvf /tmp/build.tar.gz -C /var/s2 --strip 2
RUN rm /tmp/build.tar.gz

USER s2

CMD cd /var/s2 && npm start