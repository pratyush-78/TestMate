from bs4 import BeautifulSoup as bs
import requests
import shutil
import os

def ParseTestCases(pre, curr_addr):
    x=0

    for p in pre:

        if x%2==0:      #input
            with open(f"{curr_addr}/sample_inp.txt", "+a", encoding='utf-8') as f:
                f.write(p.text)
        elif x%2==1:
            with open(f"{curr_addr}/sample_out.txt", "+a", encoding='utf-8') as f:
                f.write(p.text)
        x += 1



    # pre_input = pre[0].text
    # pre_output = pre[1].text

    # with open(f"{curr_addr}/sample_inp.txt", "+w",encoding='utf-8') as f:
    #     f.write(pre_input)

    # with open(f"{curr_addr}/sample_out.txt", "+w",encoding='utf-8') as f:
    #     f.write(pre_output)


def ParseQuestions(soup, base_addr):
    all_problems = soup.find_all("div", class_="problemindexholder" )
    if len(all_problems)==0:
        print("Contest not exist...")
        exit()

    os.makedirs(base_addr)
    problem_num = 0
    for div in all_problems:

        curr_addr = os.path.join(base_addr, chr(ord('A')+problem_num))
        os.makedirs(curr_addr)
        shutil.copyfile('template.cpp', curr_addr+"/sol.cpp")

        print(problem_num)
        pre = div.find_all("pre")
        ParseTestCases(pre, curr_addr)


        problem_num += 1

    os.system(f"gnome-terminal -e 'code {base_addr}'")
    os.system(f"gnome-terminal -e 'code {base_addr}/A/sol.cpp'")




cf = input()
url = "https://codeforces.com/contest/"+cf+"/problems/"

response = requests.get(url)

# Parse the Questions and make folderrs

soup = bs(response.content,'html5lib')
base_addr = os.path.expanduser("~/CF/"+cf)

if os.path.exists(base_addr):
    print("already exixts")
    exit()
else:
    ParseQuestions(soup, base_addr)

# parse for samples
