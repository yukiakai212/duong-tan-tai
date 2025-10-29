#!/usr/bin/env node

import { Command } from 'commander';
import path from 'node:path';
import { Client } from '../client/Client.js';

const program = new Command();

program
  .version('1.0.0')
  .option('-p, --port <number>', 'Port for the server', '3000')
  .option('-d, --data-dir <path>', 'Directory to serve static files', './data');

program.parse(process.argv);

const options = program.opts();
const port = parseInt(options.port);
const dataDir = path.resolve(options.dataDir);
console.log(port, dataDir);
const client = new Client(port, { dataDir });
client.start();
