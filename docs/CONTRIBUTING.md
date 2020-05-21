# Contributing

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. You'll also find information
on making a pull request.

## Overview

[Getting Started](#getting-started)  
[Styleguides](#styleguides)  
[Making Changes](#making-changes)  
[Making a Pull Request](#making-a-pull-request)  

## Getting Started

### Git Configuration

You can **easily** keep inline with our coding guidelines, as well as extend your
own Git workflow, by updating your Global Git configuration (`~/.gitconfig`).

Follow the steps below to begin setting up your development environment:

1. Copy the [example Git configuration][1] below.

2. Run `npm i -g npm-run-all`

Reference: [Make .gitconfig Work for You][2]

```ini
# General Aliases
[alias]
  # Git Add & Commit - All in one step
  ac = "!f() { git add .; git cm \"$@\"; }; f"

  # Git Add, Commit, & Push - All in one step
  acp = "!f() { git ac \"$@\"; git push; }; f"

  # Add new git remote
  ar = "!f() { git remote add \"$0\" \"$1\"; }; f"

  # Checkout and push new branch to origin
  b = "!f() { git checkout -b \"$@\"; git push -u origin \"$@\"; }; f"

  # Delete a branch locally and remotely
  bdel= "!f() { git branch -D \"$@\"; git push origin --delete \"$@\"; }; f"
  
  # Git Commit with message
  cm = "!f() { git commit -m \"$@\"; }; f"

  # Checkout branch
  ch = "!f() { git checkout \"$@\"; }; f"

  # Checkout branch and pull latest version
  chp = "!f() { git ch \"$@\"; git pull; }; f"

  # Create new local repo, perform initial commit, and push to Github
  launch = "!f() { git local; git rao $@; git push -u origin master; }; f"

  # Start a new local repository and perform initial commit
  local = "!f() { git init; git add -A; git new \"Initial repository files\"; }; f"

  # Add new remote origin
  rao = "!f() { git remote add origin \"$@\"; }; f"

  # Remove local .git directory
  restart = "!f() { rm -rf .git; echo \"Removed .git directory.\"; }; f"

# Emoji Log Aliases
# See: https://github.com/ahmadawais/Emoji-Log/
[alias]
  # NEW: Use when you add something entirely new
  new = "!f() { git ac \"📦 NEW: $@\"; }; f"

  # TEST: Use when changes are related to testing or mock data
  test = "!f() { git ac \"✅ TEST: $@\"; }; f"

  # IMPROVE: Use when you improve/enhance a piece of code (ex: refactoring)
  imp = "!f() { git ac \"👌🏾 IMPROVE: $@\"; }; f"

  # FIX: Use when you fix a bug
  fix = "!f() { git ac \"🐛 FIX: $@\"; }; f"

  # DOC: Use when you add/update documentation (ex: README, inline docs)
  doc = "!f() { git ac \"📖 DOC: $@\"; }; f"
  
  # RELEASE: Use when changes are related to a release
  rlz = "!f() { git ac \"🚀 RELEASE: $@\"; }; f"


# Remote Aliases
[alias]
  # Push to development remote
  dev = "!f() { git push dev; }; f"

  # Push to production remote
  prod = "!f() { git push production; }; f"

  # Push to staging remote
  staging = "!f() { git push staging; }; f"

# Helper Aliases
[alias]
  # Recursively delete files matching a pattern
  pdel = "!f() { find . -type f -name \"$@\" -delete; }; f"

  # Generate a SSH key
  keygen = "!f() { ssh-keygen -t rsa -b 4096 -C \"$@\"; }; f"

```

[1]: ./.gitconfig
[2]: http://michaelwales.com/articles/make-gitconfig-work-for-you/

## Styleguides

### Commit Messages

This project follows [Emoji Log][1] standards when making commits.

Commit messages should follow one of the following templates:

1. **`📦 NEW: MESSAGE_GOES_HERE`** - Use when you add something entirely new
2. **`✅ TEST: MESSAGE_GOES_HERE`** - Use when changes are related to testing or mock data
3. **`👌🏾 IMPROVE: MESSAGE_GOES_HERE`** - Use when you improve/enhance a piece of code (ex: refactoring)
4. **`🐛 FIX: MESSAGE_GOES_HERE`** - Use when you fix a bug
5. **`📖 DOC: MESSAGE_GOES_HERE`** - Use when you add/update documentation (ex: README, inline docs)
6. **`🚀 RELEASE: MESSAGE_GOES_HERE`** - Use when changes are related to a release

For example:

```bash
  git new "Add Gulp configuration"
```

This will produce the following commit: `📦 NEW: Add Gulp configuration`

[1]: https://github.com/ahmadawais/Emoji-Log

### Workflow

This project uses the Gitflow Workflow, a Git workflow design that was first
published and made popular by [Vincent Driessen at nvie][1].

Gitflow has several benefits:

- Assigns specific roles to branches
- Defines how branches should interact
- Uses individual branches for preparing, maintaining, and recording releases
- Leverages all benefits of [Feature Branch Workflow][2]

[1]: https://nvie.com/posts/a-successful-git-branching-model/
[2]: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

#### Branch Naming Convention

When creating a new branch, the name should match the following format:
**`feature/`**, **`hotfix/`**, **`release/`**, or **`support/`** followed by **`<your_initials>/<branch_name>`**

For example:

```bash
  git b "feature/ld/dev-env-setup"
```

will create a new branch titled `feature/ld/dev-env-setup`

**Note**: The line above uses the `b` alias from [the example global Git configuration][1].

If using the `git flow` on the command line, the following should be added the
following to your Global Git configuration as well:

```ini
  [gitflow "prefix"]
    feature = feature/$INITIALS/
    release = release/$INITIALS/
    hotfix = hotfix/$INITIALS/
    support = support/$INITIALS/
    versiontag = v
```

where `$INITIALS` are your own.

[1]: ./.gitconfig

### JavaScript Style

- **2 spaces** – for indentation
- **No unused variables** – this one catches tons of bugs!
- **No semicolons** – It's fine. Really!
- Never start a line with `(` , `[` , or `````
  - This is the only gotcha with omitting semicolons – automatically checked for you!
- **Space after keywords** `if (condition) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.

For a detailed overview of our JavaScript style, visit [StandardJS][1].
You'll find not only an overview of Standard Style, but a list of editor plugins
as well.

To configure the linting options for this project, make changes to
`.eslintrc.json` and `.eslintignore` in the project root.

Reference: [Configuring ESLint][2]

[1]: https://standardjs.com
[2]: https://eslint.org/docs/user-guide/configuring

## Making Changes

### WordPress Engine

Skip the steps below if you've already cloned the repository and connected to
WordPress Engine.

1. Copy the snippet below to get your development environment setup:

  ```zsh
  git clone https://github.com/modelbcompany/DMNG-0008P.git
  ```

1. Download [Local][1]

  Once downloaded, log in with the Model B WPEngine credentials.

  [1]: https://wpengine.com/local/

1. Import the site

  Under File, click "Import Site" and select the `DMNG-0008P` repository.

1. Once imported, click "View Site."

### Local Development

1. With the site running, open the repository in the editor of your choice.

2. Following the Git Workflow mentioned above, create a new branch and begin
   making your changes.

## Creating a Pull Request

If you need help, make note of any issues in their respective files. If
applicable, create a unit test to reproduce the error. Make sure to label your
pr as "bug" and "help wanted."

### Submit for Review

- Use [**this template**][1]
- Label your pull request as `pull request` and `needs review`
- Prefix your pull request title with `PR  -`
- Assign the task to yourself and the appropriate reviewer

[1]: ./pull_request_template.md
