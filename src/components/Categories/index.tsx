import { FlatList } from 'react-native';

import { Text } from '../Text';
import { categories } from '../../mocks/categories';
import { Category, Icon } from './styles';

export function Categories() {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => (
        <Category>
          <Icon>
            <Text>{category.icon}</Text>
          </Icon>
          <Text size={14} weight="600">{category.name}</Text>
        </Category>
      )}
    />
  );
}