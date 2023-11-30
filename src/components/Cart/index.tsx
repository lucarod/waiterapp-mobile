import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { Button } from '../Button';
import { OrderConfirmedModal } from '../OrderConfirmedModal';

import { formatCurrency } from '../../utils/formatCurrency';
import { api } from '../../utils/api';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';

import {
  Actions,
  Item,
  ProductContainer,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  selectedTable,
  onAdd,
  onDecrement,
  onConfirmOrder
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    };

    await api.post('orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
      {!!cartItems.length && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.3.7:3001/uploads/${cartItem.product.imagePath}`
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">{cartItem.quantity}x</Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length ? (
            <>
              <Text color="#666">Total</Text>
              <Text weight="600" size={20}>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={!cartItems.length}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
