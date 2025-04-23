import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const ShippingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, name: 'My Office', details: '1234 SLU apt unit 123' },
    { id: 2, name: 'My House', details: '5678 Main St, City, Country' },
  ]);
  const [newAddress, setNewAddreess] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{t('shipping_page.header')}</Text>

        <Text style={styles.subHeader}>{t('shipping_page.saved_addresses')}</Text>
        
        <TouchableOpacity 
          style={styles.addressBox} 
          onPress={() => setShowAllAddresses(!showAllAddresses)}
        >
          <Text style={styles.addressTitle}>{savedAddresses.find(a => a.id === selectedAddress)?.name}</Text>
          <Text style={styles.addressDetails}>{savedAddresses.find(a => a.id === selectedAddress)?.details}</Text>
          <Text style={styles.showMoreText}>{showAllAddresses ? t('shipping_page.hide_addresses') : t('shipping_page.show_more')}</Text>
        </TouchableOpacity>

        {showAllAddresses && savedAddresses.map((address) => (
          address.id !== selectedAddress && (
            <TouchableOpacity 
              key={address.id} 
              style={styles.addressBox}
              onPress={() => { setSelectedAddress(address.id); setShowAllAddresses(false); }}
            >
              <Text style={styles.addressTitle}>{address.name}</Text>
              <Text style={styles.addressDetails}>{address.details}</Text>
            </TouchableOpacity>
          )
        ))}

        {!showPayment ? (
          <TouchableOpacity style={styles.proceedButton} onPress={() => setShowPayment(true)}>
            <Text style={styles.proceedButtonText}>{t('shipping_page.proceed_to_checkout')}</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.subHeader}>{t('shipping_page.payment_information')}</Text>
            <Text style={styles.label}>{t('shipping_page.card_name')}</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>{t('shipping_page.card_number')}</Text>
            <TextInput style={styles.input} keyboardType='numeric' />

            <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate('OrderConfirmation')}>
              <Text style={styles.proceedButtonText}>{t('shipping_page.confirm_order')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F2',
  },
  container: {
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 25,
    color: '#F08F5F',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  addressBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
  },
  showMoreText: {
    fontSize: 14,
    color: '#F08F5F',
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#FFF',
  },
  proceedButton: {
    marginTop: 20,
    backgroundColor: '#F08F5F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
      backgroundColor: '#F08F5F',
      justifyContent: 'center',
      alignItems: 'center',
  },
  customCheckMark: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: 20,
  },
  checkboxStyle: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#F08F5F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  }
});

export default ShippingScreen;
