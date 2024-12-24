module.exports = {
  content: ['./src/views/**/*.{pug}'],
  theme: {
  screens: {
    'xs': '320px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
    colors: {
      white: {
        '000': '#FFFFFF',
      },
      black: {
        '000': '#000000',
        '100': '#374151',
        '200': '#959BA4',
        '300': '#CACDD1',
        '400': '#C8CBCF',
        '500': '#E3E5EB',
        '600': '#F4F5F6',
        '700': '#FBFBFB',
      },
      blue: {
        '000': '#005CFF',
        '100': '#4673D2',
        '200': '#5893FF',
        '300': '#C7D5F1',
      },
      green: {
        '000': '#84C9A9',
        '100': '#DAEFE5',
      },
      red: {
        '000': '#DE350B',
        '100': '#F06A6A',
        '200': '#FBD2D2',
        '300': '#F2E1DD',
      },
      purple: {
        '000': '#BD6AF0',
        '100': '#EBD2FB',
        '200': '#E5E4FC',
        '300': '#E6EFFE',
      },
    },
    fontSize: {
      '24-sb': ['24px', { lineHeight: '30px', fontWeight: 600 }],
      '18-sb': ['18px', { lineHeight: '24px', fontWeight: 600 }],
      '14-m': ['14px', { lineHeight: '18px', fontWeight: 500 }],
      '12-sb': ['12px', { lineHeight: '16px', fontWeight: 600 }],
      '12-m': ['12px', { lineHeight: '16px', fontWeight: 500 }],
      '12-r': ['12px', { lineHeight: '16px', fontWeight: 400 }],
      '10-r': ['10px', { lineHeight: '14px', fontWeight: 400 }],
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
    },
  },
}