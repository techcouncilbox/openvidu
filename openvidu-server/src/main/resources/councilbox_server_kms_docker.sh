#!/bin/bash

command=$(docker run -d -p 4443:4443 --name server-kms -v /var/run/docker.sock:/var/run/docker.sock -v /home/openvidu_certs/councilbox.jks:/home/openvidu_certs/councilbox.jks:ro -v /home/recordings:/home/recordings -e openvidu.recording=false -e openvidu.recording.path=/home/recordings -e openvidu.recording.free-access=false -e openvidu.publicurl=https://172.18.2.38:4443 -e openvidu.secret=uincBgf9ysUCIo4MNbrfMg5hsX6FYYak -e server.ssl.key-store=/home/openvidu_certs/councilbox.jks -e server.ssl.key-store-password=C0uncilbox@2016 -e server.ssl.key-alias=councilbox -e kms.uris=[\"ws://localhost:8888/kurento\"] -e MY_UID=$(id -u $USER) --net="host" councilbox/server-kms:2.0.0)

echo $command