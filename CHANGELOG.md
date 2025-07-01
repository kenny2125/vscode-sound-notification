# Change Log

All notable changes to the "vscode-sound-notification" extension will be documented in this file.

## [1.0.0] - 2025-07-01

### Added
- Initial release of Sound Notification extension
- Sound notifications for file save events
- Sound notifications for error detection
- Sound notifications for warning detection
- Sound notifications for build completion
- Customizable volume control (0.0 to 1.0)
- Custom sound file support for all event types
- Status bar indicator with click-to-toggle functionality
- Command palette integration with test sound functionality
- Granular event enable/disable controls
- Automatic fallback to default sounds when custom files are unavailable
- Cross-platform audio support using play-sound library

### Features
- **File Save Sounds**: Audio feedback when saving documents
- **Error/Warning Alerts**: Immediate audio notification of code issues
- **Build Notifications**: Sound alerts for task completion
- **Volume Control**: Adjustable audio levels
- **Custom Sounds**: Use your own audio files
- **Quick Toggle**: Status bar button for instant enable/disable
- **Event Filtering**: Choose which events trigger sounds

### Technical Details
- Built with TypeScript for type safety
- Modular architecture with separate managers for sounds, config, and events
- Efficient event handling with proper disposal
- File validation for custom sound paths
- Multiple audio player fallback support
