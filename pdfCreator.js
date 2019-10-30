//Libs
const colors = require('colors')
const program = require('commander')
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require("fs")

//Program Inputs
program
    .version('0.0.1')
    .usage('-u [url] -o [fileName]')
    .option('-u, --url [path]', 'url for pdf')
    .option('-o, --outputFileName [filename]', 'output file name [fileName].pdf (without ext)')
    .option('-d, --outputDirectory [directory]', 'output directory path.\n\t\t\t\texample: C:\\foo\\bar\n\t\t\t\tif not provided, current directory will be used.\n\t\t\t\tif directory not exist, it will be created.')

program.parse(process.argv)

if (!program.url) {
    consoleError('Please specifiy a url.\nFor help : pdfCreator -h')
}

if (program.outputDirectory && !fs.existsSync(program.outputDirectory))  {
    fs.mkdirSync(program.outputDirectory);
}

//Main
async function main() {
    console.log('Started!'.green)
    var taskPromise = await urlToPdf(program.url)
    if (taskPromise) {
        console.log(taskPromise.green)
        process.exit(1)
    }
    else
    {
        consoleError('Something gone wrong')
    }
}

function consoleError(msg) {
    console.error(msg.red)
    process.exit(1)
}

//Core Function
async function urlToPdf(url) {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        var _inputDir = __dirname
        var fileName = new Date().getTime()

        if (program.outputDirectory) _inputDir = program.outputDirectory
        if (!program.outputFileName) fileName = program.outputFileName
        
        const inputDir = path.resolve(_inputDir, '.')
        const outputPath = path.resolve(path.join(inputDir, fileName + '.pdf'))
        
        await page.goto(url, { waitUntil: 'networkidle2' })
        await page.pdf({ path: outputPath, printBackground: true })
        return outputPath
    } catch (error) {
        consoleError(error)
    }
}

//Run
main()