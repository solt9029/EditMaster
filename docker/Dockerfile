FROM centos:6
MAINTAINER Takayuki Miwa <i@tkyk.name>

RUN rpm -ivh http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
RUN yum install -y httpd
RUN yum install --enablerepo=epel,remi-php56,remi -y \
                              php \
                              php-cli \
                              php-gd \
                              php-mbstring \
                              php-mcrypt \
                              php-mysqlnd \
                              php-pdo \
                              php-xml \
                              php-xdebug

RUN sed -i -e "s|^;date.timezone =.*$|date.timezone = Asia/Tokyo|" /etc/php.ini

EXPOSE 80
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]

