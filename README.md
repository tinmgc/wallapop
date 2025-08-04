# Technical task

This repository contains test cases developed in Playwright to validate the Vacation Mode demo feature.

## Table of contents

1.  [Installation](#installation)
2.  [Test cases](#test-cases)
3.  [How to use](#how-to-use)
4.  [Notes](#notes)
5.  [License](#license)

## Installation

1. Install [Playwright](https://playwright.dev/docs/intro)
2. Clone this project in a folder

## Test cases
- TC-02 Validate that the vacation mode can be activated correctly
- TC-08 Validate that the items cannot be purchased during the vacation period

## How to use

1. Open a terminal in the Project folder
2. Execute: ```npx playwright test TC-02 --headed```

## Notes

During Playwright instalation this message was shown:

```You are using a frozen webkit browser which does not receive updates anymore on mac12. Please update to the latest version of your operating system to test up-to-date browsers.```

So because of that hardware limitation, I have disabled the webkit execution in ```playwright.config.ts```

## License

This project is [MIT licensed](./LICENSE).
