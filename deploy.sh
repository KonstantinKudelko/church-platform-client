eval `ssh-agent -s`
chmod 400 ~/ssh-keys/exportremote
ssh-add ~/ssh-keys/exportremote
cd chats
git stash
git pull origin $1
npm i
npm rebuild esbuild
npm run build
sudo cp -R dist/* /var/www/chat.expertremote/
sudo systemctl restart nginx
echo "Deploy done"