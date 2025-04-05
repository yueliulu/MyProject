import React, { useState } from 'react';
import { 
  View, 
  Image, 
  Text, 
  TextInput, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: 'sans-serif' };

const HomePage = ({ navigation }) => {
  const { t } = useTranslation();

  const TAB_KEYS = ['feed', 'nearby'];
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortFilters, setSortFilters] = useState({
    latest: false,
    oldest: false,
    priceHighToLow: false,
    priceLowToHigh: false,
  });

  const [activeLocationTab, setActiveLocationTab] = useState('state');

  const [categoryFilters, setCategoryFilters] = useState({
    bedroom: false,
    livingRoom: false,
    kitchen: false,
    electronics: false,
    clothesShoes: false,
    lighting: false,
    others: false,
  });

  const toggleFilter = (filterName) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SearchBar />
        <View style={styles.navigationTabs}>
          {TAB_KEYS.map((tabKey) => (
            <TouchableOpacity
              key={tabKey}
              onPress={() => setActiveTab(tabKey)}
              style={[
                styles.tab,
                activeTab === tabKey ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tabKey ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {t(`home_page.${tabKey}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Divider />
        
        <View style={styles.filterRow}>
          <View style={styles.filterOptions}>
            <TouchableOpacity onPress={() => toggleFilter('sort')} style={styles.filterButton}>
              <Text style={styles.filterButtonText}>{t('home_page.sort')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFilter('location')} style={styles.filterButton}>
              <Text style={styles.filterButtonText}>{t('home_page.location')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFilter('category')} style={styles.filterButton}>
              <Text style={styles.filterButtonText}>{t('home_page.category')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterIconContainer}>
            <Image
              source={require('../assets/Filter.png')}
              style={styles.filterIcon}
            />
          </View>
        </View>
        <ProductListing navigation={navigation} />
      </ScrollView>
      
      <BottomNavigation navigation={navigation} />

      {activeFilter && (
        <View style={styles.subOptionsContainer}>
          {activeFilter === 'sort' && (
            <SortOverlay
              sortFilters={sortFilters}
              setSortFilters={setSortFilters}
            />
          )}

          {activeFilter === 'location' && (
            <LocationOverlay
              activeLocationTab={activeLocationTab}
              setActiveLocationTab={setActiveLocationTab}
            />
          )}

          {activeFilter === 'category' && (
            <CategoryOverlay
              categoryFilters={categoryFilters}
              setCategoryFilters={setCategoryFilters}
            />
          )}
        </View>
      )}
    </View>
  );
};

const SortOverlay = ({ sortFilters, setSortFilters }) => {
  const { t } = useTranslation();

  const toggleCheck = (key) => {
    setSortFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.sortOverlay}>
      <View style={styles.sortRow}>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            checked={sortFilters.latest}
            onPress={() => toggleCheck('latest')}
          />
          <Text style={styles.subOptionText}>{t('home_page.latest')}</Text>
        </View>

        <View style={styles.checkboxWrapper}>
          <CheckBox
            checked={sortFilters.oldest}
            onPress={() => toggleCheck('oldest')}
          />
          <Text style={styles.subOptionText}>{t('home_page.oldest')}</Text>
        </View>
      </View>

      <View style={styles.sortRow}>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            checked={sortFilters.priceHighToLow}
            onPress={() => toggleCheck('priceHighToLow')}
          />
          <Text style={styles.subOptionText}>{t('home_page.priceHighToLow')}</Text>
        </View>

        <View style={styles.checkboxWrapper}>
          <CheckBox
            checked={sortFilters.priceLowToHigh}
            onPress={() => toggleCheck('priceLowToHigh')}
          />
          <Text style={styles.subOptionText}>{t('home_page.priceLowToHigh')}</Text>
        </View>
      </View>
    </View>
  );
};

const LocationOverlay = ({
  activeLocationTab,
  setActiveLocationTab,
}) => {
  const { t } = useTranslation();

  const LOCATION_ITEMS = ['menuItemA', 'menuItemB', 'menuItemC', 'menuItemD'];

  return (
    <View style={styles.locationOverlay}>
      <View style={styles.locationTabRow}>
        <TouchableOpacity
          style={[
            styles.locationTab,
            activeLocationTab === 'state' && styles.locationTabActive,
          ]}
          onPress={() => setActiveLocationTab('state')}
        >
          <Text style={styles.locationTabText}>{t('home_page.state')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.locationTab,
            activeLocationTab === 'city' && styles.locationTabActive,
          ]}
          onPress={() => setActiveLocationTab('city')}
        >
          <Text style={styles.locationTabText}>{t('home_page.city')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.locationTab,
            activeLocationTab === 'area' && styles.locationTabActive,
          ]}
          onPress={() => setActiveLocationTab('area')}
        >
          <Text style={styles.locationTabText}>{t('home_page.area')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationDropdown}>
        {LOCATION_ITEMS.map((itemKey, idx) => (
          <TouchableHighlight
            key={idx}
            style={styles.dropdownItemContainer}
            underlayColor="#FBC8AE"
            onPress={() => {
              console.log('Location item pressed:', t(`home_page.${itemKey}`));
            }}
          >
            <Text style={styles.dropdownItemText}>
              {t(`home_page.${itemKey}`)}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

const CategoryOverlay = ({ categoryFilters, setCategoryFilters }) => {
  const { t } = useTranslation();

  const toggleCheck = (key) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.categoryOverlay}>
      <View style={styles.categoryRow}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.bedroom}
            onPress={() => toggleCheck('bedroom')}
          />
          <Text style={styles.subOptionText}>{t('home_page.bedroom')}</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.livingRoom}
            onPress={() => toggleCheck('livingRoom')}
          />
          <Text style={styles.subOptionText}>{t('home_page.livingRoom')}</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.kitchen}
            onPress={() => toggleCheck('kitchen')}
          />
          <Text style={styles.subOptionText}>{t('home_page.kitchen')}</Text>
        </View>
      </View>

      <View style={styles.categoryRow}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.electronics}
            onPress={() => toggleCheck('electronics')}
          />
          <Text style={styles.subOptionText}>{t('home_page.electronics')}</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.clothesShoes}
            onPress={() => toggleCheck('clothesShoes')}
          />
          <Text style={styles.subOptionText}>{t('home_page.clothesShoes')}</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.lighting}
            onPress={() => toggleCheck('lighting')}
          />
          <Text style={styles.subOptionText}>{t('home_page.lighting')}</Text>
        </View>
      </View>

      <View style={styles.categoryRow}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={categoryFilters.others}
            onPress={() => toggleCheck('others')}
          />
          <Text style={styles.subOptionText}>{t('home_page.others')}</Text>
        </View>
      </View>
    </View>
  );
};

const SearchBar = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Search button pressed with text:", searchText);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder={t('home_page.searchPlaceholder')}
        placeholderTextColor="#777"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Image
          source={require('../assets/Search.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const Divider = () => <View style={styles.divider} />;

const products = [
  { 
    id: 1, 
    name: 'productName', 
    price: 50, 
    tag: 'nearYou',
    location: 'NYC',
    type: 'pickUp',
    userIndex: 1,
    userImage: 'https://via.placeholder.com/40' 
  },
  { 
    id: 2, 
    name: 'productName', 
    price: 80, 
    tag: 'priceDrop',
    location: 'NYC',
    type: 'delivery',
    userIndex: 2,
    userImage: 'https://via.placeholder.com/40' 
  },
  { 
    id: 3, 
    name: 'productName', 
    price: 50, 
    tag: 'nearYou', 
    location: 'NYC',
    type: 'pickUp',
    userIndex: 3,
    userImage: 'https://via.placeholder.com/40' 
  },
  { 
    id: 4, 
    name: 'productName', 
    price: 80, 
    tag: 'priceDrop', 
    location: 'NYC',
    type: 'delivery',
    userIndex: 4,
    userImage: 'https://via.placeholder.com/40' 
  },
];

const ProductListing = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.productListing}>
      <Text style={styles.featuredText}>
        {t('home_page.featuredProducts')}
      </Text>
      <View style={styles.productRow}>
        {products.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} navigation={navigation} />
        ))}
      </View>
      <View style={styles.productRow}>
        {products.slice(2, 4).map((product) => (
          <ProductCard key={product.id} product={product} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};

const ProductCard = ({ product, navigation }) => {
  const { t } = useTranslation();
  const { id, name, price, tag, location, type, userIndex, userImage } = product;

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        navigation.navigate('ProductDetailPage', { productId: id });
      }}
    >
      <View style={styles.productImageContainer}>
        <Text style={styles.productTag}>
          {t(`home_page.${tag}`)}
        </Text>
        <Text style={styles.productImageText}>
          {t('home_page.productImage')}
        </Text>
      </View>

      <Text style={styles.productName}>
        {t(`home_page.${name}`)} {price}
      </Text>

      <View style={styles.productInfo}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{location}</Text>
          <Text style={styles.tagText}>{t(`home_page.${type}`)}</Text>
        </View>

        <View style={styles.userInfo}>
          <Image source={{ uri: userImage }} style={styles.userImage} />
          <Text style={styles.userText}>
            {t('home_page.user')} {userIndex}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BottomNavigation = ({ style, navigation }) => {
  const handleNavigation = (index) => {
    const routes = ['HomePage', 'ShoppingCart', 'CreatePost', 'ConversationPage', 'Profile'];
    navigation.navigate(routes[index]);
  };
  const icons = [
    require('../assets/Home.png'),
    require('../assets/Shopping_cart.png'),
    require('../assets/Add.png'),
    require('../assets/Chat.png'),
    require('../assets/User.png'),
  ];

  return (
    <View style={[styles.bottomNavigation, style]}>
      {icons.map((icon, index) => (
        <TouchableOpacity key={index} onPress={() => handleNavigation(index)}>
          <Image source={icon} style={styles.bottomIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 20,
    width: '90%',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  searchButton: {
    padding: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  navigationTabs: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tab: {
    width: '40%',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: '#FFF',
    borderColor: '#000',
  },
  inactiveTab: {
    backgroundColor: '#FBC8AE',
    borderColor: '#FBC8AE',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#000000',
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 5,
  },
  filterRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'center',
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterButton: {
    marginRight: 20,
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  filterIconContainer: {
    padding: 5,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  productListing: {
    width: '90%',
    marginTop: 10,
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  productImageContainer: {
    height: 140,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 8,
    marginBottom: 8,
    position: 'relative',
  },
  productTag: {
    fontSize: 12,
    color: '#333',
    backgroundColor: '#CCC',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  productImageText: {
    fontSize: 12,
    color: '#666',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productInfo: {
    marginTop: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
    padding: 3,
    backgroundColor: '#EEE',
    borderRadius: 4,
    marginRight: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  userText: {
    fontSize: 12,
    color: '#555',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  bottomIcon: {
    width: 30,
    height: 30,
  },
  subOptionsContainer: {
    position: 'absolute',
    top: 200,
    left: '5%',
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    zIndex: 9999,
    elevation: 10,
  },
  subOptionText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 1,
    marginBottom: 1,
  },
  sortOverlay: {
    maxHeight: 300,
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 20,
  },
  locationOverlay: {},
  locationTabRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  locationTab: {
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 5,
  },
  locationTabActive: {
    borderBottomColor: '#f90',
  },
  locationTabText: {
    fontSize: 14,
    color: '#333',
  },
  locationDropdown: {
    backgroundColor: '#FFF',
    paddingTop: 5,
    borderRadius: 5,
  },
  dropdownItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  categoryOverlay: {},
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export { BottomNavigation };
export default HomePage;