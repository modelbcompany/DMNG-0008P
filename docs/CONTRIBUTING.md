# Contributing

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. You'll also find information
on making a pull request.

## Overview

[Getting Started](#getting-started)  
[Styleguides](#styleguides)  
[Making Changes](#making-changes)  
[Testing](#testing)  
[Documentation](#documentation)  
[Making a Pull Request](#making-a-pull-request)

## Getting Started

1. [Install and configure Yarn](https://classic.yarnpkg.com/en/docs/install)

1. Instead of cloning the repository,
   [download it instead](https://github.com/modelbcompany/DMNG-0008P/archive/master.zip)

### WordPress Development

This project uses [Local](https://wpengine.com/local/) for local WordPress
development.

#### Import Site

1. Download [Local](https://wpengine.com/local/)

1. [Connect Local to WP Engine](https://wpengine.com/support/local/#Connect_Local_to_WP_Engine)

1. Import `DMNG-0008P-master.zip` into Local

   - Set `Local site domain` to `woodmont.local`

1. Open the project in your terminal.
   - From the project root, run
     `git remote add origin https://github.com/modelbcompany/DMNG-0008P`

### Component & API Development

Copy the snippet below to get your development environment setup:

```zsh
yarn install
yarn dev
```

- Check the terminal for the Storybook development URL
- The API development server will be available at <http://localhost:9000/api>

### Git Configuration

You can **easily** keep inline with our coding guidelines, as well as extend
your own Git workflow, by updating your Global Git configuration
(`~/.gitconfig`).

Follow the steps below to begin setting up your development environment:

1. Copy the [example Git configuration](.gitconfig) below.

```ini
# Git Configuration
# See: http://michaelwales.com/articles/make-gitconfig-work-for-you/

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
  # Generate a SSH key
  keygen = "!f() { ssh-keygen -t rsa -b 4096 -C \"$@\"; }; f"

  # Recursively delete files matching a pattern
  pdel = "!f() { find . -type f -name \"$@\" -delete; }; f"

```

## Styleguides

### Commit Messages

This project follows [Emoji Log][1] standards when making commits.

Commit messages should follow one of the following templates:

1. **`📦 NEW: MESSAGE_GOES_HERE`** - Use when you add something entirely new
2. **`✅ TEST: MESSAGE_GOES_HERE`** - Use when changes are related to testing or
   mock data
3. **`👌🏾 IMPROVE: MESSAGE_GOES_HERE`** - Use when you improve/enhance a piece of
   code (ex: refactoring)
4. **`🐛 FIX: MESSAGE_GOES_HERE`** - Use when you fix a bug
5. **`📖 DOC: MESSAGE_GOES_HERE`** - Use when you add/update documentation (ex:
   README, inline docs)
6. **`🚀 RELEASE: MESSAGE_GOES_HERE`** - Use when changes are related to a
   release

For example:

```bash
  git new "Storybook configuration"
```

This will produce the following commit: `📦 NEW: Storybook configuration`

[1]: https://github.com/ahmadawais/Emoji-Log

### Workflow

This project uses the Gitflow Workflow, a Git workflow design that was first
published and made popular by
[Vincent Driessen at nvie](https://nvie.com/posts/a-successful-git-branching-model/).

Gitflow has several benefits:

- Assigns specific roles to branches
- Defines how branches should interact
- Uses individual branches for preparing, maintaining, and recording releases
- Leverages all benefits of
  [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

#### Branch Naming Convention

When creating a new branch, the name should match the following format:
**`feature/`**, **`hotfix/`**, **`release/`**, or **`support/`** followed by
**`<your_initials>/<branch_name>`**

For example:

```bash
  git b "feature/ld/app-header"
```

will create a new branch titled `feature/ld/app-header`

**Note**: The line above uses the `b` alias from
[the example global Git configuration](./.gitconfig).

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

## Making Changes

### 🚧 Serverless Functions

Directory: `packages/serverless`

TODO: Update documentation.

### Component Development

Directory: `packages/components/src/lib`

This project uses Storybook, a user interface development environment and
documentation tool for UI components. Storybook allows developers to create
components independently, as well as showcase them interactively in an isolated
development environment.

Following the
[Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/), this
project has a heavy focus on organization and documentation. The goal is to
build a well organized, appropriately documented component library that makes
implementing, testing, documenting, and maintaining production-grade UI
components more efficient.

#### Styling Components

Directory: `packages/components/src/lib/**/**/sass`,
`packages/components/src/sass`

Stylesheets are written in [Sass](https://sass-lang.com/), and follow the
[Sass Guidelines](https://sass-guidelin.es/) styleguide. Sass is a CSS
preprocessor used to add variables, functions, placeholders, mixins, and more to
CSS development.

This project currently supports the `.scss` syntax.

### WordPress

Directory: `app/public`

1. Once you've imported the site into Local, click `START SITE` in the top right
   corner of the application.

1. Click `VIEW SITE`.

## Testing

This project uses [Jest](https://jestjs.io/) as its test runner.

To run the tests in this project, run `npm test`.

For more information about testing components, visit
[Running Tests](https://create-react-app.dev/docs/running-tests) from the Create
React App docs.

## Documentation

Documentation should follow [TypeDoc](https://typedoc.org/guides/doccomments/)
or [JSDoc](https://jsdoc.app) standards.

Before making a pull request, be sure your code is well documented, as it will
be part of your code review.

## Creating a Pull Request

If you need help, make note of any issues in their respective files. If
applicable, create a unit test to reproduce the error. Make sure to label your
pr as "bug" and "help wanted."

If you're ready to have your changes reviewed, make sure your code is well
documented and run `yarn formatlint` to check your files for formatting and
linting errors.

### Submit for Review

- Use [**this template**](./pull_request_template.md)
- Label your pull request as `pull request` and `needs review`
- Prefix your pull request title with `PR -`
- Assign the task to yourself and the appropriate reviewer
