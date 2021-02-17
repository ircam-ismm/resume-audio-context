# `@ircam/resume-audio-context`

> simple one-liner utility to resume audio context. The utility creates a full-screen button that waits for a user interaction (e.g. a 'click' event) to resume the audioContext and resolve the promise.

## Install

```sh
npm install --save @ircam/resume-audio-context
```

## Usage

```js
import { resumeAudioContext } from '@ircam/resume-audio-context';

const audioContext = new AudioContext();

(async function() {
  await resumeAudioContext(audioContext);
  console.log('audioContext resumed');
}());
```

## License

BSD-3-Clause
