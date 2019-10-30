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

```directory``` directory Ex: C:\Pdf.  If directory does not exist, it will be created. (Optional)

## Test
```
pdfcreator -u https://github.com/ -o github
```