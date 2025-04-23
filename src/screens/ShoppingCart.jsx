import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const ShoppingCart = ({ navigation }) => {
  const [items, setItems] = useState([
    { id: '1', name: 'Pink Chair Sofa', price: 40.5, icon: require('../assets/sofa.png') },
    { id: '2', name: 'Table', price: 50.5, icon: require('../assets/table.png') },
    { id: '3', name: 'Bed', price: 200, icon: require('../assets/Bed.png') },
  ]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const allSelected = items.every(item => updated[item.id]);
      setSelectAll(allSelected);
      return updated;
    });
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      const newSelectedItems = {};
      items.forEach(item => {
        newSelectedItems[item.id] = true;
      });
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems({});
    }
  };

  const deleteSelectedItems = () => {
    const remainingItems = items.filter(item => !selectedItems[item.id]);
    setItems(remainingItems);
    setSelectedItems({});
    setSelectAll(false);
  };

  const deleteSingleItem = (id) => {
    const remainingItems = items.filter(item => item.id !== id);
    setItems(remainingItems);
    setSelectedItems(prev => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
  };

  const totalPrice = items.reduce((total, item) => {
    if (selectedItems[item.id]) return total + item.price;
    return total;
  }, 0);

  const isAnyItemSelected = Object.values(selectedItems).some(value => value);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topNavBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{t('shopping_cart.header')}</Text>
      </View>
      <View style={styles.navBarLine} />

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.deleteAllButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.deleteAllText}>{t('shopping_cart.delete_all_button')}</Text>
        </TouchableOpacity>
        <Text style={styles.allText}>{t('shopping_cart.all_checkbox')}</Text>
        <CheckBox
          checked={selectAll}
          onPress={toggleSelectAll}
          containerStyle={styles.checkboxAllStyle}
          checkedIcon={
            <View style={styles.customCheckedBox}>
              <Text style={styles.customCheckMark}>✔</Text>
            </View>
          }
          uncheckedIcon={<View style={styles.customUncheckedBox} />}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isSelected = !!selectedItems[item.id];
          return (
            <View
              style={[
                styles.itemContainer,
                isSelected && styles.selectedItemBox,
              ]}
            >
              {isSelected && (
                <View style={styles.deleteIconContainer}>
                  <TouchableOpacity onPress={() => deleteSingleItem(item.id)}>
                    <Image
                      source={require('../assets/delete.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.checkboxAndImage}>
                <CheckBox
                  checked={isSelected}
                  onPress={() => toggleCheckbox(item.id)}
                  containerStyle={styles.checkboxStyle}
                  checkedIcon={
                    <View style={styles.customCheckedBox}>
                      <Text style={styles.customCheckMark}>✔</Text>
                    </View>
                  }
                  uncheckedIcon={<View style={styles.customUncheckedBox} />}
                />
                <Image source={item.icon} style={styles.itemImage} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{t('shopping_cart.order_total')}</Text>
          <Text style={styles.totalAmount}>US${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, !isAnyItemSelected && styles.checkoutButtonDisabled]}
          onPress={() => navigation.navigate('CheckoutScreen')}
          disabled={!isAnyItemSelected}
        >
          <Text style={styles.checkoutText}>{t('shopping_cart.checkout_button')} ({items.length})</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('shopping_cart.delete_items_modal_text')}</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>{t('shopping_cart.delete_items_modal_cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDeleteButton}
                onPress={() => {
                  deleteSelectedItems();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalDeleteText}>{t('shopping_cart.delete_items_modal_delete')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F2',
  },
  topNavBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#F8F7F2',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#F08F5F',
    fontSize: 25,
    fontWeight: 'bold',
  },
  topNavIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkButton: {
    marginTop: 10,
    padding: 10,
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  navBarLine: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width: '100%',
  },
  header: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    position: 'absolute',
    left: '53%',
    transform: [{ translateX: '-50%' }],
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#E0DCD6',
    borderBottomWidth: 1,
  },
  deleteAllButton: {
    backgroundColor: '#FBC8AE',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  deleteAllText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  allText: {
    marginLeft: 'auto',
    marginRight: 5,
    fontSize: 14,
    color: '#4A3B35',
  },
  checkboxAllStyle: {
    padding: 0,
    margin: 0,
  },
  customUncheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  customCheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#FF8F2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customCheckMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2E0D7',
    marginVertical: 5,
    borderRadius: 8,
    padding: 10,
    position: 'relative',
  },
  selectedItemBox: {
    backgroundColor: '#F2E0D7',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#F2E0D7',
    resizeMode: 'contain',
  },
  checkboxAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxStyle: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#4A3B35',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: '#4A3B35',
    fontWeight: '700',
  },
  bottomContainer: {
    borderTopColor: '#E0DCD6',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#F8F7F2',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#F08F5F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    color: '#4A3B35',
    marginBottom: 15,
  },
  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalCancelButton: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FBC8AE',
    backgroundColor: '#FBC8AE',
    marginRight: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  modalDeleteButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#FBC8AE',
    marginLeft: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#FFF',
    fontSize: 14,
  },
  modalDeleteText: {
    color: '#FFF',
    fontSize: 14,
  },
});
export default ShoppingCart;