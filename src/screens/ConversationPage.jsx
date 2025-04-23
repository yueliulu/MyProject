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
import { BottomNavigation } from "./Home";            // <-- import Home's footer
// no need for useNavigation here anymore

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

function ConversationItem({ item, onDelete, onPress, searchText }) {
  const { t } = useTranslation();

  const handleChat = () => {
    onPress(item);
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(item.id)}
    >
      <Text style={styles.deleteButtonText}>
        {t("conversation_page.delete_button")}
      </Text>
    </TouchableOpacity>
  );

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Text key={i} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        <Text key={i} style={{ fontFamily: "OpenSans-Regular" }}>
          {part}
        </Text>
      )
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.itemContainer} onPress={handleChat}>
        <View style={styles.conversationContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("../assets/Morgan_James.png")}
                style={styles.avatar}
              />
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
            <Image
              source={require("../assets/table.png")}
              style={styles.photoPreview}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default function ConversationPage({ navigation }) {
  const [conversations, setConversations] = React.useState(initialConversationData);
  const [searchText, setSearchText] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState(null);

  const handleDelete = id => {
    setConversations(prev => prev.filter(c => c.id !== id));
  };

  const handleChatPress = item => {
    setConversations(prev =>
      prev.map(c => (c.id === item.id ? { ...c, unreadCount: 0 } : c))
    );
    navigation.navigate("ChatScreen", { conversationId: item.id });
  };

  const filtered = conversations.filter(c =>
    c.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasUnread = conversations.some(c => c.unreadCount > 0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ConversationHeader />
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <FlatList
          data={filtered}
          renderItem={({ item }) => (
            <ConversationItem
              item={item}
              onDelete={handleDelete}
              onPress={handleChatPress}
              searchText={searchText}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          style={styles.conversationList}
        />

        <BottomNavigation
          navigation={navigation}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          hasUnreadMessages={hasUnread}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F7F2" },
  headerContainer: { paddingTop: 50, paddingBottom: 10, alignItems: "center" },
  headerTitle: { fontSize: 24, fontFamily: "OpenSans-Regular" },
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
    backgroundColor: "#FFF",
  },
  searchInput: { flex: 1, fontSize: 16 },
  searchIcon: { width: 24, height: 24, marginLeft: 10 },
  conversationList: { flex: 1 },
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
  },
  conversationContent: { flexDirection: "row", alignItems: "center" },
  userInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatarContainer: { position: "relative", width: 40, height: 40 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  unreadBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF4444",
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadCount: { color: "#FFF", fontSize: 10 },
  messageInfo: { flex: 1, marginLeft: 10 },
  userName: { fontSize: 16 },
  lastMessage: { fontSize: 14, color: "#555" },
  highlightedText: { backgroundColor: "#FBC8AE" },
  messageDate: { fontSize: 12, color: "#999" },
  photoPreview: { width: 92, height: 60, marginLeft: 10, borderRadius: 4 },
  deleteButton: { backgroundColor: "#FF4444", width: 100, justifyContent: "center", alignItems: "center" },
  deleteButtonText: { color: "#FFF", fontSize: 14 },
});
