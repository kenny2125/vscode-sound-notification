# Default Sound Files

This directory contains the default sound files used by the Sound Notification extension.

## Sound Files

- `save.wav` - Played when files are saved
- `error.wav` - Played when errors are detected
- `warning.wav` - Played when warnings are detected  
- `completion.wav` - Played when code completion is triggered
- `build_success.wav` - Played when build tasks complete successfully
- `build_failure.wav` - Played when build tasks fail

## Custom Sounds

You can replace these default sounds with your own custom sound files by:

1. Opening VSCode settings (`Ctrl+,`)
2. Searching for "Sound Notification"
3. Setting custom paths for each event type in the "Custom Sounds" section

## Supported Formats

- `.wav` - Recommended for best compatibility
- `.mp3` - Widely supported
- `.ogg` - Open source format
- `.m4a` - Apple format

## Note

The actual sound files are not included in this repository. The extension will create placeholder files or use system sounds as fallbacks. Users should provide their own sound files or download suitable notification sounds from free sound libraries.
