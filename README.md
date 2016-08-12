# is-time-to-run

## Motivation
I run a script which checks availability of websites. This script is run in crone every 5 minutes. If any of the website is unavailable I need to send an e-mail. But I don't want to send this e-mal every 5 minutes but every hour.

This module allows to check if certain period of time has passed and allow your script to run again. It aims at stateless scripts (that don't run in loop as a daemon) and for this purpose it utilises a helper file where it stores the last time your script has run. 

## API
### isTime(callback)
This method will return information if your code can be executed again. If it can it will change the helper file to the current time.

## Usage

```javascript
var IsTimeToRun = require('is-time-to-run');

var timeChecker = new IsTimeToRun({
    path: 'tmp/',   # default ''
    period: '30',   # default 60
    unit: 'minutes' # default 'minutes'
});

timeChecker.isTime((err, canRun) => {
    
});
```