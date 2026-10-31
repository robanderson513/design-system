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
    },
    tonal: {
      container: '#f5f5f5',
      hover: '#e5e5e5',
      pressed: '#d4d4d4',
      text: '#171717'
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
    },
    tonal: {
      container: '#262626',
      hover: '#404040',
      pressed: '#525252',
      text: '#fafafa'
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

const earthLightTheme = {
  primary: '#78947A',
  secondary: '#C77F61',
  tertiary: '#C8AC62',
  surface: { default: '#F7EDE6', subtle: '#F0E1D6', inverse: '#302620' },
  text: { primary: '#302620', secondary: '#49372F', muted: '#694D3F', inverse: '#F7EDE6' },
  border: { default: '#E5CFC0', strong: '#C19B83', subtle: '#F0E1D6' },
  action: {
    primary: { default: '#4D674F', hover: '#3B503D', text: '#fafafa' },
    secondary: { default: '#754432', hover: '#573326', text: '#fafafa' },
    tonal: { container: '#F0E1D6', hover: '#E5CFC0', pressed: '#D5B6A3', text: '#302620' }
  },
  state: {
    hover: { foreground: '#302620', surface: '#F0E1D6', border: '#E5CFC0' },
    pressed: { foreground: '#302620', surface: '#E5CFC0', border: '#D5B6A3' },
    selected: { foreground: '#3B503D', surface: '#F2F5F0', border: '#617B63' }
  }
};

const earthDarkTheme = {
  primary: '#B0C3AB',
  secondary: '#DDB09A',
  tertiary: '#DDCB91',
  surface: { default: '#1D1713', subtle: '#302620', inverse: '#F0E1D6' },
  text: { primary: '#F7EDE6', secondary: '#E5CFC0', muted: '#C19B83', inverse: '#302620' },
  border: { default: '#694D3F', strong: '#A47C65', subtle: '#49372F' },
  action: {
    primary: { default: '#B0C3AB', hover: '#CCD9C8', text: '#2B3B2D' },
    secondary: { default: '#DDB09A', hover: '#EACDBD', text: '#302620' },
    tonal: { container: '#49372F', hover: '#694D3F', pressed: '#87644F', text: '#F7EDE6' }
  },
  state: {
    hover: { foreground: '#F7EDE6', surface: '#49372F', border: '#694D3F' },
    pressed: { foreground: '#F7EDE6', surface: '#694D3F', border: '#87644F' },
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
  palette: {
    earth: {
      light: earthLightTheme,
      dark: earthDarkTheme
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
