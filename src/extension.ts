import * as vscode from 'vscode';
import { SoundManager } from './soundManager';
import { ConfigManager } from './configManager';
import { EventHandlers } from './eventHandlers';

let soundManager: SoundManager;
let configManager: ConfigManager;
let eventHandlers: EventHandlers;

export function activate(context: vscode.ExtensionContext) {
  console.log('Sound Notification extension is now active!');

  // Initialize managers
  soundManager = SoundManager.getInstance(context.extensionPath);
  configManager = ConfigManager.getInstance();
  eventHandlers = new EventHandlers(soundManager);

  // Register commands
  registerCommands(context);

  // Create status bar item
  createStatusBarItem(context);

  // Show welcome message on first activation
  const hasShownWelcome = context.globalState.get('soundNotification.hasShownWelcome', false);
  if (!hasShownWelcome) {
    vscode.window.showInformationMessage(
      'Sound Notification extension is ready! Try the "Play Welcome Sound" command.',
      'Play Welcome Sound',
      'Open Settings'
    ).then(selection => {
      if (selection === 'Play Welcome Sound') {
        vscode.commands.executeCommand('soundNotification.playWelcomeSound');
      } else if (selection === 'Open Settings') {
        vscode.commands.executeCommand('soundNotification.openSettings');
      }
    });
    context.globalState.update('soundNotification.hasShownWelcome', true);
  }

  console.log('Sound Notification extension setup complete');
}

function registerCommands(context: vscode.ExtensionContext): void {
  // Play test sound command
  const playTestSoundCommand = vscode.commands.registerCommand(
    'soundNotification.playTestSound',
    async () => {
      try {
        await soundManager.playTestSound();
        vscode.window.showInformationMessage('Test sound played successfully!');
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to play test sound: ${error}`);
      }
    }
  );

  // Simple welcome sound command
  const playWelcomeSoundCommand = vscode.commands.registerCommand(
    'soundNotification.playWelcomeSound',
    async () => {
      try {
        await soundManager.playTestSound();
        vscode.window.showInformationMessage('🎵 Welcome to Sound Notification! Extension is working correctly.');
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to play welcome sound: ${error}`);
        console.error('Welcome sound error:', error);
      }
    }
  );

  // Toggle sounds command
  const toggleSoundsCommand = vscode.commands.registerCommand(
    'soundNotification.toggleSounds',
    async () => {
      try {
        await configManager.toggleSounds();
        const isEnabled = configManager.isEnabled();
        const message = isEnabled 
          ? 'Sound notifications enabled' 
          : 'Sound notifications disabled';
        vscode.window.showInformationMessage(message);
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to toggle sounds: ${error}`);
      }
    }
  );

  // Open settings command
  const openSettingsCommand = vscode.commands.registerCommand(
    'soundNotification.openSettings',
    () => {
      configManager.openSettings();
    }
  );

  // Add commands to context subscriptions
  context.subscriptions.push(
    playTestSoundCommand,
    playWelcomeSoundCommand,
    toggleSoundsCommand,
    openSettingsCommand
  );
}

function createStatusBarItem(context: vscode.ExtensionContext): void {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  // Update status bar based on current state
  function updateStatusBar(): void {
    const isEnabled = configManager.isEnabled();
    statusBarItem.text = isEnabled ? '🔊' : '🔇';
    statusBarItem.tooltip = isEnabled 
      ? 'Sound notifications enabled (click to disable)' 
      : 'Sound notifications disabled (click to enable)';
    statusBarItem.command = 'soundNotification.toggleSounds';
    statusBarItem.show();
  }

  // Initial update
  updateStatusBar();

  // Watch for configuration changes
  const configWatcher = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('soundNotification.enabled')) {
      updateStatusBar();
    }
  });

  // Add to context subscriptions
  context.subscriptions.push(statusBarItem, configWatcher);
}

export function deactivate() {
  console.log('Sound Notification extension is now deactivated');
  
  // Clean up event handlers
  if (eventHandlers) {
    eventHandlers.dispose();
  }
}
