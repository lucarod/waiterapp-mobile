import { Modal } from 'react-native';

import { Container, OkButton } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose: () => void;
}

export function OrderConfirmedModal({ visible, onClose }: OrderConfirmedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onClose}>
          <Text color="#D73505" weight="600">OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
