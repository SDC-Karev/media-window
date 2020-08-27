

echo  ""
echo  "Setting up\"Media Window\" Component for Steam FEC"
echo  ""

echo ""
echo " Working on correct/up-to-date branch"
git checkout master
git pull origin master

echo ""
echo " Installing Dependencies"
npm i

echo ""
echo " Building Webpack"
npm run build-db

echo ""

echo " Configuring database"


npm run seed
echo "Configuration Complete!"


