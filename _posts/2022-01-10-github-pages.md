---
title: Github Pages搭建过程
layout: post
author:
  name: codelive
  link: https://github.com/codelive
date: 2022-01-10 15:19:00 +0800
categories: [github, tutorial, pages, blog]
tags: [github]
# comments: true  # 是否可以评论，如果配置了gitalk
# pin: true
---

# Github Pages搭建过程


- 下载安装`Ruby`, `Ruby Gems`, `Jekyll` and `Bundler`

​		访问Ruby下载页面 [Downloads (rubyinstaller.org)](https://rubyinstaller.org/downloads/), 选择最新版本  [Ruby+Devkit 3.1.0-1 (x64)](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.1.0-1/rubyinstaller-devkit-3.1.0-1-x64.exe)


- 访问网站 [Jekyll Themes](http://jekyllthemes.org/) 找到你喜欢的Theme，不用fork直接拉取github源码，比如我喜欢 [Chirpy (jekyllthemes.org)](http://jekyllthemes.org/themes/jekyll-theme-chirpy/) , 访问github地址 [cotes2020/jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy/), 然后clone代码，并且编译运行

  ```shell
  git clone https://github.com/cotes2020/jekyll-theme-chirpy.git mypages
  cd mypages
  bundle
  bundle exec jekyll serve
  ```

  一切顺利后，在浏览器中访问 [http://localhost:4000](http://localhost:4000/) 查看结果

- 创建自己的站点，命名为 \<your github username\>.github.io,比如我的username是 `codelive`, 创建新的repository, 命名为: `codelive.github.io`, 然后直接拉取空的repository到本地

  ```shell
  git clone https://github.com/codelive/codelive.github.io.git
  ```

- 回到刚才的mypages目录，使用jekyll build构建输出
  
  ```shell
  bundle exec jekyll build
  ```

​		缺省输出是当前目录下 `_site` 目录

- 复制_site下面的所有文件到clone的codelive.github.io目录，然后增加所有文件到仓库，commit & push

  ```shell
  cd codelive.github.io
  git add .
  git commit -m "my first pages"
  git.exe push --progress "origin" main:main
  ```

- 过一会就可以通过 https://codelive.github.io访问你的站点了

- 回到myages下面，编辑 `_config.yml`文件，进行一些配置，再重新build->copy->commit & push

​	

​	之前使用fork的方法，并通过github actions来自动构建总是有问题，后来改用这种方法就没有问题了。
