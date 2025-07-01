# 🔊 VSCode Sound Notification


A must extention for Vibe Coders and doom scrollers. 

I did this because i often doom scroll right after prompting and i am constantly forgetting my prompt because i can't hear it lol.


This is an  extension that plays customizable sound notifications when you save files like when github copilot saves or edited a  file in your codebase. 

## ✨ Features

- **File Save Notifications** - Get audio feedback every time you save a file
- **Customizable Volume** - Adjust sound levels to your preference  
- **Custom Sound Files** - Use your own sound files for save events
- **Quick Toggle** - Easily enable/disable sounds from the status bar
- **Lightweight & Fast** - Minimal performance impact on your editor


## 🚀 Installation

1. Open VSCode
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Sound Notification" 
4. Click Install

## ⚙️ Configuration

Open VSCode settings (`Ctrl+,`) and search for "Sound Notification" to configure:

### Basic Settings

- **Enable/Disable**: Toggle sound notifications on/off
- **Volume**: Control the volume level (0.0 to 1.0)

### Event Settings

Enable or disable sounds for file save events:

```json
{
  "soundNotification.events.onSave": true,
  "soundNotification.volume": 0.8
}
```

### Custom Sounds

Use your own sound files for save events:

```json
{
  "soundNotification.customSounds.save": "/path/to/your/save-sound.wav"
}
```

## 🎮 Commands

Access these commands via the Command Palette (`Ctrl+Shift+P`):

- **Sound Notification: Play Test Sound** - Preview the save sound
- **Sound Notification: Toggle Sound Notifications** - Quick enable/disable  
- **Sound Notification: Open Sound Settings** - Jump to settings

## 📊 Status Bar

The extension adds a sound indicator to your status bar:
- 🔊 = Sounds enabled
- 🔇 = Sounds disabled

Click the indicator to quickly toggle sound notifications.

## 🎶 Custom Sound Files

### Supported Formats
- `.wav` (recommended)
- `.mp3`
- `.ogg` 
- `.m4a`

### Getting Sound Files
- Download from [Freesound.org](https://freesound.org)
- Use [Zapsplat](https://zapsplat.com) (free with registration)
- Create your own with [Audacity](https://audacityteam.org)

### Tips
- Keep files under 2 seconds for best experience
- Use moderate volume levels
- Test sounds with the "Play Test Sound" command

## 🔧 Requirements

- Visual Studio Code 1.74.0 or higher

## 🐛 Troubleshooting

### No Sound Playing?

1. Check if sound notifications are enabled in settings
2. Verify your system volume is up
3. Test with "Play Test Sound" command
4. Try with default sounds (leave custom paths empty)

### Sound File Issues?

1. Ensure the file path is correct
2. Check file format is supported (.wav, .mp3, .ogg, .m4a)
3. Verify file isn't corrupted
4. Test the file in another audio player

## 📝 Release Notes

### 1.0.0

- Initial release
- Sound notifications for file saves
- Customizable volume and sound files  
- Status bar integration
- Configuration management

## 🤝 Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/your-username/vscode-sound-notification).

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

---

**Enjoy coding with audio feedback! 🎵**
