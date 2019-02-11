**Getting started**

1. open terminal in this folder
2. type command ```git status```
3. check that everething clear
4. checkout to master branch and pull last changes
5. add one more ```remote``` like this (my_repo is just an example of the name, link should lead to your repo)
```
  git remote --add my_repo https://github.com/Alex/ArrayRealisation
```
6. copy code of your implementation to desktop for example
7. push this repo to your repository
```
  git push -f my_repo master
```
8. checkout to new ```development``` branch
9. install ```node_modules``
10. checkout to new branch ```fix/lint_error_tests```
11. fix all lint error and commit your changes
12. create pull request to ```development```
  - ask for accepting it and remove previos branch
***Add 2 your team partner as collaborator to this repo, he will accept your PR***
 - set up this ***[settings](https://help.github.com/articles/enabling-required-reviews-for-pull-requests/)*** to 2
 - reviewer has to left some comments after review
13. checkout to ```development``` branch
14. checkout to new ```feature/array_implementation``` branch
15. put code of your Array implementation to ```index.js```
16. fix all lint error and commit your changes
17. checkout to new ```fix/some_method``` branch
18. apply changes for this as one commit or several
    - one commit for one error
    - if this changes fix several tests, list all cases in this commit (below - **example for 3 cases changes**)
    ```
    git commit -m"fix/some_method
      * check length of ...
      * must be a function
      * should calls 3 time"
    "
    ```
19. commit and push, create pull request to ```development```
20. ask for accepting it and remove previous branch
21. repeat steps `17-20`

   ***I hope you'll have fun this time.***