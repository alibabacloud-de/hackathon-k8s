# How to deploy a SAP UI5 web application to K8s cluster

## How to run web application
## How to prepare docker image
## How to push image to docker registry
```bash
docker build . -t [image-name]
#RAM user
sudo docker login --username=[RAM-USER]@[UID] registry-intl.eu-central-1.aliyuncs.com
#Master user
sudo docker login --username=[email] registry-intl.eu-central-1.aliyuncs.com
sudo docker tag [image-name]:[tag] registry-intl.eu-central-1.aliyuncs.com/[namespace]/[image-name]:[tag]
sudo docker push registry-intl.eu-central-1.aliyuncs.com/[namespace]/[image-name]:[tag]
```
## How to deploy to K8s cluster
```bash
kubectl create secret docker-registry regcred --docker-server=registry-intl.eu-central-1.aliyuncs.com --docker-username=yagrxu@gmail.com --docker-password=Yagr123! --docker-email=yagrxu@gmail.com
```