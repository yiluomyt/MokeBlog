# 当不存在博客目录时，重新clone
if [ ! -d "content/blog" ]; then
  echo "--- Clone the Blog Repo ---"
  git clone https://github.com/yiluomyt/Blog content/blog
fi

# 更新博客Repo以及LFS文件
echo "--- Update Blog Repo & LFS Files ---"
cd content/blog
git pull
git lfs pull
cd ../../

# 构建
echo "--- Build for Deploy ---"
gatsby build