import { useState } from 'react';
import { FlatList } from 'react-native';

import { Text } from '../Text';
import { categories } from '../../mocks/categories';
import { Category, Icon } from './styles';

export function Categories() {
  const [selectedCategory, setSelectedcategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedcategory(category);
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {category.icon}
              </Text>
            </Icon>
            <Text
              opacity={isSelected ? 1 : 0.5}
              size={14}
              weight="600"
            >
              {category.name}
            </Text>
          </Category>
        );
      }}
    />
  );
}
