# 参考链接
[docker-compose](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)

# 权限
```sh
build-mongo-auth
```
使用` uri `方式链接即可
```sh
mongodb://xjh:123456@localhost:27017/user
```

# 无权限
```sh
build-mongo-no-auth
```
使用` uri `方式链接即可
```sh
mongodb://localhost:27017/
```


# 配置解释
```yaml
# 使用 docker-compose 的版本
version: '3'

# 需要启动的服务
services:
  # 自定义服务的名称
  database:
    # 需要运行的镜像
    image: mongo
    # 运行镜像后容器的名称
    container_name: 'mongodb-demo-no-auth'
    # 运行docker时候传递的环境变量
    environment:
        # 初始化的数据库名称
      - MONGO_INITDB_DATABASE=user
        # 初始化的用户名
      - MONGO_INITDB_ROOT_USERNAME=xjh
        # 初始化的密码
      - MONGO_INITDB_ROOT_PASSWORD=123456
    # 挂载的数据卷,把宿主机目录挂载到容器中,否则容器停止,数据就会随之消失,这步为了数据的持久化
    volumes:
      # 把额外编写的数据库添加用户的初始化文件挂载到容器中
      # 其中最后的 :ro 表示readonly只读 :rw 表示readwrite读写
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro
      # 把当前目录下的 db 文件夹作为数据库存储的目录挂载到docker容器中
      - ./db:/data/db
    # 把容器中的端口暴露出来
    ports:
      - 27017:27017

```
