export interface IPackage {
  name: string;
  version: string;
  description: string;
  main: string;
  bin: unknown;
  files: string[];
  scripts: unknown;
  keywords: string[];
  author: string;
  homepage: string;
  repository: unknown;
  license: string;
  dependencies: unknown;
  devDependencies: unknown;
}