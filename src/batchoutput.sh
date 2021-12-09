#! /bin/bash

cd ~;
cd $2;

for i in 0 1 2 3 4 5 6 7 8
do
    file=in$i.txt;
    outfile=out$i.txt;
    if [ -f $file ]
    then
        echo "Running testcase $i";
        echo "Your output"
        ./a.out < in$i.txt > res.txt;
        cat < res.txt;
        echo "expected..";
        cat < $outfile;
        if cmp --silent -- res.txt "$outfile"; then
            echo -e "\e[1;42m  veridct : PASS \e[0m"
        else
            echo -e "\e[1;31m  veridct : FAIL \e[0m"
        fi
        printf "\n";
        echo "------------------------------"
    fi
done


