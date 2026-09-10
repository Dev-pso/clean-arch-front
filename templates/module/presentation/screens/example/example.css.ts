import { StyleSheet } from 'react-native-unistyles'

/**
 * Estilos da screen, pareados. A screen só referencia `styles.*`.
 * Zero valor cru: tudo via theme. Zero className/tailwind.
 */
export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray900,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray500,
  },
  list: {
    gap: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.baseWhite,
    borderRadius: theme.radii.lg,
    borderWidth: theme.borderWidths.hairline,
    borderColor: theme.colors.gray200,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.gray800,
  },
  error: {
    color: theme.colors.error600,
    fontSize: theme.typography.fontSize.sm,
  },
}))
