import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';

const initialConversationData = Array(10)
  .fill()
  .map((_, index) => ({
    id: index.toString(),
    name: index % 2 === 0 ? "Aaaaa" : "Bbbbb",
    message: index % 2 === 0 ? "When did you buy the desk?" : "What's desk size?",
    date: "11-02",
    unreadCount: 3,
    hasPhoto: true,
  }));

function ConversationHeader() {
  const { t } = useTranslation();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{t("conversation_page.header")}</Text>
    </View>
  );
}

function SearchBar({ searchText, setSearchText }) {
  const { t } = useTranslation();
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder={t("conversation_page.search_placeholder")}
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Image
          source={require("../assets/Search.png")}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

function ConversationItem({ item, onDelete, onPress, searchText}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const handleChat = () => {
    navigation.navigate('ChatScreen');
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(item.id)}
    >
      <Text style={styles.deleteButtonText}>{t("conversation_page.delete_button")}</Text>
    </TouchableOpacity>
  );

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Text key={index} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        <Text key={index} style={{ fontFamily: "OpenSans-Regular" }}>
          {part}
        </Text>
      )
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleChat(item)}>
        <View style={styles.conversationContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar} />
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
            <View style={styles.messageInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.lastMessage}>
                {getHighlightedText(item.message, searchText)}
              </Text>
              <Text style={styles.messageDate}>{item.date}</Text>
            </View>
          </View>
          {item.hasPhoto && (
            <View style={styles.photoPreview}>
              <Text style={styles.photoText}>{t("conversation_page.photo_preview")}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

function Footer({ selectedIcon, setSelectedIcon, hasUnreadMessages }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => {
          setSelectedIcon("home")
          navigation.navigate('HomePage');
        }}
        accessible
        accessibilityLabel={t("conversation_page.home_tab")}
      >
        <Image
          style={[styles.footerIcon, selectedIcon === "home" && styles.selectedIcon]}
          source={require("../assets/Home.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => {
          setSelectedIcon("cart")
          navigation.navigate('ShoppingCart');
        }}
        accessible
        accessibilityLabel={t("conversation_page.cart_tab")}
      >
        <Image
          style={[styles.footerIcon, selectedIcon === "cart" && styles.selectedIcon]}
          source={require("../assets/Shopping_cart.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <View style={styles.addButtonContainer}>
          <View style={styles.addVertical} />
          <View style={styles.addHorizontal} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => {
          setSelectedIcon("comments")
          navigation.navigate('ConversationPage');
        }}
        accessible
        accessibilityLabel={t("conversation_page.comments_tab")}
      >
        <View>
          <Image
            style={[styles.footerIcon, selectedIcon === "comments" && styles.selectedIcon]}
            source={require("../assets/comment_duotone.png")}
          />
          {hasUnreadMessages && <View style={styles.tinyRedDot} />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => {
          setSelectedIcon("user")
          navigation.navigate('Profile');
        }}
        accessible
        accessibilityLabel={t("conversation_page.user_tab")}
      >
        <Image
          style={[styles.footerIcon, selectedIcon === "user" && styles.selectedIcon]}
          source={require("../assets/User.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ConversationPage() {
  const [conversations, setConversations] = React.useState(initialConversationData);
  const [searchText, setSearchText] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState(null);

  const handleDelete = (id) => {
    setConversations((prevConversations) =>
      prevConversations.filter((conversation) => conversation.id !== id)
    );
  };

  const handleChatPress = (item) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === item.id ? { ...conversation, unreadCount: 0 } : conversation
      )
    );
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasUnreadMessages = conversations.some((conversation) => conversation.unreadCount > 0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ConversationHeader />
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <FlatList
          data={filteredConversations}
          renderItem={({ item }) => (
            <ConversationItem
              item={item}
              onDelete={handleDelete}
              onPress={handleChatPress}
              searchText={searchText}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.conversationList}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
        <Footer
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          hasUnreadMessages={hasUnreadMessages}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F2",
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#F8F7F2",
  },
  headerTitle: {
    fontSize: 24,
    color: "#000",
    fontFamily: "OpenSans-Regular",
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F8F7F2",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "OpenSans-Regular",
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  conversationList: {
    flex: 1,
    backgroundColor: "#F8F7F2",
  },
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  conversationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DDD",
  },
  unreadBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF4444",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
  },
  messageInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    color: "#000",
    fontFamily: "OpenSans-Regular",
  },
  lastMessage: {
    fontSize: 14,
    color: "#555",
    fontFamily: "OpenSans-Regular",
  },
  highlightedText: {
    backgroundColor: "#FBC8AE",
    fontFamily: "OpenSans-Regular",
  },
  messageDate: {
    fontSize: 12,
    color: "#999",
    fontFamily: "OpenSans-Regular",
  },
  photoPreview: {
    width: 92,
    height: 60,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    fontSize: 8,
    textAlign: "center",
    color: "#555",
    fontFamily: "OpenSans-Regular",
  },
  deleteButton: {
    backgroundColor: "#FF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
  },
  footerContainer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F8F7F2",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  footerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  selectedIcon: {
    tintColor: "#FF8F2D",
  },
  addButtonContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  addVertical: {
    position: "absolute",
    width: 4,
    height: 24,
    backgroundColor: "#FF8F2D",
  },
  addHorizontal: {
    position: "absolute",
    width: 24,
    height: 4,
    backgroundColor: "#FF8F2D",
  },
  tinyRedDot: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF4444",
    borderRadius: 4,
    width: 8,
    height: 8,
  },
});