import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  react: true,
  jsx: true,
}, {
  ignores: ['app/components/**/*'],
}, {
  rules: {
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'ts/consistent-type-definitions': ['warn', 'type'],
  },
})
