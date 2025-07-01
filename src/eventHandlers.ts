import * as vscode from 'vscode';
import { SoundManager } from './soundManager';
import { SoundEventType } from './types';

export class EventHandlers {
  private soundManager: SoundManager;
  private disposables: vscode.Disposable[] = [];

  constructor(soundManager: SoundManager) {
    this.soundManager = soundManager;
    this.registerEventHandlers();
  }

  private registerEventHandlers(): void {
    // File save events
    this.disposables.push(
      vscode.workspace.onDidSaveTextDocument(() => {
        this.soundManager.playSound(SoundEventType.SAVE);
      })
    );
  }

  public dispose(): void {
    this.disposables.forEach(disposable => disposable.dispose());
    this.disposables = [];
  }
}
