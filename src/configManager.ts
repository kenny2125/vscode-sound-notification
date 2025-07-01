import * as vscode from 'vscode';
import { SoundConfiguration, SoundEventType } from './types';

export class ConfigManager {
  private static instance: ConfigManager;
  private configuration: vscode.WorkspaceConfiguration;

  private constructor() {
    this.configuration = vscode.workspace.getConfiguration('soundNotification');
    this.setupConfigurationWatcher();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private setupConfigurationWatcher(): void {
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('soundNotification')) {
        this.configuration = vscode.workspace.getConfiguration('soundNotification');
      }
    });
  }

  public getConfiguration(): SoundConfiguration {
    return {
      enabled: this.configuration.get<boolean>('enabled', true),
      volume: this.configuration.get<number>('volume', 0.5),
      events: {
        onSave: this.configuration.get<boolean>('events.onSave', true),

      },
      customSounds: {
        save: this.configuration.get<string>('customSounds.save', ''),

      }
    };
  }

  public isEnabled(): boolean {
    return this.configuration.get<boolean>('enabled', true);
  }

  public getVolume(): number {
    return this.configuration.get<number>('volume', 0.5);
  }

  public isEventEnabled(eventType: SoundEventType): boolean {
    const config = this.getConfiguration();
    switch (eventType) {
      case SoundEventType.SAVE:
        return config.events.onSave;
      default:
        return false;
    }
  }

  public getCustomSoundPath(eventType: SoundEventType): string {
    const config = this.getConfiguration();
    switch (eventType) {
      case SoundEventType.SAVE:
        return config.customSounds.save;
      default:
        return '';
    }
  }

  public async toggleSounds(): Promise<void> {
    const currentState = this.isEnabled();
    await this.configuration.update('enabled', !currentState, vscode.ConfigurationTarget.Global);
  }

  public async setVolume(volume: number): Promise<void> {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    await this.configuration.update('volume', clampedVolume, vscode.ConfigurationTarget.Global);
  }

  public openSettings(): void {
    vscode.commands.executeCommand('workbench.action.openSettings', 'soundNotification');
  }
}
