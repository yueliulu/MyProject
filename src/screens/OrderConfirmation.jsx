import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BottomNavigation } from './Home';

export default function OrderConfirmation({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Order Confirmation</Text>

        <View style={styles.row}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.successText}>Thank you!</Text>
        </View>

        <Text style={styles.orderText}>
          Your order <Text style={styles.bold}>#BE12345</Text> has been placed.
        </Text>

        <Text style={styles.secondaryText}>
          We sent an email to <Text style={styles.email}>orders@banuelson.com</Text> with your order confirmation and bill.
        </Text>

        <Text style={styles.timestamp}>Time placed: 11/14 2:30 pm PDT</Text>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Shipping</Text>
          <Text style={styles.infoText}>Banu Elson</Text>
          <Text style={styles.infoText}>orders@banuelson.com</Text>
          <Text style={styles.infoText}>+49 179 111 1010</Text>
          <Text style={styles.infoText}>Leibnizstraße 16, Wohnheim 6, No: 8X</Text>
          <Text style={styles.infoText}>Clausthal-Zellerfeld, Germany</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Billing</Text>
          <Text style={styles.infoText}>Banu Elson</Text>
          <Text style={styles.infoText}>orders@banuelson.com</Text>
          <Text style={styles.infoText}>+49 179 111 1010</Text>
          <Text style={styles.infoText}>Leibnizstraße 16, Wohnheim 6, No: 8X</Text>
          <Text style={styles.infoText}>Clausthal-Zellerfeld, Germany</Text>
        </View>

        <View style={styles.deliveryBox}>
          <Text style={styles.carIcon}>🚗</Text>
          <Text style={styles.deliveryText}>Arrives by November 20–23</Text>
        </View>
      </ScrollView>

      <BottomNavigation
        style={styles.bottomNavigationSpacing}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  checkmark: { fontSize: 60, color: 'green' },
  successText: { fontSize: 18, fontWeight: '500', marginLeft: 8 },
  orderText: { fontSize: 16, marginTop: 10 },
  bold: { fontWeight: 'bold' },
  secondaryText: { fontSize: 14, color: '#666', marginTop: 6 },
  email: { color: '#000' },
  timestamp: { fontSize: 13, color: '#444', marginTop: 12 },
  infoBox: { backgroundColor: '#fdecea', padding: 14, borderRadius: 8, marginTop: 20 },
  sectionTitle: { fontWeight: '600', fontSize: 16, marginBottom: 8 },
  infoText: { fontSize: 14, marginBottom: 2 },
  deliveryBox: { backgroundColor: '#fff4e5', padding: 12, borderRadius: 8, marginTop: 24, flexDirection: 'row', alignItems: 'center' },
  carIcon: { fontSize: 20, marginRight: 8 },
  deliveryText: { fontSize: 14 },
  bottomNavigationSpacing: { paddingBottom: 0 },
});
