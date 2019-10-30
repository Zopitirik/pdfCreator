# pdfCreator
tiny pdf creator with headless chrome

## Install
```
npm i pdfcreator
```

## Usage
```
pdfcreator -u [url] -o [fileName] -d [directoryName]
```

```url``` http/https valid

```fileName``` should be just a name without extension

```directoryName``` directory Ex: C:\Pdf.  If directory does not exist, it will be created. (Optional)

## Output
Output is complete [directoryName]\\[fileName]

## Test
```
C:\Docs>pdfcreator -u https://github.com/ -o github -d C:\Log
C:\Log\github.pdf

C:\Docs>pdfcreator -u https://github.com/ -o github
C:\Docs\github.pdf
```