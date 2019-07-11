# remove all containers
sudo docker stop $(sudo docker ps -q)

# remove all containers
sudo docker rm $(sudo docker ps -aq)

# remove all volumes
sudo docker volume rm $(sudo docker volume ls -q)
