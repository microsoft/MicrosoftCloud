# Needed to work around public port issue that causes CORS to fail
npm install -g gh
gh codespace ports visibility 3000:public -c $CODESPACE_NAME
echo "gh codespace ports -c $CODESPACE_NAME" >> ~/.bashrc