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
import ConversationPage from './ConversationPage';

const ChatScreen = ({navigation}) => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello', sender: 'user' },
    { id: '2', text: 'Hi', sender: 'other' },
    { id: '3', text: 'How much is the desk', sender: 'user' },
    { id: '4', text: 'It is $15. You can choose to pick it up youself or delivery', sender: 'other' },
    { id: '5', text: 'Sounds good! I will let you know if I decide to buy it', sender: 'user' },
  ]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const flatListRef = useRef(null);
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
      setMessages((prevMessages) => [
        ...prevMessages,
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
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          if (response.assets && response.assets.length > 0) {
            setSelectedImage(response.assets[0]);
            setShowOptions(false);
          }
        }
      }
    );
  };

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.error('Camera Error: ', response.errorMessage);
        } else {
          if (response.assets && response.assets.length > 0) {
            setSelectedImage(response.assets[0]);
            setShowOptions(false);
          }
        }
      }
    );
  };

  const handleMenuPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t('chat_screen.go_to_profile'),
            t('chat_screen.block'),
            t('chat_screen.cancel'),
          ],
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
          } else if (buttonIndex === 1) {
          }
        }
      );
    } else {
      Alert.alert(
        'Options',
        '',
        [
          { text: t('chat_screen.go_to_profile'), onPress: () => {} },
          { text: t('chat_screen.block'), onPress: () => {}, style: 'destructive' },
          { text: t('chat_screen.cancel'), onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
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
        {!isUser && <View style={styles.avatar} />}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
          {item.image && (
            <Image source={{ uri: item.image.uri }} style={styles.messageImage} />
          )}
          {item.text ? <Text style={styles.messageText}>{item.text}</Text> : null}
        </View>
        {isUser && <View style={styles.avatar} />}
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
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{t('chat_screen.header_title')}</Text>
            <Text style={styles.headerRating}>{t('chat_screen.header_rating')}</Text>
          </View>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Text style={styles.menuButtonText}>...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.itemInfo}>
          <View style={styles.itemImage} />
          <View>
            <Text style={styles.itemPrice}>{t('chat_screen.item_price')}</Text>
            <Text style={styles.itemDetails}>{t('chat_screen.item_details')}</Text>
          </View>
        </View>

        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContent}
            style={{ flex: 1 }}
            onContentSizeChange={() => {
              if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
              }
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.removeImageText}>x</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
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
            <Text style={styles.sendButtonText}>{t('chat_screen.send_button')}</Text>
          </TouchableOpacity>
        </View>

        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={handleOpenAlbum}>
              <View style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('chat_screen.options_album')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleOpenCamera}>
              <View style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('chat_screen.options_camera')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <View style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('chat_screen.options_share')}</Text>
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
  menuButton: { padding: 5, marginLeft: 'auto' },
  menuButtonText: { fontSize: 20, fontWeight: 'bold' },
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
    backgroundColor: '#CCC',
    marginRight: 10,
    borderRadius: 5,
  },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF8F2D' },
  itemDetails: { fontSize: 14, color: '#555' },
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
    backgroundColor: '#CCC',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  bubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
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
  selectedImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 2,
  },
  removeImageText: {
    fontSize: 14,
    color: '#000',
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
  plusButtonText: {
    fontSize: 24,
    color: 'black',
  },
  sendButton: {
    marginLeft: 8,
    width: 60,
    height: 40,
    backgroundColor: '#FF8F2D',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    marginBottom: 50,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
  },
  optionIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#CCC',
    borderRadius: 10,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ChatScreen;
