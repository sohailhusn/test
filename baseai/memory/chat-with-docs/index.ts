import { MemoryI } from '@baseai/core';
import path from 'path';

const memoryChatty = (): MemoryI => ({
  name: 'chatty',
  description: "hhh",
  config: {
		useGitRepo: false,
		dirToTrack: path.posix.join('.'),
		extToTrack: ["*"]
  }
});

export default memoryChatty;
