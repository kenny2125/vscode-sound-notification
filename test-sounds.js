// Simple test to verify sound files are working
const fs = require('fs');
const path = require('path');

console.log('🔊 Testing Sound Notification Extension...\n');

// Check if sound files exist
const soundsDir = path.join(__dirname, 'sounds');
const soundFiles = fs.readdirSync(soundsDir).filter(file => 
  file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.ogg') || file.endsWith('.m4a')
);

console.log('📁 Found sound files:');
soundFiles.forEach(file => {
  const filePath = path.join(soundsDir, file);
  const stats = fs.statSync(filePath);
  console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
});

if (soundFiles.length === 0) {
  console.log('  ❌ No sound files found');
} else {
  console.log(`\n🎵 Ready to test with ${soundFiles.length} sound file(s)!`);
}

// Test native audio playback
try {
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const execAsync = promisify(exec);
  
  console.log('\n🔊 Native audio player loaded successfully');
  
  if (soundFiles.length > 0) {
    // Prioritize .wav files for testing
    const wavFiles = soundFiles.filter(file => file.endsWith('.wav'));
    const testFile = wavFiles.length > 0 ? wavFiles[0] : soundFiles[0];
    const testFilePath = path.join(soundsDir, testFile);
    
    console.log(`\n🎮 Testing playback of: ${testFile}`);
    console.log(`Platform: ${process.platform}`);
    
    // Test native audio playback
    const testAudio = async () => {
      try {
        const absolutePath = path.resolve(testFilePath);
        
        if (process.platform === 'win32') {
          console.log('Using PowerShell for audio playback...');
          const command = `powershell -c "(New-Object Media.SoundPlayer '${absolutePath}').PlaySync()"`;
          await execAsync(command);
        } else if (process.platform === 'darwin') {
          console.log('Using afplay for audio playback...');
          await execAsync(`afplay "${absolutePath}"`);
        } else {
          console.log('Using Linux audio player...');
          await execAsync(`aplay "${absolutePath}" || paplay "${absolutePath}"`);
        }
        
        console.log('✅ Sound played successfully!');
      } catch (err) {
        console.log(`❌ Error playing sound: ${err.message}`);
        console.log('Note: This is expected in some environments without audio support');
      }
    };
    
    testAudio();
  }
} catch (error) {
  console.log(`❌ Error with play-sound module: ${error.message}`);
}

console.log('\n📋 Test Instructions:');
console.log('1. Press F5 to launch Extension Development Host');
console.log('2. In the new window, open Command Palette (Ctrl+Shift+P)');
console.log('3. Run: "Sound Notification: Play Test Sound"');
console.log('4. Create and save a file to test save sounds');
console.log('5. Check status bar for 🔊/🔇 indicator');
