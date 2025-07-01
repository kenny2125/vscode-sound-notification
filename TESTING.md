# VSCode Sound Notification Extension - Testing Guide

## Quick Test Steps

1. **Open the extension project in VSCode**
   ```bash
   code "c:\Users\johnk\Desktop\Vscode sound notification\vscode-sound-notification"
   ```

2. **Press F5 to launch Extension Development Host**
   - This opens a new VSCode window with the extension loaded

3. **Test the extension**:
   - **File Save Test**: Create a new file and save it (`Ctrl+S`)
   - **Command Test**: Open Command Palette (`Ctrl+Shift+P`) and run:
     - `Sound Notification: Play Test Sound`
     - `Sound Notification: Toggle Sound Notifications`
   - **Status Bar Test**: Click the 🔊/🔇 icon in the status bar
   - **Settings Test**: Open settings (`Ctrl+,`) and search for "Sound Notification"

4. **Error Test**: 
   - Create a file with syntax errors
   - Watch for error sound notifications

5. **Configuration Test**:
   - Change volume settings
   - Enable/disable specific events
   - Test custom sound file paths (if you have sound files)

## Expected Behavior

- **Status Bar**: Shows 🔊 when enabled, 🔇 when disabled
- **Commands**: All commands should be available in Command Palette
- **Settings**: All configuration options should be visible and functional
- **Events**: Sounds should play for enabled events (if sound files are available)

## Troubleshooting

- If no sounds play, check the Debug Console (F12) for error messages
- Ensure system audio is working
- Try with headphones/speakers connected
- Check VSCode Output panel for extension logs

## Development

- **Watch Mode**: Run `npm run watch` for automatic recompilation
- **Debug**: Use F5 to launch debug session
- **Logs**: Check Debug Console for extension output
