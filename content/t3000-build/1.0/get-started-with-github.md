---
title: "Get started with GitHub"
order: 100
appliesTo: "internal"
---

The long version of the same subject: installing Git and TortoiseGit, generating an SSH key, signing up, cloning, and the workflow used for the T3000 repository. It is the document a new developer reads first.

Table of Contents

Introduction to Git

Installing Tools

Installation of Git

Installation of Github for Windows

Procedire to Merge using Git Bash

Compilation on Microsoft Visual Studio 2010

Git commands summary

Cloning a repo from github.com using Git Bash Shell

TortoiseGit

Installation of msysgit, the windows version of Git

Installation of TortoiseGit

Sign up for a github account

Setting up SSH key

Working with repository

TortoiseGit andGithub workflow for T3000_Building_Automation_System project

Introduction to Git

While developing software where developers are spread across the globe, issues of version management become critical. What if two developers simultaneously work on the same module and try to upload their changes back? Situations like these are not uncommon in real-world. To solve problems such as these there exist Version Control Systems.

What is Git?

Git is a distributed version control system (dvcs) written in the programming language C. A distributed version control system keeps track of software revisions and allows many developers to work on a given project without necessarily being connected to a common network.

There is no central server which stores the data. Every local copy contains full history of source code.

Git keeps track of all versions. Therefore, you can revert to any point in your source code history.

The logo of git looks like below:

![](media/get-started-with-github-01.png)

Git is a distributed revision control and source code management (SCM) system with an emphasis on speed. Git was initially designed and developed by Linus Torvalds for Linux kernel development; it has since been adopted by many other projects. Every Git working directory is a full-fledged repository with complete history and full revision tracking capabilities, not dependent on network access or a central server. Git is free software distributed under the terms of the GNU General Public License version 2.

Local and Remote Repositories

In a distributed version control system everyone has a complete copy of the source code (including the complete history of the source code) and can perform version control operations against this local copy. The use of a dvcs does not require a central code repository.

Git commits file changes to your local repository and you can synchronize your repository with other (remote) repositories. Git allows you to clone repositories, e.g. create an exact copy of a repository including the complete history of the source code. Owners of repositories can synchronize changes via push (transferring changes to a remote repository) or pull (getting changes from a remote repository).

Refer to http://git-scm.com/book for detailed help on understanding git.

Installing Tools

Installation of git

Download git installer.

Double click on the setup file.

![](media/get-started-with-github-02.png)

Following dialog box opens. Click Next to continue.

![](media/get-started-with-github-03.png)

Read GNU General Public License. Click Next.

![](media/get-started-with-github-04.png)

Select destination location. This is the directory where you want to install git. Normally, default directory can be kept as it is. If you wish, you can change the directory by clicking on Browse button. Here, we will install git in the default directory. (C:\Program Files (x86)\Git). Click Next.

![](media/get-started-with-github-05.png)

If following dialog box appears, click Yes.

![](media/get-started-with-github-06.png)

Following screen appears. Leave all the default options as is and click Next.

![](media/get-started-with-github-07.png)

Following screen appears. Click Next.

![](media/get-started-with-github-08.png)

Following screen appears. Click Next to continue.

![](media/get-started-with-github-09.png)

Following screen appears. Click Next to continue.

![](media/get-started-with-github-10.png)

Setup will progress.

![](media/get-started-with-github-11.png)

Click Finish to complete the setup.

![](media/get-started-with-github-12.png)

Check installation in Start Menu.

![](media/get-started-with-github-13.png)

As can be seen, there are two sub menus under Git menu.

Git Bash

Git GUI

Installation of github for windows

Download github for windows from http://windows.github.com/

![](media/get-started-with-github-14.png)

Click on the link given for download.

![](media/get-started-with-github-15.png)

If any confirmation is asked by OS, click Save.

![](media/get-started-with-github-16.png)

Save the file on your computer at a chosen location.

File download progress bar would be shown.

![](media/get-started-with-github-17.png)

Once the download is complete, double-click on the same to install github for windows on your PC.

A dialog box for Security warning may appear.

![](media/get-started-with-github-18.png)

Github for windows starts installing.

![](media/get-started-with-github-19.png)

Istallation eventually gets over. Application starts.

The first screen in the application Github for Windows is as follows.

![](media/get-started-with-github-20.png)

Enter username and password in the given fields. You have to Sign Up with github to have these information.

![](media/get-started-with-github-21.png)

Application screen looks as follows.

![](media/get-started-with-github-22.png)

Once the application is installed on the PC, go to github website. Open the project you want to work on. For example, in my case, I am opening repository of T3000 Building Automation System.

In order to clone the repository from github to local PC, click on Clone in Windows button as shown below.

![](media/get-started-with-github-23.png)

You may get following warning message. Click Allow.

![](media/get-started-with-github-24.png)

The repository starts getting cloned on local PC. The application shows the progress of the same. Be patient. The repository, depending on its size, takes few minutes to download.

![](media/get-started-with-github-25.png)

Once cloning is over, the repositories look like this.

![](media/get-started-with-github-26.png)

If you click on the small blue arrow on the repository, you would be taken to the following screen.

![](media/get-started-with-github-27.png)

If you click on any of the links on history pane on right side, you get all the files that are there in the repository for that version.

![](media/get-started-with-github-28.png)

Once the file is modified in the repository, it appears on the screen as follows. I have the current file, which I am typing write now as the one which is to be committed to the repository. The same is shown on the screen.

![](media/get-started-with-github-29.png)

You can commit the change in the repository by adding a commit message and optionally an extended description. And then click on the COMMIT button given in the yellow area on right.

![](media/get-started-with-github-30.png)

Once the COMMIT button is clicked, changes are committed to the repository. But they are not in sync with the repository on the github server. To push the changes to the github server, click on sync button as shown in blue in the following figure.

![](media/get-started-with-github-31.png)

Following figure shows sync in progress.

![](media/get-started-with-github-32.png)

Once in sync, the same is shown as follows.

![](media/get-started-with-github-33.png)

You can work with github and repository in this manner.

Procedure to Merge

First decide a folder on your PC where you want to create local copy of your git repository and git working directory.

On my PC, this folder is “E:\Home\Personal\Extra Curricular\Proj4-Self\Repo1\Test2”.

![](media/get-started-with-github-34.png)

Open Git Bash and type following commands.

$ cd <”path of folder”>

$ git init

![](media/get-started-with-github-35.png)

Next step is to clone repository of T3000_Building_Automation_System from github server. To achieve this, type following command.

$ git clone “https://github.com/temcocontrols/T3000_Building_Automation_System.git”

Upon executing this command, a message similar to the one shown in screen shot below appears. It might take 5 to 15 minutes depending on internet speed to clone complete cloning of repository.

![](media/get-started-with-github-36.png)

Once the cloning is complete, folder on PC looks like as shown below. There would be a hidden sub-folder named “.git” which is local git repository. Outside of it Is working directory.

![](media/get-started-with-github-37.png)

Now, use following git commands to do tasks as desired. I am documenting normal steps that would be followed by development team (Alex) and documentation team (Jay).

Both documentation and development teams will have to clone git repository from github.com.

Run following commands to determine the branches present in the repository. Remember that once cloning is done, all these commands would work on local repository and not on repository on github server.

$ git branch

This command lists all the branches present in the local repository. In the list which appears following this command, there would be one branch with * marked. This is the current branch of the repository.

For basic concepts of git branch read following material:

http://git-scm.com/book/en/Git-Branching-What-a-Branch-Is

For complete tutorial on branching and merging refer to chapter 3 of Git Book.

http://git-scm.com/book/en/Git-Branching

Let’s say there are two branches:

Master and Documentation.

Documentation team shall move to Documentation branch by executing following command.

$ git checkout Documentation

This command loads all files and folders of repository to working directory.

Documentation team shall add its comments to all the source code files. Once, a particular level of commenting is reached, changes shall be committed to git repository by executing following commands.

$ git add “*.*”

$ git commit -m “commit message”

‘git add’ command adds files to the staging area and marks them for the commit (To understand this concept, read git theory from Git Book: http://git-scm.com/book/en/Getting-Started-Git-Basics). ‘git commit’ command actually commits staged files to repository.

Once the Documentation branch is updated, documentation team shall push it to github for the world to see it.

[I will update this procedure soon. I am still having some doubts on this, so trying to clarify from various sources of mine.]

Development team can fetch the contents from github server using following command.

$ git fetch

This command fetches all the new changes that have been pushed by documentation team to the local repository of development team.

Then development team may switch between master and documentation branches and go through the changes – that is, the commenting done by documentation team. It may decide to merge the changes of documentation branch to master branch using following command.

$ git checkout master

$ git merge documentation

These commands merge documentation to master branch. Now, the changes done by documentation team should have been reflected in master branch.

Once, this is done, development team shall push the changes to github and inform documentation team.

This way, both teams can collaborate.

[This procedure may change in near future as roughness would be smoothened out. Till then keeping this statement as it is. ]

Compilation on Microsoft Visual Studio 2010

Install MS Visual Studio 2010 on your PC.

Start MS Visual Studio from the main start menu.

![](media/get-started-with-github-38.png)

Go to the repository directory. Go to T3000 folder. Click on T3000.sln.

![](media/get-started-with-github-39.png)

An error window appears as follows. [Right now, not sure why is this error coming? Anyway, capturing it in this doc as of now. We will remove this once the issue is solved. ]

![](media/get-started-with-github-40.png)

The following screen appears.

![](media/get-started-with-github-41.png)

Right-click on FlexSlideBar project. And click Rebuild. This shall compile FlexSlideBar project.

![](media/get-started-with-github-42.png)

Similarly compile ModbusDllforVc project by right-clicking it and clicking Rebuild.

Similarly compile T3000 project by right-clicking it and clicking Rebuild.

Another way to compile all the projects is to right-click on solution T3000. And click on Rebuild Solution.

![](media/get-started-with-github-43.png)

Once the code is compiled successfully, Output window of IDE shall show some text as shown below.

![](media/get-started-with-github-44.png)

Once the code is compiled and it is Run, following application runs.

![](media/get-started-with-github-45.png)

Git commands summary

git config:

To set configuration parameters of git.

git help

To get help from man pages for git or any of its specific commands.

git clone

To clone a git repo from a remote repository.

git status

To get status of files that are to be staged / committed to the repository.

git add

To mark files to be added to the repository in the next commit.

git commit

To commit files to the repository.

git diff

To check differences between two versions.

git log

To view commit history.

gitk

To invoke a GUI to visualize history.

Cloning a repo from github.com using Git Bash Shell

Use pwd (present working directory) command to know your working directory.

![](media/get-started-with-github-46.png)

You can use git config –list to know present configuration settings of git.

![](media/get-started-with-github-47.png)

Use clone command as shown below to clone T3000 project from github website.

![](media/get-started-with-github-48.png)

Continuation of the same.

![](media/get-started-with-github-49.png)

Cloning done.

![](media/get-started-with-github-50.png)

TortoiseGit

Setting up of TortoiseGit involves following steps:

Installation of msysgit, the windows version of Git

Installation of TortoiseGit

Sign up for a github account

Setting up SSH key

Working with repository

Installation of msysgit

Download git installer.

Double click on the setup file.

![](media/get-started-with-github-51.png)

Following dialog box opens. Click Next to continue.

![](media/get-started-with-github-52.png)

Read GNU General Public License. Click Next.

![](media/get-started-with-github-53.png)

Select destination location. This is the directory where you want to install git. Normally, default directory can be kept as it is. If you wish, you can change the directory by clicking on Browse button. Here, we will install git in the default directory. (C:\Program Files (x86)\Git). Click Next.

![](media/get-started-with-github-54.png)

If following dialog box appears, click Yes.

![](media/get-started-with-github-55.png)

Following screen appears. Leave all the default options as is and click Next.

![](media/get-started-with-github-56.png)

Following screen appears. Click Next.

![](media/get-started-with-github-57.png)

Following screen appears. Click Next to continue.

![](media/get-started-with-github-58.png)

Following screen appears. Click Next to continue.

![](media/get-started-with-github-59.png)

Setup will progress.

![](media/get-started-with-github-60.png)

Click Finish to complete the setup.

![](media/get-started-with-github-61.png)

Installation of TortoiseGit

TortoiseGit is a GUI wrapper around git, and provides one of the cleaner user experiences. You'll need to download and install msysgit before installing TortoiseGit.

The first screen you'll be presented with is a splash screen.

![](media/get-started-with-github-62.png)

Click Next, and EULA will pop up.

![](media/get-started-with-github-63.png)

Select ‘I accept…’ and click Next.

Following screen appears.

![](media/get-started-with-github-64.png)

Make sure TortoisePLink is selected, and then press Next.

Screen for custom setup appears.

![](media/get-started-with-github-65.png)

Click Next.

Following screen appears. Click Install button.

![](media/get-started-with-github-66.png)

TortoiseGit gets installed and following screen appears. Click Finish.

![](media/get-started-with-github-67.png)

Your machine is now all set-up for playing with code on Github. You just need a Github account.

Sign up for github account

Go to github.com website.

![](media/get-started-with-github-68.png)

To setup github account, enter username, email id and password. Click ‘Sign up for free’.

![](media/get-started-with-github-69.png)

If there are any warnings, github shows them and takes you to the next page. Click on ‘Create an account’ button.

![](media/get-started-with-github-70.png)

Now your github account is ready and you are good to go.

![](media/get-started-with-github-71.png)

Setting up SSH key

To use your Github account on a Windows machine, you'll need to generate a new RSA key. You'll also need the following tools installed:

msysgit

TortoiseGit

Generate a new RSA key

RSA is an asymmetric encryption algorithm used to authenticate users without using passwords. It's used instead of passwords simply because it provides a mechanism for verifying who you are without giving the other end of the connection information they can use to impersonate you.

An RSA key consists of two halves: a public key and private key. You give your public key to other sites, which allows them to verify (using a lot of math) that you are the owner of your private key. You must keep your private key private.

Since a private key can theoretically be stolen, it's encrypted with a password (in RSA terms, a "passphrase"). So you need to make sure you both keep the private key in a safe place and remember the passphrase it's encrypted with.

To generate a new RSA key, you'll need to use a tool called Puttygen. It's installed along with TortoiseGit, and you may be able to find it in your start menu:

![](media/get-started-with-github-72.png)

Once it is running, you will be presented with following screen:

![](media/get-started-with-github-73.png)

Change the number in the lower-right hand corner, labeled with Number of bits in a generated key, to 4096. This is the current acceptable length for RSA keys. Once this is done, hit the Generate button.

Following screen appears. As indicated in the screen, you are supposed to move mouse over blank area of the screen till progress bar reaches its 100 percent value.

![](media/get-started-with-github-74.png)

The Puttygen program does not use Window’s built-in cryptographically secure random number source. So, this is the fallback option to obtain entropy.

Following screen appears.

![](media/get-started-with-github-75.png)

Do not close this window until the end.

Enter your chosen passphrase into both the ‘Key passphrase’ and ‘Confirm passphrase’ box.

Then, click Save private key and save it somewhere safe.

Don't close the window yet. You'll need all of the text in the Public key for pasting... box for the next step.

Give your public key to github

Open web browser. Log into your github account. In the top right corner click your username.

![](media/get-started-with-github-76.png)

From the screen that appears, click on ‘Edit your profile’.

![](media/get-started-with-github-77.png)

Then from the menu on left, click ‘SSH Keys’.

![](media/get-started-with-github-78.png)

Click on the button ‘Add SSH Key’.

![](media/get-started-with-github-79.png)

Go back to Puttygen window and copy text as shown below. Right click -> Select All would be a good option.

![](media/get-started-with-github-80.png)

Paste copied text in the textbox labeled Key. Also, enter a Title.

![](media/get-started-with-github-81.png)

Finally click ‘Add Key’.

That’s it. Make sure to keep your private key somewhere safe. And do not forget your passphrase.

Github Workflow

Before starting to learn the workflow, make sure you have following things:

Installed msysgit, the windows version of Git (section 6.1)

Installed TortoiseGit, a friendly GUI wrapper around msysgit (section 6.2)

A github account setup with public half of your private key (section 6.3 and 6.4)

Private key and passphrase (section 6.4)

A word about git and github:

Git is a decentralized version control system. The "decentralized" bit sets it apart from other version control systems like CVS, SVNor Perforce. "Decentralized" means that there is no central repository -- each developer has a repository (or a few copies) that contains the entire history of everything. This has some advantages:

You can make commits without being network-connected

You can commit without worrying about build-breakage

In a disaster scenario, you're fine unless every copy of the repo is wiped out

Unfortunately, these come at the cost of additional complexity.

To simplify things a bit, in most real-world scenarios, one repository is designated as blessed [In our case, this blessed repo would be: temcocontrols / T3000_Building_Automation_System]. This blessed repository serves as a central, true copy. All the other repositories (or, "clones") still contain the same version history; the blessed repository simply serves as synchronization primitive to make the workflow cleaner.

You can do a variety of things with a repository. These include --

Add new commits to a local repository (on your machine)

Send commits to another repository (on your machine or the network)

Get commits from another repository (on your machine or the network)

In the setup we're using, each developer interacts with three repositories:

The repository on your local machine

Your "fork" on Github

The "one true repo", which is the central, blessed repository

You're free to do whatever you want with the repository on your machine and your fork on Github. Typically, you'll make commits on your local repository and send them to your Github fork immediately (or, as soon as you're network-connected). Commits going into the blessed repository must go through a review process (using Github's wonderful interface) before they're accepted and merged into the codebase. This process is performed using a pull request on Github, which is detailed further down.

Forking:

Right now, we've only got the blessed repository. We need to create both your fork and your local copy set up. First, log into Github, navigate to our Github page and select a repository you'd like to work on. I'm going to assume for this case you want to work on T3000_Building_Automation_System.

Click the Fork button in the right-hand corner:

![](media/get-started-with-github-82.png)

After some hardcore forking action, you'll be greeted with your Github fork. This is your personal copy of the blessed repository.

Assuming your Github username is Jay and the name of the upstream repository is T3000_Building_Automation_System, your fork will be located at https://github.com/Jay/ T3000_Building_Automation_System.

[Remember, these names are just for example. In reality, username Jay has already been taken up by someone else. Here, I am mentioning the same because it would be easier to understand. Also, the usernames and repo names shown in diagrams are different ones. Do not get confused by that. Just have a look at diagram for position of the buttons and conceptual understanding, etc.]

Cloning your fork into a local repository

Git doesn't allow you to commit directly to a repository on the network -- you need to make a local copy before you can start doing work. Making a copy, in Git terminology, is called "cloning", and we're going to do it with TortoiseGit. Start by right-clicking on the Desktop (or other appropriate place) to bring up a context menu.

![](media/get-started-with-github-83.png)

From this menu, select Git Clone... and you'll be greeted with the following dialog:

![](media/get-started-with-github-84.png)

Here, you'll need to enter the URL for your Github fork, and the location of your private key. Do not enter the URL of the blessed, upstream repository. Once you've got the appropriate information inputted, click OK, and it will prompt you for your key's passphrase.

![](media/get-started-with-github-85.png)

Toss in your passphrase and hit OK. TortoiseGit will save your passphrase for an indeterminate amount of time.

If this is your first time connecting to Github's servers, you'll get the following message:

![](media/get-started-with-github-86.png)

Check to make sure that the rsa2 key fingerprint the dialog tells you is the same as in the screenshot; if it's not, then something is terribly wrong (it's not Github you're communicating with). The reason you get this dialog is due to the nature of public key cryptography. You don't yet have Github's public key. Once you connect once, their public key is saved on your machine and you'll never be prompted again. If their public key changes for some reason, you'll know immediately and Git will cease communication before any damage is done.

If the key fingerprint is correct, click Yes.

A window should pop up with a progress bar as the repository is copied to your machine (forked repo). Since it contains the entire history it can take a bit of time on a slow network connection.

Once it's finished downloading, we need to take one last step -- we need to tell your local repository about the blessed upstream repository (temcocontrols/T3000_Building_Automation_System). To start, open up the TortoiseGit settings by right-clicking in your repository and selecting Settings

![](media/get-started-with-github-87.png)

Select Remote from the left menu. You'll get this dialog, albiet without the details filled in:

![](media/get-started-with-github-88.png)

In the fields, put in

Remote: upstream

Url: The URL to the upstream repository:

git@github.com:temcocontrols/ T3000_Building_Automation_System

Putty Key: Your private key

Hit Add New, then OK. You're all set!

Making changes, adding commits

With your fresh clone, look around, make some changes. Add a file or something. Or get some actual work done.

When you've changed something, go to the main folder of your repository and open up the right-click context menu. From that menu, select Add...

![](media/get-started-with-github-89.png)

You'll get the dialog telling you which files have been added, removed or changed. Make sure they're all checked and hit OK. Do note that adding files does not commit them. You need to do that in a separate step.

![](media/get-started-with-github-90.png)

Once you've clicked OK, you'll get this:

![](media/get-started-with-github-91.png)

To hit the previous point home, this dialog gives you a helpful Commit... button to commit the files you've added/changed/removed. If you don't hit commit, you can select Commit from the right-click context menu at a later point in time. For now though, hit Commit... to arrive at this dialog:

![](media/get-started-with-github-92.png)

At this point, write a quick blurb about the changes you've made. The first line of your message should be no longer than 80 characters (basically, fit it in the one line of that text box). Each paragraph should be separated by exactly one blank line.

The defaults are usually what you want.

Hit OK to finalize your commit.

You should now be at this dialog:

![](media/get-started-with-github-93.png)

At this point, we've made a commit on our local repository. We want to send that commit up to our fork [Jay/ T3000_Building_Automation_System]; this action is called "Pushing". TortoiseGit gives us a helpful button to push our new commit to our fork. Click Push.

![](media/get-started-with-github-94.png)

As usual, the defaults are probably what you want here. Make sure that Remote is set to origin, not upstream, then click OK.

Once your commit is pushed to your Github fork, you can peek at your Github page with your browser to see the changes you've made. Note that they haven't been submitted for review for inclusion into the upstream repository. They're just on your fork.

Getting changes into the upstream repository

You've made changes to your Github fork [Jay/T3000_Building_Automation_System], but you need to get them into the upstream repository [temcocontrols/T3000_Building_Automation_System] for everyone else to have access to them. This is done by sending a pull request on the Github web interface. Log into your account and navigate to your fork's page. In the upper right-hand corner, there's a Pull Request button.

![](media/get-started-with-github-95.png)

Click the Pull Request button and you'll be taken to the pull request page.

![](media/get-started-with-github-96.png)

Throw in a title and a description for the pull request, and then hit Submit. We will be sent emails and will have a chance to add comments to your changes.

An important note is that any commits you send to your fork before the pull request is accepted will be merged into that pull request. This lets you make any changes in response to comments, but can be a bit of a surprise if you don't know about it ahead of time.

When the pull request is accepted, you'll be notified by email.

Getting upstream changes back into your copy

As all of this is going on, we'll be making changes and sending pull requests. To migrate those changes into your codebase, you'll need to use a Pull command. From the right-click context menu, select Pull.

![](media/get-started-with-github-97.png)

In the dialog that pops up, select upstream as the remote.

![](media/get-started-with-github-98.png)

Then just hit OK and any changes made by other people will be pulled into your local repository. They'll be sent to your Github fork when you next push to it.

Conclusion

In this way, TortoiseGit and Github are connected. There are built-in tools to establish a proper code-review workflow.

Accepting Pull Requests and Merging changes to upstream repo

By [temcocontrols/T3000_Building_Automation_System]

Managing Pull Requests

All pull requests sent or received by you are browsable through the pull request dashboard.

![](media/get-started-with-github-99.png)

Pull requests for a specific repository are also browsable by anyone with access by visiting the Pull Requests page.

![](media/get-started-with-github-100.png)

The pull request dashboard and the repository pull request list support a wide range of filtering and sorting controls. Use them to narrow down the list to the pull requests you're interested in.

Reviewing Proposed Changes

When you receive a pull request, the first thing to do is review the set of proposed changes. Pull requests are tightly integrated with the underlying git repository, so you can see exactly what commits would be merged should the request be accepted:

![](media/get-started-with-github-101.png)

You can also review the cumulative diff of all file changes across all commits.

![](media/get-started-with-github-102.png)

Pull Request Discussion

After reviewing the basic description, commits, and cumulative diff, the person tasked with applying the changes may have questions or comments. Perhaps the coding style doesn't match project guideline, or the change is missing unit tests, or maybe everything looks great and some props are in order. The discussion view is designed to encourage and capture this type of discussion.

![](media/get-started-with-github-103.png)

The discussion view starts with the pull request's original title and description and then captures additional activity to display chronologically from there. Any of the following types of activity are captured as they happen:

Comments left on the pull request itself.

Additional commits pushed to the pull request's branch.

File and line notes left on any of the commits included in the pull request's range.

Pull request comments are Markdown compatible, so you can embed images, use preformatted text blocks, and other formatting supported by Markdown.

Merging a Pull Request

Once a pull request is deemed satisfactory, anyone with push access to the destination repository can perform the merge. There are a variety of ways to accomplish this. Two popular methods are described below.

Merge directly on Github

If the merge will not have any conflicts, you can merge the pull request online without ever typing a single git command.

Open the pull request's page

Click the "Merge pull request" button

![](media/get-started-with-github-104.png)

Enter a commit message

![](media/get-started-with-github-105.png)

Click “Confirm Merge”

![](media/get-started-with-github-106.png)

TortoiseGit and Github workflow for T3000_Building_Automation_System project

Before reading this chapter, make sure you have read and understood chapter 6. This chapter only builds on the concepts explained in chapter 6 and makes use of those concepts w.r.t. T3000_Building_Automation_System project. This chapter would be mostly containing screen shots of T3000 project and related steps.

Github Terms:

Base repo: temcocontrols/T3000_Building_Automation_System. Base repo is the main repository of the code. This shall correspond to the finalized work of the team.

Fork repo: Each fork of the main repo corresponds to a team member’s work. In my case, this repo is: jay-github/ T3000_Building_Automation_System

Branch: Each branch within the fork and/or in the main repo can correspond to several kinds of things depending on how you want to work. Usually, each branch refers to a version of the project but can also correspond to different channels of development, like hotfixes or experimental work.

Pull Request: The pull request (in the Github ecosystem) corresponds to the task. Every time I want to contribute an isolated finished task to the main repo, I create a pull request corresponding to the commits made in that task. These commits are pulled from my fork to the main repo.

The ecosystem for Temco Controls software development is proposed as follows:

temcocontrols/T3000_Building_Automation_System remains the base repo controlled from a single point.

Each developer will fork his or her own repo. With this logic, my repository would be jay-github/ T3000_Building_Automation_System.

After forking the repo, each developer shall clone that repo in his own local PC. Work there and Push the changes back to his fork.

Once the changes are pushed to fork, developer shall send a Pull Request to temcocontrols on github.

The single person controlling temcocontrols repo would be able to review the work done by developer and also able to accept and merge or reject the pull request.

Let’s see how this can be done.

Sign in to the developer account.

![](media/get-started-with-github-107.png)

Generate SSH key.

![](media/get-started-with-github-108.png)

Screen below shows signed in home page for developer.

![](media/get-started-with-github-109.png)

Go to Edit Your Profile.

![](media/get-started-with-github-110.png)

Add SSH key.

![](media/get-started-with-github-111.png)

Fork temcocontrols/T3000… project

![](media/get-started-with-github-112.png)

Clone fork into local PC using TortoiseGit.

![](media/get-started-with-github-113.png)

Enter passphrase.

![](media/get-started-with-github-114.png)

Cloning may take some time.

![](media/get-started-with-github-115.png)

Eventually it will get over.

![](media/get-started-with-github-116.png)

Enter details of main repo (temcocontrols/T3000… repo)

![](media/get-started-with-github-117.png)

Here, for demo purpose, I have added newFile.txt in the repo directory on my local PC.

![](media/get-started-with-github-118.png)

Now, it’s time to send my changes to single person controlling temcocontrols repo. This is done by first committing changes, pushing them to own fork and then sending a pull request to temcocontrols.

Add… is shown below.

![](media/get-started-with-github-119.png)

TortoiseGit confirms what needs to be added.

![](media/get-started-with-github-120.png)

Select files to be added and click ok.

![](media/get-started-with-github-121.png)

File is added and click on Commit… to commit changes on local PC.

![](media/get-started-with-github-122.png)

Commit dialog box appears. Enter commit message and click ok.

![](media/get-started-with-github-123.png)

Once committed, if you want to send changes to your fork on github, click Push… or click Close.

![](media/get-started-with-github-124.png)

Select Destination as origin. Not upstream. Else changes would go to main repo instead of your fork and click ok.

![](media/get-started-with-github-125.png)

Some waiting…

![](media/get-started-with-github-126.png)

And pushing is done.

![](media/get-started-with-github-127.png)

Now notify temcontrols of the changes by clicking Pull Request on github website.

![](media/get-started-with-github-128.png)

Enter a title and a message.

![](media/get-started-with-github-129.png)

Click on Send Pull Request.

![](media/get-started-with-github-130.png)

Now, single person controlling main repo shall be able to merge the pull request as described in last section of chapter 6.

Following are screen shots of adding modifications. (In case Add… does not work)

![](media/get-started-with-github-131.png)

![](media/get-started-with-github-132.png)

Click on TortoiseGit -> Check for modifications

![](media/get-started-with-github-133.png)

![](media/get-started-with-github-134.png)

Click on Commit.

![](media/get-started-with-github-135.png)

![](media/get-started-with-github-136.png)

![](media/get-started-with-github-137.png)

![](media/get-started-with-github-138.png)

![](media/get-started-with-github-139.png)

![](media/get-started-with-github-140.png)

![](media/get-started-with-github-141.png)

![](media/get-started-with-github-142.png)

Push to github. TortoiseGit -> Push…

![](media/get-started-with-github-143.png)

![](media/get-started-with-github-144.png)

![](media/get-started-with-github-145.png)

![](media/get-started-with-github-146.png)

![](media/get-started-with-github-147.png)

![](media/get-started-with-github-148.png)

https://github.com/gitextensions/gitextensions/issues/2044

download and install

http://download.microsoft.com/download/2/B/F/2BF4D7D1-E781-4EE0-9E4F-FDD44A2F8934/NDP40-KB2468871-v2-x86.exe
