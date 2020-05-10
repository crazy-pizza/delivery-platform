backend 后端项目

技术架构：springboot spring mybatis mybatis-plus maven lombok log4j2 mysql \
启动方式：backend/src/main/java/com.delivery/Application 运行main函数

-------------
frontend 前端项目

技术架构：react antD webpack babel redux \
启动方式：frontend/package.json 点击start \
访问http://localhost:3000

-------------
jar包启动方式：

打开IDEA Terminal \
执行命令 mvn install \
java -jar backend/target/delivery-platform-1.0.RELEASE.jar \
访问 http://localhost:7000即可

-------------

后端接口文档： http://localhost:7000/doc.html \
建表sql：backend/src/main/resources/table.sql