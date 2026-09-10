/**
 * Componente @core canônico de referência.
 * Copie para: src/modules/@core/presentation/components/button/button.component.tsx
 * e exporte no barrel components.ts:  export { Button } from './button/button.component'
 *
 * Contrato: API igual nos dois alvos; entranha difere por plataforma.
 * - Expo (abaixo): Pressable/Text de react-native.
 * - Next: um <button> semântico com os mesmos props (onPress→onClick), mesmo .css.ts.
 * Componente burro: sem regra de negócio, tudo por prop.
 */
import type { ReactNode } from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from './button.css'

export interface ButtonProps {
  children: ReactNode
  onPress?: () => void
  variant?: 'primary' | 'outline'
  size?: 'md' | 'sm'
  disabled?: boolean
}

export const Button = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: ButtonProps) => {
  styles.useVariants({ variant, size, disabled })
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={styles.base}
    >
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  )
}
