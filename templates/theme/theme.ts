/**
 * Theme — fonte única de tokens, consumido pelo Unistyles.
 * Trocar a identidade de um projeto = substituir a escala `brand*`.
 * Valores crus (hex/px) não devem aparecer em screens; referencie estes tokens.
 *
 * Copie para: src/modules/@core/presentation/tokens/theme.ts
 */
export const appTheme = {
  colors: {
    // base
    baseBlack: '#000000',
    baseWhite: '#FFFFFF',
    baseShimmer: '#ECEDEF',
    transparent: 'transparent',
    authBackground: '#F9FAFB',
    // gray (neutro — não troca por projeto)
    gray25: '#FCFCFD',
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray400: '#94A3B8',
    gray500: '#64748B',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1E293B',
    gray900: '#0F172A',
    gray950: '#020617',
    // brand (TROQUE AQUI para reidentificar o projeto)
    brand50: '#FBFDEE',
    brand100: '#F5FBD7',
    brand200: '#EBF8B0',
    brand300: '#DAF26F',
    brand400: '#CEE460',
    brand500: '#C2D651',
    brand600: '#93A630',
    brand700: '#64770E',
    brand800: '#48560A',
    brand900: '#323C0F',
    // error (estado — fixo entre projetos)
    error25: '#FFFBFA',
    error50: '#FEF3F2',
    error100: '#FEE4E2',
    error200: '#FECDCA',
    error300: '#FDA29B',
    error400: '#F97066',
    error500: '#F04438',
    error600: '#D92D20',
    error700: '#B42318',
    error800: '#912018',
    error900: '#7A271A',
    error950: '#55160C',
    // warning (estado)
    warning25: '#FFFCF5',
    warning50: '#FFFAEB',
    warning100: '#FEF0C7',
    warning200: '#FEDF89',
    warning300: '#FEC84B',
    warning400: '#FDB022',
    warning500: '#F79009',
    warning600: '#DC6803',
    warning700: '#B54708',
    warning800: '#93370D',
    warning900: '#7A2E0E',
    warning950: '#4E1D09',
    // success (estado)
    success25: '#F6FEF9',
    success50: '#ECFDF3',
    success100: '#DCFAE6',
    success200: '#ABEFC6',
    success300: '#75E0A7',
    success400: '#47CD89',
    success500: '#17B26A',
    success600: '#079455',
    success700: '#067647',
    success800: '#085D3A',
    success900: '#074D31',
    success950: '#053321',
    // blue (info)
    blue25: '#F5FAFF',
    blue50: '#EFF8FF',
    blue100: '#D1E9FF',
    blue200: '#B2DDFF',
    blue300: '#84CAFF',
    blue400: '#53B1FD',
    blue500: '#2E90FA',
    blue600: '#1570EF',
    blue700: '#175CD3',
    blue800: '#1849A9',
    blue900: '#194185',
    blue950: '#102A56',
    // tokens de produto (ex.: medidor de risco) — adapte por projeto
    pillarProcessos: '#A38CF3',
    pillarDebt: '#4E81EE',
    pillarRegistration: '#18B8A6',
  },

  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
    full: 9999,
  },

  typography: {
    fontFamily: {
      // substitua pelas fontes do projeto
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      xxl: 28,
      xxxl: 36,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: -0.2,
      normal: 0,
      wide: 0.4,
    },
  },

  borderWidths: {
    none: 0,
    hairline: 1,
    thick: 2,
  },

  opacities: {
    disabled: 0.5,
    muted: 0.7,
    full: 1,
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    toast: 50,
  },

  iconSizes: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },

  timings: {
    fast: 150,
    normal: 250,
    slow: 400,
    easing: 'ease-in-out',
  },

  /**
   * Sombras SEMÂNTICAS. Valores em formato RN (elevation + shadow*).
   * No web o Unistyles converte shadowOffset/shadowRadius/shadowColor em boxShadow.
   * Em screens refira `theme.shadows.md`; nunca escreva elevation/boxShadow na mão.
   */
  shadows: {
    xs: { elevation: 2, shadowColor: '#101828', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 1 }, shadowRadius: 1 },
    sm: { elevation: 5, shadowColor: '#101828', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 2 },
    md: { elevation: 10, shadowColor: '#101828', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 4 },
    lg: { elevation: 15, shadowColor: '#101828', shadowOpacity: 0.4, shadowOffset: { width: 0, height: 6 }, shadowRadius: 6 },
    xl: { elevation: 20, shadowColor: '#101828', shadowOpacity: 0.5, shadowOffset: { width: 0, height: 8 }, shadowRadius: 8 },
    xxl: { elevation: 25, shadowColor: '#101828', shadowOpacity: 0.6, shadowOffset: { width: 0, height: 10 }, shadowRadius: 10 },
    xxxl: { elevation: 30, shadowColor: '#101828', shadowOpacity: 0.7, shadowOffset: { width: 0, height: 12 }, shadowRadius: 12 },
  },
} as const

export type AppTheme = typeof appTheme
export type ColorToken = keyof typeof appTheme.colors
