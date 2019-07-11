# remove all containers
sudo docker stop $(sudo docker ps -q)

# remove all containers and their volumes
sudo docker rm -v $(sudo docker ps -aq)
