//Libs
const colors = require('colors')
const program = require('commander')
const puppeteer = require('puppeteer')
const path = require('path')

//Program Inputs
program
    .version('0.0.1')
    .usage('-u [url] -o [fileName]')
    .option('-u, --url [path]', 'Url for pdf')
    .option('-o, --outputFileName [filename]', 'Output file name [fileName].pdf (without ext)')

program.parse(process.argv)

if (!program.outputFileName | !program.url) {
    consoleError('Please specifiy an input file & a url');
}

//Main
async function main() {
    console.log('Started!'.green)
    var taskPromise = await urlToPdf(program.url)
    if (taskPromise == 'OK') {
        console.log('Finished!'.green)
        process.exit(1)
    }
    else
    {
        consoleError('Something gone wrong')
    }
}

function consoleError(msg) {
    console.error(msg.red);
    process.exit(1)
}

//Core Function
async function urlToPdf(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage()
    const inputDir = path.resolve(__dirname, '.')
    const outputPath = path.resolve(path.join(inputDir, program.outputFileName + '.pdf'))
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.pdf({ path: outputPath, printBackground: true })
    return 'OK'
}

//Run
main()