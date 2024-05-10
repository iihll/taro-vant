import type { UserConfigExport } from '@tarojs/cli'
import './dev.init'

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport
