#!/bin/sh

# バックアップの保存期間（days）
period=3

# バックアップ保存用ディレクトリの指定
dirpath='/dump'

# ファイル名を指定する(※ファイル名で日付がわかるようにしておきます)
filename=`date +%y%m%d`

# 指定したDBのスキーマおよびデータをすべて吐き出す
mysqldump -uroot -pphpapptest -hdb editmaster > $dirpath/$filename.sql

# パーミッション変更
chmod 700 $dirpath/$filename.sql

# 保存期間を過ぎたバックアップを削除
oldfile=`date --date "$period days ago" +%y%m%d`
rm -f $dirpath/$oldfile.sql