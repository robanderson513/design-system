const color = {
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
      hover: '#0053a8'
    },
    secondary: {
      default: '#404040',
      hover: '#171717'
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
  radius
};
