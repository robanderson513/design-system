const lightTheme = {
  primary: '#0066cc',
  ai: '#7e22ce',
  surface: {
    default: '#fafafa',
    subtle: '#f5f5f5',
    inverse: '#171717'
  },
  text: {
    primary: '#171717',
    secondary: '#404040',
    muted: '#737373',
    inverse: '#fafafa'
  },
  border: {
    default: '#e5e5e5',
    strong: '#a3a3a3',
    subtle: '#f5f5f5'
  },
  action: {
    primary: {
      default: '#0066cc',
      hover: '#0053a8',
      text: '#fafafa'
    },
    secondary: {
      default: '#404040',
      hover: '#171717',
      text: '#fafafa'
    }
  },
  status: {
    success: {
      foreground: '#15803d',
      surface: '#f0fdf4'
    },
    error: {
      foreground: '#b91c1c',
      surface: '#fef2f2'
    },
    warning: {
      foreground: '#854d0e',
      surface: '#fefce8'
    },
    info: {
      foreground: '#0053a8',
      surface: '#eaf3ff'
    }
  },
  state: {
    hover: { foreground: '#004285', surface: '#eaf3ff', border: '#a9ccff' },
    pressed: { foreground: '#003363', surface: '#d4e5ff', border: '#75adff' },
    disabled: { foreground: '#737373', surface: '#f5f5f5', border: '#e5e5e5' },
    selected: { foreground: '#004285', surface: '#eaf3ff', border: '#0066cc' },
    invalid: { foreground: '#b91c1c', surface: '#fef2f2', border: '#dc2626' }
  }
};

const darkTheme = {
  primary: '#3f8df2',
  ai: '#d8b4fe',
  surface: {
    default: '#0a0a0a',
    subtle: '#171717',
    inverse: '#fafafa'
  },
  text: {
    primary: '#fafafa',
    secondary: '#d4d4d4',
    muted: '#a3a3a3',
    inverse: '#171717'
  },
  border: {
    default: '#404040',
    strong: '#737373',
    subtle: '#262626'
  },
  action: {
    primary: {
      default: '#3f8df2',
      hover: '#75adff',
      text: '#0a0a0a'
    },
    secondary: {
      default: '#d4d4d4',
      hover: '#fafafa',
      text: '#0a0a0a'
    }
  },
  status: {
    success: {
      foreground: '#86efac',
      surface: '#052e16'
    },
    error: {
      foreground: '#fca5a5',
      surface: '#450a0a'
    },
    warning: {
      foreground: '#fef08a',
      surface: '#422006'
    },
    info: {
      foreground: '#75adff',
      surface: '#002244'
    }
  },
  state: {
    hover: { foreground: '#fafafa', surface: '#262626', border: '#404040' },
    pressed: { foreground: '#fafafa', surface: '#404040', border: '#525252' },
    disabled: { foreground: '#737373', surface: '#262626', border: '#404040' },
    selected: { foreground: '#d4e5ff', surface: '#002244', border: '#0053a8' },
    invalid: { foreground: '#fecaca', surface: '#450a0a', border: '#b91c1c' }
  }
};

const recipeLightTheme = {
  primary: '#78947A',
  secondary: '#C77F61',
  tertiary: '#C8AC62',
  surface: { default: '#FAF9F5', subtle: '#F2F0E9', inverse: '#30312C' },
  text: { primary: '#30312C', secondary: '#48463F', muted: '#656156', inverse: '#FAF9F5' },
  border: { default: '#E6E3D9', strong: '#BEB9AA', subtle: '#F2F0E9' },
  action: {
    primary: { default: '#4D674F', hover: '#3B503D', text: '#fafafa' },
    secondary: { default: '#754432', hover: '#573326', text: '#fafafa' }
  },
  state: {
    hover: { foreground: '#3B503D', surface: '#F2F5F0', border: '#CCD9C8' },
    pressed: { foreground: '#2B3B2D', surface: '#E5EBE1', border: '#B0C3AB' },
    selected: { foreground: '#3B503D', surface: '#F2F5F0', border: '#617B63' }
  }
};

const recipeDarkTheme = {
  primary: '#B0C3AB',
  secondary: '#DDB09A',
  tertiary: '#DDCB91',
  surface: { default: '#1C1D19', subtle: '#30312C', inverse: '#F2F0E9' },
  text: { primary: '#FAF9F5', secondary: '#E6E3D9', muted: '#BEB9AA', inverse: '#30312C' },
  border: { default: '#656156', strong: '#A29D8F', subtle: '#48463F' },
  action: {
    primary: { default: '#B0C3AB', hover: '#CCD9C8', text: '#2B3B2D' },
    secondary: { default: '#DDB09A', hover: '#EACDBD', text: '#30312C' }
  },
  state: {
    hover: { foreground: '#FAF9F5', surface: '#48463F', border: '#656156' },
    pressed: { foreground: '#FAF9F5', surface: '#656156', border: '#827D70' },
    selected: { foreground: '#CCD9C8', surface: '#1B291D', border: '#78947A' }
  }
};

const color = {
  primary: '#0066cc',
  ai: '#7e22ce',
  theme: {
    light: lightTheme,
    dark: darkTheme
  },
  brand: {
    recipe: {
      light: recipeLightTheme,
      dark: recipeDarkTheme
    }
  },
  surface: lightTheme.surface,
  text: lightTheme.text,
  border: lightTheme.border,
  action: lightTheme.action,
  status: lightTheme.status
};

const accessibility = {
  focus: {
    ring: {
      color: {
        light: '#0066cc',
        dark: '#75adff'
      },
      width: '2px',
      offset: '2px'
    }
  }
};

const spacing = {
  gap: {
    tight: '8px',
    compact: '12px',
    default: '16px',
    relaxed: '24px',
    section: '32px'
  },
  padding: {
    compact: '8px',
    control: '12px',
    card: '24px',
    section: '32px'
  },
  margin: {
    element: '16px',
    section: '32px',
    page: '48px'
  }
};

const typography = {
  fontFamily: {
    body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    heading: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    code: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace']
  },
  fontSize: {
    caption: '12px',
    label: '14px',
    body: '16px',
    title: '24px',
    heading: '30px',
    display: '48px'
  },
  fontWeight: {
    body: 400,
    emphasis: 500,
    strong: 600
  },
  lineHeight: {
    body: 1.5,
    heading: 1.25,
    relaxed: 1.75
  }
};

const radius = {
  control: '4px',
  card: '8px',
  overlay: '12px',
  pill: '9999px'
};

module.exports = {
  color,
  spacing,
  typography,
  radius,
  accessibility
};
