import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  react: true,
  jsx: true,
}, {
  ignores: ['app/shadcn/**/*'],
}, {
  rules: {
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'ts/consistent-type-definitions': ['warn', 'type'],
    'react-refresh/only-export-components': ['warn', { allowExportNames: ['clientLoader'] }],
  },
})
