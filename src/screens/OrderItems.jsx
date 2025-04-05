import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const bottomNavItems = [
  { key: 'home', source: require('../assets/Home.png') },
  { key: 'cart', source: require('../assets/Shopping_cart.png') },
  { key: 'add', source: require('../assets/Add.png') },
  { key: 'chat', source: require('../assets/Chat.png') },
  { key: 'user', source: require('../assets/User.png') },
];

const items = [
  {
    id: '1',
    image: require('../assets/table.png'),
    brand: "Baskin's",
    nameKey: 'table',
    price: 50.50,
  },
  {
    id: '2',
    image: require('../assets/Bed.png'),
    brand: "Marley's",
    nameKey: 'bed',
    price: 200.00,
  },
  {
    id: '3',
    image: require('../assets/Bed.png'),
    brand: "Marley's",
    nameKey: 'bed',
    price: 200.00,
  },
  {
    id: '4',
    image: require('../assets/sofa.png'),
    brand: "Lauren's",
    nameKey: 'pink_chair_sofa',
    price: 40.50,
  },
];

export default function OrderItemsScreen({ navigation }) {
  const { t } = useTranslation();
  const [activeNav, setActiveNav] = React.useState('user');

  const formatPrice = (price) => {
    return `¥${price.toFixed(2)}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <Image
        source={item.image}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.nameText}>
          {t(`order_items_page.items.${item.nameKey}`)}
        </Text>
        <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
      </View>
      <Image 
        source={require('../assets/right_arrow.png')}
        style={styles.rightArrow}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails')}
          style={styles.backButton}
        >
          <Image
            source={require('../assets/orange_back.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t('order_items_page.header', { count: items.length })}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomNav}>
        {bottomNavItems.map((navItem) => {
          const isActive = navItem.key === activeNav;
          const tintColor = isActive ? '#FF8C00' : '#999';

          return (
            <TouchableOpacity
              key={navItem.key}
              style={styles.navItem}
              onPress={() => {
                setActiveNav(navItem.key);
                if (navItem.key === 'home') {
                  navigation.navigate('HomePage');
                } else if (navItem.key === 'cart') {
                  navigation.navigate('ShoppingCart');
                } else if (navItem.key === 'chat') {
                  navigation.navigate('ConversationPage');
                } else if (navItem.key === 'user') {
                  navigation.navigate('Profile');
                }
              }}
            >
              {navItem.key === 'add' ? (
                <Image
                  source={navItem.source}
                  style={styles.navIconLarge}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={navItem.source}
                  style={[styles.navIcon, { tintColor }]}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  backArrow: {
    width: 24,
    height: 24,
    tintColor: '#FF8C00',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4E3D8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  brandText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    color: '#FF8C00',
  },
  rightArrow: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navIconLarge: {
    width: 48,
    height: 48,
    marginTop: -12,
  },
});