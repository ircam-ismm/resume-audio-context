
/**
 * `resume` a given audio context, creating a full-screen button by default
 * @param {AudioContext} audioContext - AudioContext instance to resume
 * @param {DOMElement} [$btn=null] - optionnal DOM element to be used as button
 *  (not sure this can be useful, let's see...)
 */
export function resumeAudioContext(audioContext, $btn = null) {
  // monkey patch for compatibility with Safari / iOS
  if (!audioContext.resume) {
    audioContext.resume = () => Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    let after = () => {};
    // if no DOM Element given create a stupid full screen button
    if ($btn === null) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      $btn = document.createElement('button');

      // these are quite good default styles
      $btn.textContent = '▶ start audio';
      $btn.style.width = `${width}px`;
      $btn.style.height = `${height}px`;
      $btn.style.position = 'absolute';
      $btn.style.top = '0px';
      $btn.style.left = '0px';
      $btn.style.border = 'none';
      $btn.style.cursor = 'pointer';
      $btn.style.fontFamily = 'inherit';
      $btn.style.fontSize = '1.3rem';

      function onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        $btn.style.width = `${width}px`;
        $btn.style.height = `${height}px`;
      }

      window.addEventListener('resize', onResize);

      // clear button after resume
      after = () => {
        window.removeEventListener('resize', onResize);
        $btn.remove();
      }

      document.body.appendChild($btn);
    }

    const onClick = async () => {
      $btn.removeEventListener('click', onClick);

      try {
        await audioContext.resume();
        after();
        resolve();
      } catch(err) {
        console.error(err);
        reject('cannot resume audio context');
      }
    }

    $btn.addEventListener('click', onClick);
  });
}
