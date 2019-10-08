# Why Alibaba Cloud
We all know that as long as we have machines (or VMs). We can setup K8s without problems.
Then you might ask the question why we need to do it in Alibaba Cloud?
1. Price + Flexibility (But this is not we want to focus there)
   - You can setup and shutdown complete clusters in minutes
   - Alibaba Cloud is competitive in term of price, comparing to the other "A"s (Azure, AWS, Alphabet)
   - Alibaba Cloud is your partner in China?
2. Services integration.
    - In the first deployment demo, you have seen how to quota a OSS as disk in the deployment.

Below you can experiment how to use the log service to monitor your K8s cluster within 5 minutes.

## How to [Install SLS in Your K8s Cluster](https://www.alibabacloud.com/help/doc-detail/87540.htm?spm=a2c63.p38356.b99.129.18b225b268Ul2I#section-b3f-y5r-gfb)?
- Make sure you have activated SLS
- SLS installation is only configurable when you are deploying a default k8s cluster, but with command available for managed service. I personally prefer managed service, but it is not globally available in Alibaba Cloud.
    ```bash
    # do not forget to update your env for cluster id, uid and region-id
    wget https://acs-logging.oss-cn-hangzhou.aliyuncs.com/alicloud-k8s-log-installer.sh -O alicloud-k8s-log-installer.sh; chmod 744 ./alicloud-k8s-log-installer.sh; ./alicloud-k8s-log-installer.sh --cluster-id ${your_k8s_cluster_id} --ali-uid ${your_ali_uid} --region-id ${your_k8s_cluster_region_id}
    ```
    After installation finished, you should be able to make use of SLS by referring it in your deployment yaml file
    ``` yaml
    spec:
      env:
      - name: aliyun_logs_{Logstore name}
        value: {log path}
    ```
## Example for making your own logs
If it is as simple/easy as above, I will not update the git for you.

Below is an example showing you how to make use of SLS for [monitoring your own K8s cluster within Alibaba Cloud](https://www.alibabacloud.com/help/doc-detail/74878.htm?spm=a2c63.l28256.b99.74.18eb4211NyxBPb).

Concrete example of [creating template](https://www.alibabacloud.com/help/doc-detail/87129.htm?spm=a2c63.p38356.b99.153.7db622caw3Lf30) which is [using SLS for Nginx](https://www.alibabacloud.com/help/doc-detail/87129.htm?spm=a2c63.p38356.b99.153.7db622caw3Lf30).