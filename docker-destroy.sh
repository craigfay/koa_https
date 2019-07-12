# force destroy all containers and their volumes
sudo docker rm -fv $(sudo docker ps -aq)
