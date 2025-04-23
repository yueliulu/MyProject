import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActionSheetIOS,
  Image
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

const ChatScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello', sender: 'user' },
    { id: '2', text: 'Hi', sender: 'other' },
    { id: '3', text: 'How much is the desk', sender: 'user' },
    { id: '4', text: 'It is $15. You can choose to pick it up yourself or delivery', sender: 'other' },
    { id: '5', text: 'Sounds good! I will let you know if I decide to buy it', sender: 'user' },
  ]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const flatListRef = useRef(null);
  const textInputRef = useRef(null);

  const handleInputFocus = () => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() || selectedImage) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: input.trim(),
          sender: 'user',
          image: selectedImage,
        },
      ]);
      setInput('');
      setSelectedImage(null);
    }
  };

  const handleOpenAlbum = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 },
      response => {
        if (response.assets?.length) {
          setSelectedImage(response.assets[0]);
          setShowOptions(false);
        }
      }
    );
  };

  const handleOpenCamera = () => {
    launchCamera(
      { mediaType: 'photo', cameraType: 'back' },
      response => {
        if (response.assets?.length) {
          setSelectedImage(response.assets[0]);
          setShowOptions(false);
        }
      }
    );
  };

  // New function to handle navigation to CheckoutScreen
  const handleBuyButtonPress = () => {
    navigation.navigate('CheckoutScreen');
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.otherMessage,
        ]}
      >
        {!isUser && (
          <Image
            source={require('../assets/Morgan_James.png')}
            style={styles.avatar}
          />
        )}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
          {item.image && (
            <Image source={{ uri: item.image.uri }} style={styles.messageImage} />
          )}
          {item.text && <Text style={styles.messageText}>{item.text}</Text>}
        </View>
        {isUser && (
          <Image
            source={require('../assets/Morgan_James.png')}
            style={styles.avatar}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{t('chat_screen.header_title')}</Text>
            <Text style={styles.headerRating}>{t('chat_screen.header_rating')}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemInfo}>
          <Image
            source={require('../assets/table.png')}
            style={styles.itemImage}
          />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemPrice}>{t('chat_screen.item_price')}</Text>
            <Text style={styles.itemDetails}>{t('chat_screen.item_details')}</Text>
          </View>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleBuyButtonPress}
            >
              <Text style={styles.sendButtonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, { marginLeft: 8, minWidth: 120 }]}
              onPress={() => textInputRef.current?.focus()}
            >
              <Text style={styles.sendButtonText}>Make an offer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContent}
            style={{ flex: 1 }}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder={t('chat_screen.send_message_placeholder')}
            value={input}
            onChangeText={setInput}
            onFocus={handleInputFocus}
            multiline
          />
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>
              {t('chat_screen.send_button')}
            </Text>
          </TouchableOpacity>
        </View>
        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleOpenAlbum}
            >
              <Image
                source={require('../assets/table.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>
                {t('chat_screen.options_album')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleOpenCamera}
            >
              <Image
                source={require('../assets/table.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>
                {t('chat_screen.options_camera')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Image
                source={require('../assets/table.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>
                {t('chat_screen.options_share')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 10,
    paddingTop: 50,
    backgroundColor: '#FFFDF8',
  },
  backButton: { padding: 5 },
  backButtonText: { fontSize: 20, fontWeight: 'bold', color: '#F08F5F' },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerRating: { fontSize: 14, color: '#555' },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 1,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF8',
    padding: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF8F2D' },
  itemDetails: { fontSize: 14, color: '#555' },
  itemButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatContainer: { flex: 1 },
  chatContent: { paddingHorizontal: 15, paddingBottom: 10 },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  userMessage: { justifyContent: 'flex-end' },
  otherMessage: { justifyContent: 'flex-start' },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  bubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  userBubble: { backgroundColor: '#FBC8AE', marginLeft: 10 },
  otherBubble: { backgroundColor: '#E5E5E5', marginRight: 10 },
  messageText: { fontSize: 14 },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFFDF8',
    padding: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  plusButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: { fontSize: 24, color: 'black' },
  sendButton: {
    marginLeft: 8,
    height: 40,
    backgroundColor: '#FF8F2D',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  sendButtonText: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },
  optionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    marginBottom: 50,
  },
  optionButton: { flex: 1, alignItems: 'center' },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
  },
  optionText: { fontSize: 14, color: '#333' },
  selectedImageContainer: {
    position: 'relative',
    marginRight: 8,
  },
  selectedImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: { color: 'white', fontWeight: 'bold' },
});

export default ChatScreen;