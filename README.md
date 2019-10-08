# Alibaba Cloud - K8 Hackathon
Welcome! This is a collection of links and hints that will help you to implement the various scenarios and bonus tasks of Alibaba Cloud Kubernetes Hackathon. 
Each section below is dedicated to one of the core scenarios. Each of these can be extended with the bonus tasks.
So most combinations are possible: 2B, 2C, 1A, 3D, etc.

Each section will list a couple of resources, links, and services we recommend to use to accomplish the individual scnearios and bonus task. But always feel free to find your own way!

# Core Scenarios
## 1 - Simple serverless cross-region deployment pipeline
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/s1.png "Simple CD Pipeline")
In this scenario you are trying to set up a simple continuous deployment pipeline between Mainland China and an overseas (i.e. outside of Mainland China) via public Git repository provider, such as Github.

Code artifacts such as binaries and docker images are being built overseas (HongKong) and then copied over to an Alibaba Cloud Container Registry instance in Shanghai over public internet. It is then automatically deployed to a Kubernetes cluster in Shanghai.

1. You'll need a Github (or BitBucket, Private Gitlab) project with a working Dockerfile that contains an app or a service that provides some sort of web interface. The [Kuard](https://github.com/kubernetes-up-and-running/kuard) project might be a good starting point for example, but feel free to bring your own project! 

2. A Managed Kubernetes Cluster on Alibaba Cloud in *Shanghai* (`cn-shanghai`) region. Check out our documentation at https://www.alibabacloud.com/help/doc-detail/95108.htm on how to create a cluster through the web console. Check out https://www.alibabacloud.com/help/doc-detail/86378.htm for information on how to configure `kubectl` to access your cluster.<br> 
**HINT**: You can also use [Alibaba Cloud Shell](https://www.alibabacloud.com/help/doc-detail/90256.htm) to have a pre-configured shell that let's you instantly work with `kubectl`. 

3. An existing Kubernetes Deployment object in your cluster (you need to create it by yourself!) that allows you to create a trigger for a redeployment. This trigger can then be used by your container registry (see 4.).
4. An [Alibaba Cloud Container Registry](https://www.alibabacloud.com/help/doc-detail/60945.htm) with the right build and trigger configuration. Make sure to pull from the VPC-endpoint to save on outbound internet bandwidth. Check out our documentation at https://www.alibabacloud.com/help/doc-detail/60997.htm

## 2 - Reliable geo-redundant serverless cross-region deployment pipeline
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/s2.png "Geo-redundant CD Pipeline")
In this scenario you will try to set up and configure a reliable and geo-redundant deployment pipeline between our *Shanghai* region and our *UK* region.

The binaries and docker images are being built and pushed to the Alibaba Cloud Container Registry instance in *UK*. The docker image is then asynchronously replicated over Alibaba Cloud global backbone network to a registry instance in *Shanghai* where the image is then automatically deployed to the Kubernetes cluster.

1. You'll need a Github (or BitBucket, Private Gitlab) project with a working Dockerfile that contains an app or a service that provides some sort of web interface. The [Kuard](https://github.com/kubernetes-up-and-running/kuard) project might be a good idea to start with for example.

2. A Managed Kubernetes Cluster on Alibaba Cloud in *Shanghai* (`cn-shanghai`) region. Check out our documentation at https://www.alibabacloud.com/help/doc-detail/95108.htm on how to create a cluster through the web console. Check out https://www.alibabacloud.com/help/doc-detail/86378.htm for information on how to configure `kubectl` to access your cluster.<br> 
**HINT**: You can also use [Alibaba Cloud Shell](https://www.alibabacloud.com/help/doc-detail/90256.htm) to have a pre-configured shell that let's you instantly work with `kubectl`. 

3. An existing Kubernetes Deployment object in your cluster (you need to create it by yourself!) that allows you to create a trigger for a redeployment. This trigger can then be used by your container registry (see 4.).

4. You will need two Alibaba Cloud Container Registries (ACR) *Enterprise Edition Basic Version* for cross-region image replication over Alibaba Cloud global backbone network: one in our *UK* (`eu-west-1`) region, one in our *Shanghai* (`cn-shanghai`) region.
Make sure to configure two different features:
    - the build and trigger configuration for both the *UK* and *Shanghai* based registries. The build will be done in UK, while the deployment will be done from *Shanghai*. Make sure to pull from the VPC-endpoint to save on outbound internet bandwidth. Check out our documentation at https://www.alibabacloud.com/help/doc-detail/60997.htm
    - the image replication from *UK* to *Shanghai*. No documentation available yet. Find your own way in the web console or ask Alibaba Cloud staff on-site.

# Bonus Tasks
## A - Access K8s Cluster via internal entry endpoint over CEN
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/cen.png "CEN Connection")

In this bonus task, you will set up a Cloud Enterprise Network(CEN) instance to inter-connect an Elastic Compute Service(ECS) instance in *German* (`eu-central-1`) region with existing Kubernetes cluster in *Shanghai* (`cn-shanghai`) region. Then you can access the Kubernetes cluster via internal entry endpoint, namely private IP belong to the CIDR of VPC, instead of a public IP address.
1. You will need to create an ECS instance with "Pay-As-You-Go" billig method in *German* (`eu-central-1`) region. Check out our documentation https://www.alibabacloud.com/help/doc-detail/87190.htm on how to create an ECS instance through web console.

2. Create a CEN instance then attach the VPC of kubernetes cluster in Shanghai region and VPC of ECS instance in German region. Buy the bandwidth package to enable the communication between networks across regions. In this case the two areas should be "Mainland China" and "Europe". For detailed information on the CEN configuration please check out https://www.alibabacloud.com/help/doc-detail/65980.htm.
**Hint**: You can find VPC of kubernetes cluster in [Container Service Console](https://cs.console.aliyun.com) and VPC of the ECS instance in [ECS Console](https://ecs.console.aliyun.com)

3. Ensure the status of ECS instance has turned into "running", then you can connect to the ECS instance. Check out our documentation https://www.alibabacloud.com/help/doc-detail/71529.htm on how to connect to an ECS instance. Afterwards, you will need to install `kubectl` in the ECS instance. Configure `kubectl` by using `KubeConfig (Internal Access)`. Check out https://www.alibabacloud.com/help/doc-detail/86378.htm for information on how to configure `kubectl` to access your Kubernetes cluster. After the configuration is done, you can access the Kubernetes cluster in *Shanghai* (`cn-shanghai`) region without going through public internet.

## B - Manage K8s Cluster via terraform (practice Infrastructure as Code)
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/terraform.png "Terraform")
In this bonus task, you will update your deployment pipeline by using terraform to create new or update your existing k8s cluster. Using terraform you can manage your infrastructure's life cycle declaratively and setup or remove infrastructure orchestrated by CI/CD tools automatically.

If you are using jenkins for CI/CD and provide your application/service on kubernetes. You can setup staging environment by ```terraform init & terraform apply --auto-approve```. After verifying the new released application/service, you can release the infrastructure by ```terraform destroy --auto-approve```.

If you have routing concept to expose your application/service, you can also make blue-green deployment based on switching complete from old cluster to a new cluster.

## C - Branching Workflow Support
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/b1.png "Branching Workflow")
In this bonus task you will extend your existing environment with support for a branching workflow. That is depending on the branch or a tag of a new check-in you will trigger different build and deployment actions that might target different Kubernetes clusters and/or Kubernetes Deployments in different regions.

An initial idea here is to introduce two branches: `dev` and `master`. Whenever a new check-in happens at the `dev` branch a new image should be built whose tag contains the string *dev*. Images tagged like that are to be deployed into the dev cluster in *UK* region.

Whenever a new check-in happens at the `master` branch a new image should be built whose tag contains the string *prod*. Images tagged like that should be replicated over to the registry instance in *Shanghai* and automatically deployed there in the production cluster. Of course, feel free to implement a different branching worflow according to your specific needs and ideas!

1. You will need an additional Kubernetes cluster in *UK* which will serve as your testing environment. Your existing Kubernetes Cluster in *Shanghai* will serve as your production cluster. Check out our documentation at https://www.alibabacloud.com/help/doc-detail/95108.htm on how to create a cluster through the web console. Check out https://www.alibabacloud.com/help/doc-detail/86378.htm for information on how to configure `kubectl` to access your cluster.<br> 
**HINT**: You can also use [Alibaba Cloud Shell](https://www.alibabacloud.com/help/doc-detail/90256.htm) to have a pre-configured shell that let's you instantly work with `kubectl`. 

2. Make sure to also create an according Kubernetes Deployment object in your testing cluster in *UK* that allows you to create a trigger for a redeployment. This trigger can then be used by your container registry in *UK*. 

3. You will need two Alibaba Cloud Container Registries (ACR) *Enterprise Edition Basic Version* for cross-region image replication over Alibaba Cloud global backbone network: one in our *UK* (`eu-west-1`) region, one in our *Shanghai* (`cn-shanghai`) region.
Make sure to account for the branching workflow and change the existing build and trigger configuration accordingly which can be either based on tags and/or on branches. Make sure to pull from the VPC-endpoint to save on outbound internet bandwidth. Check out our documentation at https://www.alibabacloud.com/help/doc-detail/60997.htm
    
## D - Reduce cost with Serverless K8s / Virtual Kubelets
In this scenario you will use a Serverless Kubernetes cluster to deploy your workloads to reduce costs of your infrastructure. In a Serverless cluster you are not billed based on the amount of worker nodes but based on the seconds your individual pods run. For short run jobs or dev/test scenarios this can lead to significant cost savings. Furthermore it completely frees you from any operational and maintenance burden you usually have with worker node clusters.

**Watch out**: Since Serverless Kubernetes is not available yet (at the time of writing - early Oct. 2019) in UK region, thus migtigation approach will be accpeted ;-). For instance, you can simply replace our *Shanghai*-based cluster with a Serverless Kubernetes cluster. Also keep in mind that Elastic Container Instances which Virtual Kubelet is depending on is also not available yet in *UK* as well so unfortunately you cannot use it either.

1. Create a new Serverless Kubernetes Cluster in *Shanghai* region. Please refer to https://www.alibabacloud.com/help/doc-detail/86366.htm for details and further information on the concepts. Alternatively, you can also install the Helm chart `ack-virtual-node` from our App Catalog which will add serverless capabilities to your existing cluster. Please refer to https://github.com/virtual-kubelet/alibabacloud-eci and https://github.com/virtual-kubelet/virtual-kubelet for detailed information.
2. Modify your trigger tasks of your *Shanghai* based registry to deploy into the newly created Serverless Cluster.

## E - Observability: Integration with Cloud Monitoring services
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/cloud-monitor-service.png "Cloud Monitoring integration")
In this scenario you will update the application code to be able to visualize the service performance in one of the Cloud Monitoring services.
1. [CloudMonitor](https://www.alibabacloud.com/help/product/28572.htm): CloudMonitor collects monitor metrics of Alibaba Cloud resources and custom metrics. The service can be used to detect the availability of your service and allows you to set alarms on specific metrics. CloudMonitor supports [terraform](https://www.terraform.io/docs/providers/alicloud/r/cms_alarm.html).
- You can [create alert for pods](https://www.alibabacloud.com/help/doc-detail/99683.htm) in k8s cluster
- It is also possible to [send custom metrics](https://www.alibabacloud.com/help/doc-detail/115004.htm)
- SDK supports Java/Python/PHP

2. [Log Service](https://www.alibabacloud.com/help/product/28958.htm): Log Service is a complete real-time data logging service that has been developed by Alibaba Group. Log Service supports collection, consumption, shipping, search, and analysis of logs, and improves the capacity of processing and analyzing large amounts of logs. CloudMonitor supports [terraform](https://www.terraform.io/docs/providers/alicloud/r/log_project.html). It has very convenient integration with [Log4j](https://github.com/aliyun/aliyun-log-log4j-appender) and SDK supports almost all major development programming languages.

3. [ARMS: Application Real-Time Monitoring Service](https://www.alibabacloud.com/help/product/34364.htm): Application Real-Time Monitoring Service (ARMS) is an end-to-end Alibaba Cloud monitoring service for Application Performance Management (APM). You can quickly develop real-time business monitoring capabilities using the frontend monitoring, application monitoring, and custom monitoring features provided by ARMS. ARMS is still in Beta version and it does not support terraform yet.
e.g. using browser monitoring You can easily integrate the web application with ARMS by simply copy lines of code to index.html.
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/browser-monitoring.png "ARMS-Browser-Monitoring")

## F - Use P2P Acceleration to increase download efficiency of images
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/b4.png "P2P Acceleration")
In this bonus task you will modify your cluster to make use of the peer-to-peer functionality of Alibaba Cloud Container Registry Enterprise Edition to improve the large-scale container image distribution capability and experience extremely fast image pulling. Usually, you won't notice any performance difference unless you have hundreds or thousands of nodes concurrently pulling images. Alibaba is using this technology internally for their own large-scale deployments. It is based on [Dragonfly](https://d7y.io). 

1. The current P2P acceleration plug-in supports only Dedicated Kubernetes and multi-zone Kubernetes clusters. It does not support Managed Kubernetes clusters. So make sure to launch a Dedicated cluster in *Shanghai* region and adapt the existing build and trigger tasks.

2. Follow the detailed instruction set on the web console when selecting the P2P Acceleration feature of the Container Registry in *Shanghai*. 
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/p2p.png "P2P Acceleration instructions")

# Did you know...?
- that you can use [Alibaba Cloud Shell](https://www.alibabacloud.com/help/doc-detail/90256.htm) and launch it with a pre-configured version of `kubectl`? See below screenshot on where to find this nice feature:
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/k8-cloudshell.png "Cloud Shell")
- that the App Catalog of Alibaba Cloud Container Service features many Helm Charts that can be simply installed through a built-in graphical user interface? See https://www.alibabacloud.com/help/doc-detail/64282.htm for details.
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/appcatalog.png "App Catalog")

# Authorization
There are two authorization layers in our container service:

1) One for our Cloud Management APIs of ContainerService. This includes authorization to list all clusters, to add nodes, etc. This is managed by Alibaba Cloud Resource Access Management (RAM).
2) One for managing access to the Kubernetes API Server: this includes for example rights to list pods, create deployments, etc. This is managed by Kubernetes RBAC.

Per default, only the root user of an account has a so-called `ClusterRoleBinding` to the cluster role `cluster-admin` that gives admin access to the K8 API Server. No RAM-user has any RBAC authorization, per default. It must be added explicitly. Unless you do that many actions also on the web-console will not work.

There are two ways how to configure RBAC for RAM-users:

1) Through the Alibaba Cloud Container Service web-console under the *Authorization*. You need to be logged-in as root-account or with a RAM user that has already been granted the `cluster-admin` role. There you can grant individual RAM-users pre-defined RBAC roles.
![alt text](https://github.com/alibabacloud-de/hackathon-k8s/raw/master/img/rbac.png "RBAC")

2) Through `kubectl` directly. Create a file with below content and replace the marked fields `metadata.name` with a unique name of your choice, and the field `subjects[*].name` with the UID of the RAM user. You can find this UID either in the RAM web console by clicking on the username or by invoking the *Aliyun CLI* like so:  `$ aliyun ram ListUsers`
and looking at the `userid` field.
Then create the new authorization object in the cluster like so:
```
$ kubectl apply -f <filename>
# filename contents
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: <your custom rolebindingname>
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  # Can be any of the other roles described below
  name: cluster-admin  
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: "<add RAM UID here"
```

The following pre-defined roles are available (see web-console description for details of authorization scope):
- `cluster-admin`
- `cs:ops`
- `cs:dev`

# Tools and General Links
This section contains a list of general resources and links to tools you may find useful to accomplish the tasks.

**Kubectl** - CLI for controlling the K8 cluster manager<br>
https://kubernetes.io/docs/tasks/tools/install-kubectl/

**Docker Desktop for Mac / Windows** - The Docker CLI and runtime<br>
https://hub.docker.com/?overlay=onboarding

**Aliyun CLI** - The official Alibaba Cloud CLI<br>
https://github.com/aliyun/aliyun-cli

**Terraform for Alibaba Cloud** - Documentation of the Alibaba Cloud Resource Provider<br> 
https://www.terraform.io/docs/providers/alicloud/

**Alibaba Cloud Documentation** - Official Alibaba Cloud documentation<br>
https://www.alibabacloud.com/help

# Contacts
Alibaba Cloud International Solution Architect/German Team 
