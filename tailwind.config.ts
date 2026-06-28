import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Charter', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Georgia, Charter, serif',
            fontSize: '1.25rem',
            lineHeight: '1.85',
            color: '#1a1a1a',
            maxWidth: '680px',
            'h1, h2, h3': {
              fontFamily: 'Georgia, Charter, serif',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            a: {
              color: '#1a1a1a',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },
            blockquote: {
              borderLeftColor: '#1a1a1a',
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              color: '#555',
              paddingLeft: '1.5rem',
            },
            code: {
              fontFamily: 'monospace',
              backgroundColor: '#f5f5f5',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.9em',
            },
            pre: {
              backgroundColor: '#1a1a1a',
              color: '#f5f5f5',
              borderRadius: '8px',
            },
            img: {
              borderRadius: '4px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config