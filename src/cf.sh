#! /bin/bash

cd ~
cd ~/TestMate/
echo -e "Enter the contest round: \c"
read round
echo $round > temp.txt
# ./test < temp.txt
python3 init.py < temp.txt
# read -n1 ans;
