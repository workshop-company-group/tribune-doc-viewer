import { FileInfo, Folder } from './';

export interface FolderContent {
  folders: Folder[];
  files: FileInfo[];
}
