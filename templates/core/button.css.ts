import { StyleSheet } from 'react-native-unistyles'

/**
 * Estilo do componente @core Button. Usa variants do Unistyles para variar
 * aparência por prop (variant/size) — decisão visual num lugar só, sem if no tsx.
 */
export const styles = StyleSheet.create((theme) => ({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    borderRadius: theme.radii.md,
    borderWidth: theme.borderWidths.hairline,
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.brand500,
          borderColor: theme.colors.brand500,
        },
        outline: {
          backgroundColor: theme.colors.transparent,
          borderColor: theme.colors.gray300,
        },
      },
      size: {
        md: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md },
        sm: { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.sm },
      },
      disabled: {
        true: { opacity: theme.opacities.disabled },
        false: {},
      },
    },
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    variants: {
      variant: {
        primary: { color: theme.colors.gray900 },
        outline: { color: theme.colors.gray700 },
      },
    },
  },
}))
