import * as vscode from 'vscode';

export interface SoundEvent {
  name: string;
  enabled: boolean;
  customSoundPath?: string;
}

export interface SoundConfiguration {
  enabled: boolean;
  volume: number;
  events: {
    onSave: boolean;
  };
  customSounds: {
    save: string;
  };
}

export interface SoundFile {
  name: string;
  path: string;
  type: 'default' | 'custom';
}

export enum SoundEventType {
  SAVE = 'save'
}

export interface PlaySoundOptions {
  volume?: number;
  customPath?: string;
}

export interface SoundManagerOptions {
  defaultSoundsPath: string;
  volume: number;
}
