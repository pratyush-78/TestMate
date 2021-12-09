#! /bin/bash

cd ~;
cd $2;
g++ $1;
if [ $? -ne 0 ]
then
    echo "Aborting : error";
    exit;
fi
echo "Compiled successfully";