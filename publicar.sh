echo "-Borrando dist"
# Borra la carpeta dist si existe
if [ -d "dist" ]; then
  rm -r dist
fi

echo "-Update version"
node updateVersion.js

echo "-Buildeando"
pnpm run build
cd dist

echo "-Publicando"
npm publish --access public

cd ..
echo "Subiendo a git"
git add .
git commit -m "Sync"
git push
