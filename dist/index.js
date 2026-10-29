const tokens = require('../tokens/primitives/colors.json');
const spacing = require('../tokens/primitives/spacing.json');
const typography = require('../tokens/primitives/typography.json');
const radii = require('../tokens/primitives/radii.json');

module.exports = {
  ...tokens,
  ...spacing,
  ...typography,
  ...radii,
  color: {
    ...tokens.color,
    primary: tokens.color.blue['600'].$value
  }
};
