# contenteditable-max-length
Set the maximum number of characters that can be entered in the contenteditable element

## Getting started
```console
npm install contenteditable-max-length --save-dev
```

## Syntax
```javascript
const unsubscribe = contenteditableMaxLength([options])
```

## Options
`element`  
*DOM contenteditable element*  

`maxLength`  
*Number of maximum characters*

## Return value
The unsubscribe function

## Usage example
```javascript
import contenteditableMaxLength from 'contenteditable-max-length'

const unsubscribe = contenteditableMaxLength({
  element: document.getElementById('contenteditable-element'),
  maxLength: 100
})
```
