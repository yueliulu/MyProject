import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useTranslation } from 'react-i18next';

const CheckoutScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const items = [
    {
      id: '1',
      name: 'Pink Chair Sofa',
      price: 40.5,
      icon: require('../assets/sofa.png'),
    },
    {
      id: '2',
      name: 'Table',
      price: 50.5,
      icon: require('../assets/table.png'),
    },
    {
      id: '3',
      name: 'Bed',
      price: 200,
      icon: require('../assets/Bed.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topNavBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{t('checkout_screen.header')}</Text>
        <View style={styles.topNavIcons}>
        </View>
      </View>
      <View style={styles.navBarLine} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.itemBox}>
              <Image source={item.icon} style={styles.icon} />
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>
            {t('checkout_screen.amount_label')} ({items.length} items):
          </Text>
          <Text style={styles.amountValue}>US$214.00</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>{t('checkout_screen.shipping_label')}</Text>
          <Text style={styles.amountValue}>US$6.50</Text>
        </View>
        <View style={styles.taxRow}>
          <Text style={styles.taxLabel}>{t('checkout_screen.tax_label')}</Text>
          <Text style={styles.taxValue}>US$7.50</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>{t('checkout_screen.total_label')}</Text>
        <Text style={styles.totalAmount}>US$214.00</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('ShippingScreen')}
      >
        <Text style={styles.checkoutText}>
          {t('checkout_screen.proceed_to_shipping')}
        </Text>
      </TouchableOpacity>
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2E0D7',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    color: '#4A3B35',
    marginBottom: 2,
  },
  itemPrice: {
    color: '#4A3B35',
    fontWeight: '700',
  },
  amountContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  amountLabel: {
    fontSize: 16,
    color: '#333',
  },
  amountValue: {
    fontSize: 16,
    color: '#333',
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  taxLabel: {
    fontSize: 16,
    color: '#333',
  },
  taxValue: {
    fontSize: 16,
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#4A3B35',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3B35',
  },
  checkoutButton: {
    backgroundColor: '#F08F5F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;