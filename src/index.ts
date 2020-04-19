import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const find = (dir: string, matchPattern: RegExp, fileList: Array<string> = []): Array<string> => {
  readdirSync(dir).forEach(file => {
    const filePath = join(dir, file) // Get the full path

    fileList = statSync(filePath).isDirectory() // Check if we are in a directory then
      ? find(filePath, matchPattern, fileList) // Continue the recursion
      : fileList.concat(matchPattern.test(filePath) ? filePath : '') // Otherwise check if matches the pattern
  })

  return fileList.filter(x => x) // Return the list of found files
}

export const fs = {
  find
}
