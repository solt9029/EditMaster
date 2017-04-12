# 環境構築

## バージョン

- composer: 1.3.2~

- docker: 1.13.1~

- docker-compose: 1.11.1~

## 構築手順

EditMaster/で以下のコマンドを打ちPHP関連のライブラリをインストールする。

```
composer install
```

EditMaster/docker/で以下のコマンドを打ちバックグラウンドでサーバコンテナを立ち上げる。

```
docker-compose up -d
```

EditMaster/app/Config/const.php.defaultをコピーし、EditMaster/app/Config/const.phpに名前を変更する。自分の必要なAPIキー情報を格納する。

EditMaster/app/Config/database.php.defaultをコピーし、EditMaster/app/Config/database.phpに名前を変更する。使用するデータベースの情報を書き込む。通常docker-compose.ymlで設定したMySQLを使用するはずなので、設定は以下のようになる。

```
<?php
class DATABASE_CONFIG {
	public $default = array(
		'datasource' => 'Database/Mysql',
		'persistent' => false,
		'host' => 'db',
		'login' => 'root',
		'password' => 'phpapptest',
		'database' => 'editmaster',
		'prefix' => '',
		'encoding' => 'utf8',
	);
}
```

これでhttp://(docker machineのIPアドレス):8007にアクセスすることで見ることができる。