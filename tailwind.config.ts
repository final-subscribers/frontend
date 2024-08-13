// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ['class'],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
//   ],
//   prefix: '',
//   theme: {
//     container: {
//       center: true,
//       padding: '2rem',
//       screens: {
//         '2xl': '1400px',
//       },
//     },
//     extend: {
//       colors: {
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         primary: {
//           DEFAULT: 'hsl(var(--primary))',
//           foreground: 'hsl(var(--primary-foreground))',
//         },
//         secondary: {
//           DEFAULT: 'hsl(var(--secondary))',
//           foreground: 'hsl(var(--secondary-foreground))',
//         },
//         destructive: {
//           DEFAULT: 'hsl(var(--destructive))',
//           foreground: 'hsl(var(--destructive-foreground))',
//         },
//         muted: {
//           DEFAULT: 'hsl(var(--muted))',
//           foreground: 'hsl(var(--muted-foreground))',
//         },
//         accent: {
//           DEFAULT: 'hsl(var(--accent))',
//           foreground: 'hsl(var(--accent-foreground))',
//         },
//         popover: {
//           DEFAULT: 'hsl(var(--popover))',
//           foreground: 'hsl(var(--popover-foreground))',
//         },
//         card: {
//           DEFAULT: 'hsl(var(--card))',
//           foreground: 'hsl(var(--card-foreground))',
//         },
//       },
//       borderRadius: {
//         lg: 'var(--radius)',
//         md: 'calc(var(--radius) - 2px)',
//         sm: 'calc(var(--radius) - 4px)',
//       },
//       keyframes: {
//         'accordion-down': {
//           from: { height: '0' },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: '0' },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//     },
//   },
//   plugins: [require('tailwindcss-animate')],
// };

/** @type {import('tailwindcss').Config} */

function responsiveFontSize(webSize: string, mobileSize: string) {
  return [
    webSize,
    {
      '@screen sm': {
        fontSize: mobileSize,
      },
    },
  ];
}

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      sm: '360px',
      md: '768px',
      lg: '1280px',
      xl: '1617px',
    },
    extend: {
      colors: {
        neutral: {
          '0': '#ffffff',
          '5': '#f7f7f7',
          '10': '#e8eaea',
          '20': '#cbd0d7',
          '30': '#b2b6be',
          '40': '#949ca8',
          '50': '#778292',
          '60': '#606877',
          '70': '#49505a',
          '80': '#32373e',
          '90': '#1B1E22',
          '100': '#000000',
        },
        primary: {
          '5': '#EDF0FD',
          '10': '#D6DEFA',
          '20': '#A8B9F5',
          '30': '#7B93F0',
          '40': '#4D6EEA',
          '50': '#204AE5',
          '60': '#1639BB',
          '70': '#112B8E',
          '80': '#0B1D60',
          '90': '#060F32',
        },
        secondary: {
          '5': '#E0FAF2',
          '10': '#CAF7E9',
          '20': '#9EF0D7',
          '30': '#72E9C5',
          '40': '#46E1B3',
          '50': '#22D39E',
          '60': '#1BA77D',
          '70': '#178C69',
          '80': '#0E5943',
          '90': '#0D3C2E',
        },
        red: {
          '5': '#FEECF0',
          '10': '#FCD4DE',
          '20': '#FAA3B9',
          '30': '#F77394',
          '40': '#F4436F',
          '50': '#F1134B',
          '60': '#C60C3A',
          '70': '#95092C',
          '80': '#65061E',
          '90': '#350310',
        },
        orange: {
          '5': '#FFF8EB',
          '10': '#FFF0D1',
          '20': '#FFDF9E',
          '30': '#FFCE6B',
          '40': '#FFBD38',
          '50': '#FFAD05',
          '60': '#D18C00',
          '70': '#A36D00',
          '80': '#704B00',
          '90': '#3D2900',
        },
        blue: {
          '5': '#F5FCFE',
          '10': '#DEF4FD',
          '20': '#AEE5F9',
          '30': '#7DD6F6',
          '40': '#4FC7F3',
          '50': '#1FB8EF',
          '60': '#119ACB',
          '70': '#0B779D',
          '80': '#08536E',
          '90': '#0B3C4E',
        },
      },
      fontSize: {
        // Display styles
        'display-lg': responsiveFontSize('66px', '40px'),
        'display-base': responsiveFontSize('50px', '32px'),
        'display-sm': responsiveFontSize('40px', '25px'),

        // Heading styles
        'heading-lg': responsiveFontSize('50px', '40px'),
        'heading-base': responsiveFontSize('40px', '32px'),
        'heading-sm': responsiveFontSize('32px', '20px'),

        // Title styles
        'title-2xl': responsiveFontSize('32px', '23px'),
        'title-xl': responsiveFontSize('25px', '21px'),
        'title-lg': responsiveFontSize('21px', '19px'),
        'title-base': responsiveFontSize('19px', '17px'),
        'title-sm': responsiveFontSize('17px', '15px'),
        'title-xs': responsiveFontSize('15px', '13px'),

        // Body styles
        'body-lg': responsiveFontSize('19px', '17px'),
        'body-base': responsiveFontSize('17px', '15px'),
        'body-sm': responsiveFontSize('15px', '13px'),

        // Detail styles
        'detail-xl': responsiveFontSize('19px', '17px'),
        'detail-lg': responsiveFontSize('17px', '15px'),
        'detail-base': responsiveFontSize('15px', '13px'),
        'detail-sm': responsiveFontSize('13px', '11px'),

        // Label styles
        'label-lg': responsiveFontSize('19px', '15px'),
        'label-base': responsiveFontSize('17px', '13px'),
        'label-sm': responsiveFontSize('15px', '11px'),
        'label-xs': responsiveFontSize('13px', '9px'),

        // Links styles
        'links-lg': responsiveFontSize('19px', '17px'),
        'links-base': responsiveFontSize('17px', '15px'),
        'links-sm': responsiveFontSize('15px', '13px'),
      },
      spacing: {
        '0': '0px',
        '1': '2px',
        '2': '4px',
        '3': '8px',
        '4': '12px',
        '5': '16px',
        '6': '20px',
        '7': '24px',
        '8': '32px',
        '9': '40px',
        '10': '48px',
      },
      borderRadius: {},
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
