import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'docs/visual-qa/**', 'public/**']
  }
];

export default eslintConfig;
