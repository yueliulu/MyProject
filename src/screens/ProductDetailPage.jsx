import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const ProductDetailPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('Description');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const handleBack = () => {
    navigation.navigate('HomePage');
  };
  const handleShopping = () => {
    navigation.navigate('ShoppingCart');
  };
  const handleContact = () => {
    navigation.navigate('ConversationPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require('../assets/Expand_left.png')}
            style={[styles.backButtonIcon, { tintColor: '#F08F5F' }]}
          />
        </TouchableOpacity>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('product_detail.search_placeholder')}
            keyboardType="default"
            accessibilityLabel={t('product_detail.search_placeholder')}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            editable={true}
            selectTextOnFocus={true}
          />
        </View>

        <View style={styles.topNavIcons}>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => setIsBookmarked(!isBookmarked)}
          >
            <Image
              source={
                isBookmarked
                  ? require('../assets/Bookmark_filled.png')
                  : require('../assets/Bookmark_light.png')
              }
              style={styles.navIconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navIcon}>
            <Image
              source={require('../assets/Meatballs_menu.png')}
              style={[styles.navIconImage, { tintColor: 'black' }]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.productCard}>
          <Image
            source={require("../assets/Bed.png")}
            style={styles.productImage}
            resizeMode="cover"
          />

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Description' && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab('Description')}
            >
              {selectedTab === 'Description' && (
                <Text style={styles.checkMark}>✔︎</Text>
              )}
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'Description' && styles.activeTabText,
                ]}
              >
                {t('product_detail.description_tab')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Shipping' && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab('Shipping')}
            >
              {selectedTab === 'Shipping' && (
                <Text style={styles.checkMark}>✔︎</Text>
              )}
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'Shipping' && styles.activeTabText,
                ]}
              >
                {t('product_detail.shipping_tab')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {selectedTab === 'Description' ? (
              <>
                <Text style={styles.productTitle}>
                  {t('product_detail.product_title')}
                </Text>
                <Text style={styles.productPrice}>
                  {t('product_detail.price_label')}
                </Text>
                <Text style={styles.productCondition}>
                  {t('product_detail.condition_label')}
                </Text>
                <View style={styles.featureContainer}>
                  <View style={styles.featureButtonContainer}>
                    <TouchableOpacity style={styles.featureButton}>
                      <Text style={styles.featureButtonText}>
                        {t('product_detail.tags.tag_bedroom')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.featureButton}>
                      <Text style={styles.featureButtonText}>
                        {t('product_detail.tags.tag_type')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.featureButton}>
                      <Text style={styles.featureButtonText}>
                        {t('product_detail.tags.tag_location')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.deliveryOptionsText}>
                    {t('product_detail.delivery_options_label')}{' '}
                    <Text style={styles.deliveryOptionsDetails}>
                      {t('product_detail.delivery_options_details')}
                    </Text>
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.sellerInfoContainer}>
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/Morgan_James.png")}
                      style={styles.profileImage}
                    />
                  </TouchableOpacity>
                  <View style={styles.sellerDetailsContainer}>
                    <Text style={styles.sellerName}>
                      {t('product_detail.seller_name_label')}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>
                        {t('product_detail.seller_rating_label')}
                      </Text>
                      <View style={styles.starsContainer}>
                        <Text style={styles.star}>★</Text>
                        <Text style={styles.star}>★</Text>
                        <Text style={styles.star}>★</Text>
                        <Text style={styles.star}>☆</Text>
                        <Text style={styles.star}>☆</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.similarListingsContainer}>
                  <Text style={styles.similarListingsTitle}>
                    {t('product_detail.similar_items_label')}
                  </Text>
                  <View style={styles.similarListings}>
                    <TouchableOpacity>
                      <Image
                        source={require("../assets/Bed2.png")}
                        style={styles.similarListingImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={require("../assets/Bed3.png")}
                        style={styles.similarListingImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.newFooter}>
        <TouchableOpacity style={styles.contactSellerButton} onPress={handleContact}>
          <Image
            source={require('../assets/comment_duotone.png')}
            style={[styles.contactSellerIcon, { tintColor: '#504E4B' }]}
          />
          <Text style={styles.contactSellerText}>
            {t('product_detail.contact_seller_button')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleShopping}>
          <Text style={styles.addToCartText}>
            {t('product_detail.add_to_cart_button')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingBottom: 140,
  },
  topNavBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
  },
  searchBarContainer: {
    flex: 1,
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flex: 1,
  },
  topNavIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  navIcon: {
    marginHorizontal: 10,
  },
  navIconImage: {
    width: 24,
    height: 24,
  },
  productCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeTabButton: {
    backgroundColor: '#FBC8AE',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#333',
  },
  checkMark: {
    color: '#333',
    marginRight: 5,
  },
  contentContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productCondition: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  newFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
  },
  contactSellerButton: {
    flex: 1,
    backgroundColor: '#e9d7c8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  contactSellerIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  contactSellerText: {
    fontSize: 16,
    color: '#504E4B',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#F08F5F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  sellerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  sellerDetailsContainer: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    marginRight: 2,
    color: '#FFD700',
  },
  separator: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    width: '100%',
  },
  featureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  featureButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  featureButton: {
    backgroundColor: '#FBC8AE',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  featureButtonText: {
    color: '#333',
    fontSize: 14,
  },
  deliveryOptionsText: {
    fontSize: 14,
    color: '#333',
  },
  deliveryOptionsDetails: {
    color: '#666',
    fontStyle: 'italic',
  },
  similarListingsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  similarListingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  similarListings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  similarListingImage: {
    width: 170,
    height: 130,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});

export default ProductDetailPage;