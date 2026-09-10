// Expo: primitivos de 'react-native'. Next: ver references/targets/nextjs.md
// (mesmo .css.ts; primitivos de layout vêm de @core/react-native-web).
import { View, Text } from 'react-native'
import { Button } from '@/modules/@core/presentation/components/components'
import { useExamples } from '../../hooks/use-examples.hook'
import { styles } from './example.css'

/**
 * Screen magra: compõe layout + liga o hook aos componentes @core.
 * Nenhuma regra de negócio aqui; nenhum estilo inline; só styles.* e @core.
 */
export const ExampleScreen = () => {
  const { items, errorMessage, isLoading, isCreating, addExample } = useExamples()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemplos</Text>
      <Text style={styles.subtitle}>Tela de referência do padrão Villela.</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        ))}
      </View>

      <Button
        disabled={isCreating || isLoading}
        onPress={() => {
          void addExample(`Exemplo ${items.length + 1}`)
        }}
      >
        {isCreating ? 'Adicionando…' : 'Adicionar exemplo'}
      </Button>
    </View>
  )
}
