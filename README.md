# `@ircam/resume-audio-context`

> simple one-liner utility to resume audio context

## Install

```sh
npm install --save @ircam/resume-audio-context
```

## Usage

```js
import { resumeAudioContext } from '@ircam/resume-audio-context';

    (async function() {
      const audioContext = new AudioContext();
      await resumeAudioContext(audioContext);
      console.log('audioContext resumed');
    }());
```

## License

BSD-3-Clause
