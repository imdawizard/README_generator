// TODO: Include packages needed for this application.........done"\u2713"
const { table } = require('console');
const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Create an array of questions for user input
function promptUser () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provide a short description explaining the what, why and how of your project(ex. what was your motivation?, Why did you build this project?, What problem does it solve? What did you learn?'
        },
        {
            type: 'input',
            name: 'tableOfContents',
            message: 'Would you like to add a table of Contents? (y/n):',
            validate: function (input) {
                const validOptions = ['y', 'n'];
                if (!validOptions.includes(input.toLowerCase())) {
                    return 'Please enter either a "y" or  an "n"';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please enter step-by-step instructions to get the development environment running?(what are the steps required to install your project?: '
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please provide instructions and examples for how to use the program: '
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Please list any collaborators, if any, with links to their github profiles, or other assets/tutooorials, please include those here as well: '
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license: ',
            choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'none']
        },
        {
            type: 'input',
            name: 'features',
            message: 'Please describe your projects features: '
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Please enter your constribution guidelines: '
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please enter testing instructions: '
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your Github username: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?: '
        },
    ]);
};
// TODO: Create a function to write README file
function generateREADME(answers) {
    let tableOfContents = '';
    let badge = `[![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-blue.svg)](https://opensource.org/licenses/${answers.license})`;
    let license = `This project is licensed under the ${answers.license} license.`
    if (answers.tableOfContents.toLowerCase() === 'y') {
        tableOfContents = '## Table of Contents\n - [Installation](#installation)\n - [usage](#usage)\n - [Credits](#credits)\n - [License](#license)\n - [Features](#featues)\n - [Contribution Guidelines](#contributing)\n - [Tests](#tests)\n - [Github link](#github)\n';
    }
    if (answers.license === 'none') {
        badge = '';
        license = "This project does not currently have a license"
    }
    return `
${badge}
# ${answers.title}

## Description
${answers.description}

${tableOfContents}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Credits
${answers.credits}

## License
${license}

## Features
${answers.features}

## Contribution Guidelines
${answers.contributing}

## Tests
${answers.tests}

### Questions
For any questions, please contact me:

GitHub: [${answers.github}](https://github.com/${answers.github})

Email: ${answers.email}
`
}



// TODO: Create a function to initialize app
async function init() {
    try {
        console.log("Welcome to the auto-README-generator!\n");

        const answers = await promptUser();

        const readmeContent = generateREADME(answers);

        await writeFileAsync('README.md', readmeContent);

        console.log("\nREADME.md generated successfully!");
    }catch (error) {
        console.error('An error occurred:/', error);
        }
    }

// Function call to initialize app
init();
