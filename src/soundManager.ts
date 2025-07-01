import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SoundEventType, PlaySoundOptions } from './types';
import { ConfigManager } from './configManager';

const execAsync = promisify(exec);

export class SoundManager {
  private static instance: SoundManager;
  private extensionPath: string;
  private configManager: ConfigManager;
  private defaultSounds: Map<SoundEventType, string>;

  private constructor(extensionPath: string) {
    this.extensionPath = extensionPath;
    this.configManager = ConfigManager.getInstance();
    this.defaultSounds = new Map();
    this.initializeDefaultSounds();
  }

  public static getInstance(extensionPath?: string): SoundManager {
    if (!SoundManager.instance && extensionPath) {
      SoundManager.instance = new SoundManager(extensionPath);
    }
    return SoundManager.instance;
  }

  private initializeDefaultSounds(): void {
    const soundsPath = path.join(this.extensionPath, 'sounds');
    
    this.defaultSounds.set(SoundEventType.SAVE, path.join(soundsPath, 'completion.wav'));
  }

  public async playSound(eventType: SoundEventType, options?: PlaySoundOptions): Promise<void> {
    try {
      // Check if sounds are globally enabled
      if (!this.configManager.isEnabled()) {
        return;
      }

      // Check if this specific event is enabled
      if (!this.configManager.isEventEnabled(eventType)) {
        return;
      }

      // Determine which sound file to use
      const soundPath = this.getSoundPath(eventType, options?.customPath);
      
      if (!soundPath || !fs.existsSync(soundPath)) {
        console.warn(`Sound file not found: ${soundPath}`);
        return;
      }

      // Get volume setting
      const volume = options?.volume ?? this.configManager.getVolume();

      // Play the sound (non-blocking)
      this.playSoundFile(soundPath, volume).catch(error => {
        console.error('Error playing sound:', error);
      });

    } catch (error) {
      console.error('Error in playSound:', error);
    }
  }

  private getSoundPath(eventType: SoundEventType, customPath?: string): string {
    // Use custom path if provided and valid
    if (customPath && fs.existsSync(customPath)) {
      return customPath;
    }

    // Use configured custom sound path
    const configCustomPath = this.configManager.getCustomSoundPath(eventType);
    if (configCustomPath && fs.existsSync(configCustomPath)) {
      return configCustomPath;
    }

    // Fall back to default sound
    return this.defaultSounds.get(eventType) || '';
  }

  private playSoundFile(soundPath: string, volume: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const absolutePath = path.resolve(soundPath);
        console.log(`Playing audio file: ${absolutePath}`);

        if (process.platform === 'win32') {
          // Use PowerShell on Windows
          this.playWithPowerShell(absolutePath)
            .then(() => {
              console.log('Audio playback finished');
              resolve();
            })
            .catch((error) => {
              console.warn('PowerShell audio failed:', error.message);
              resolve(); // Don't break extension if audio fails
            });
        } else {
          // Use alternative methods for other platforms
          this.playWithSystemCommand(absolutePath)
            .then(() => {
              console.log('Audio playback finished');
              resolve();
            })
            .catch((error) => {
              console.warn('System audio failed:', error.message);
              resolve(); // Don't break extension if audio fails
            });
        }
      } catch (error) {
        console.error('Error in playSoundFile:', error);
        resolve(); // Don't break extension if audio fails
      }
    });
  }

  /**
   * Play audio using PowerShell (Windows)
   */
  private async playWithPowerShell(filePath: string): Promise<void> {
    // Primary method: Use Windows Media Player COM object
    const command = `powershell -Command "& {Add-Type -AssemblyName presentationCore; $mediaPlayer = New-Object system.windows.media.mediaplayer; $mediaPlayer.open('${filePath}'); $mediaPlayer.Play(); Start-Sleep -Seconds 1; do { Start-Sleep -Milliseconds 100 } while ($mediaPlayer.Position -lt $mediaPlayer.NaturalDuration.TimeSpan); $mediaPlayer.Stop(); $mediaPlayer.Close()}"`;
    
    try {
      await execAsync(command);
    } catch (error: any) {
      // Fallback to simpler PowerShell method
      console.log('Trying simpler PowerShell method...');
      const simpleCommand = `powershell -c "(New-Object Media.SoundPlayer '${filePath}').PlaySync()"`;
      await execAsync(simpleCommand);
    }
  }

  /**
   * Play audio using system commands (Linux/macOS)
   */
  private async playWithSystemCommand(filePath: string): Promise<void> {
    let command: string;
    
    if (process.platform === 'darwin') {
      // macOS
      command = `afplay "${filePath}"`;
    } else {
      // Linux - try common audio players
      command = `aplay "${filePath}" || paplay "${filePath}" || mpg123 "${filePath}" || mplayer "${filePath}"`;
    }
    
    await execAsync(command);
  }

  public async playTestSound(): Promise<void> {
    try {
      const testSoundPath = this.defaultSounds.get(SoundEventType.SAVE);
      if (testSoundPath && fs.existsSync(testSoundPath)) {
        await this.playSoundFile(testSoundPath, this.configManager.getVolume());
      } else {
        console.warn('Test sound file not found:', testSoundPath);
        throw new Error('Test sound file not found');
      }
    } catch (error) {
      console.error('Error in playTestSound:', error);
      throw error;
    }
  }

  public validateSoundFile(filePath: string): boolean {
    if (!filePath || !fs.existsSync(filePath)) {
      return false;
    }

    const allowedExtensions = ['.wav', '.mp3', '.ogg', '.m4a'];
    const fileExtension = path.extname(filePath).toLowerCase();
    
    return allowedExtensions.includes(fileExtension);
  }

  public getDefaultSoundPath(eventType: SoundEventType): string {
    return this.defaultSounds.get(eventType) || '';
  }
}
