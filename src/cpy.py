from posixpath import realpath
import shutil
import os

fold = os.getcwd()
# print(fold)
base = os.path.expanduser("~/TestMate")
# print(base)
# os.makedirs(base)
if os.path.exists(base):
    print("TestMate folder already exists")
    exit()
shutil.copytree(fold, base)
# os.system("chmod -R 777 ./")
# for file_name in os.listdir(fold):
#     print(file_name)
#     source = fold +"/"+ file_name

#     if os.path.isfile(source):
#         print(file_name)
#         shutil.copy(source, base+"/"+file_name)
#         print('copied file: '+file_name)
