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
            message: 'Thank you for choosing the auto-README-generator my lord, to get started, what is the title of your most superior project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'My lord, it would please me if you could provide a short description explaining the what, why and how of your project(ex. what was your motivation?, Why did you build this project?, What problem does it solve? What did you learn?'
        },
        {
            type: 'input',
            name: 'tableOfContents',
            message: 'Does my Lord desire a table of contents? (y/n):',
            validate: function (input) {
                const validOptions = ['y', 'n'];
                if (!validOptions.includes(input.toLowerCase())) {
                    return 'My lord, you are quite the jester, please your humble servent only knows "y" or "n"';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Couldest my most illustrious highness enter thine step-by-step instructions to get the development environment running?(what are the steps required to install your project?)'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'If thine will ordaines me your majesity, please provide instructions and examples for how to use thine most dominant program'
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Although my I know my excellency is formidable, please list any collaborators, if any, with links to their github profiles, or other assets/tutooorials, please include those here as well.'
        },
        {
            type: 'list',
            name: 'license',
            message: 'If my gracious lord could choose a license for thine project.',
            choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'none']
        },
        {
            type: 'input',
            name: 'features',
            message: 'Features upon features! My excellency has many features, please enter them to a humble servent:'
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'If your humbleness desires more to contribute please others to contribute, please enter how they may do so:'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please tell your humble servent how one may test thy magnificant project:'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Would mylord allow privy to thine github username?: '
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
    let badge = `![Static Badge](https://img.shields.io/badge/${answers.license})`;
    if (answers.tableOfContents.toLowerCase() === 'y') {
        tableOfContents = '## Table of Contents\n - [Installation](#installation)\n - [usage](#usage)\n - [Credits](#credits)\n - [License](#license)\n - [Features](#featues)\n - [Contribution Guidelines](#contributing)\n - [Tests](#tests)\n - [Github link](#github)\n';
    }
    if (answers.license === 'none') {
        badge = '';
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
This project is licensed under the ${answers.license} license.

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
        console.log("Welcome my Lord to the auto-README-generator!\n");

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
