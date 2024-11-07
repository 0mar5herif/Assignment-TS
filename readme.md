# Playwright Assignment 🎭

This repository contains the tests for the assignment built with [Playwright](https://playwright.dev/).
Follow the documentation to run the test.

## Getting Started 🚀

### Prerequisites

- **Node.js**: Ensure that Node.js (version used `v22.11.0`) is installed on your machine. [Download Node.js here](https://nodejs.org/).

### Installation

1. Clone the repository via GitHub Desktop, any Git GUI, or the command line.
   - `git clone https://github.com/0mar5herif/Assignment-TS.git`
3. Navigate to the repository location
   - If using command line or terminal use `cd` followed by the folder path
4. Install Playwright by running `npm init playwright@latest`, and follow the installer prompts:
   - Select TypeScript as the language.
   - Configure end-to-end tests to be put in "tests" (without quotation marks)
   - Don't override config
   - Install all available browsers

### Running Tests 🧪

Once setup is complete, you can run the tests as such:

1. For parallel execution, run the test via `npx playwright test artwork-test-parallel.spec.ts`
2. For normal/sequential (non-parallel) execution, run the test via `npx playwright test artwork-test-sequential.spec.ts`

### Known Issues

1. WebKit tests fail due to API requests not returning any response (unknown if this is a bug or issue with the test code itself)

### Console Messages

1. Submit Artwork tests will log the test data used in the console
2. **Warning Code 1**: This message simply notifies the user that the artwork name created in the first test case "Submit Artwork test" was not found. This is most likely because the artwork name might be outdated or this is your first time running the test on this machine.
