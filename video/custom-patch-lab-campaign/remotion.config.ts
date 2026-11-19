import fs from 'fs';
import path from 'path';
import {Config} from '@remotion/cli/config';

// Use the Chromium headless shell that ships with this environment (the version
// folder changes between containers, so it is looked up) instead of downloading
// one. Elsewhere, or with REMOTION_BROWSER=download, Remotion downloads its own.
const findHeadlessShell = (): string | null => {
  const root = '/opt/pw-browsers';
  if (!fs.existsSync(root)) return null;
  for (const dir of fs.readdirSync(root).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse()) {
    for (const rel of ['chrome-headless-shell-linux64/chrome-headless-shell', 'chrome-linux/headless_shell']) {
      const p = path.join(root, dir, rel);
      if (fs.existsSync(p)) return p;
    }
  }
  return null;
};
const shell = process.env.REMOTION_BROWSER === 'download' ? null : findHeadlessShell();
if (shell) Config.setBrowserExecutable(shell);
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setConcurrency(4);
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
