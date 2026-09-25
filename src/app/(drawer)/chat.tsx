import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hello! I can help review vitals, device status, or compression settings.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    if (!GEMINI_API_KEY) {
      console.error('EXPO_PUBLIC_GEMINI_API_KEY is missing!');
    }

    const userText = input.trim();
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{
                text: 'You are Orthostat AI, an intelligent and concise assistant for the Orthostat health monitoring app. Answer questions about orthostatic hypotension, syncope prevention, heart rate, blood pressure, and device setup.',
              }],
            },
            contents: [...messages, userMessage].map((message) => ({
              role: message.role === 'user' ? 'user' : 'model',
              parts: [{ text: message.text }],
            })),
          }),
        },
      );

      const data = await response.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const text = responseText || data?.error?.message || 'I could not generate a response right now.';

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', text },
      ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: 'Network error connecting to Gemini. Please try again.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={styles.container}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(message) => message.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item: message }) => (
            <View
              style={[
                styles.bubble,
                message.role === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.roleText}>{message.role === 'user' ? 'You' : 'Orthostat AI'}</Text>
              <Text style={styles.text}>{message.text}</Text>
            </View>
          )}
        />

        {isSending && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#00ffff" size="small" />
            <Text style={styles.loadingText}>Orthostat AI is thinking...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask Orthostat AI..."
            placeholderTextColor="#888"
            multiline
            maxLength={1000}
            editable={!isSending}
          />
          <TouchableOpacity
            style={[styles.sendButton, isSending && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={isSending}
          >
            <Text style={styles.sendText}>{isSending ? 'Sending...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  chatList: { padding: 16 },
  bubble: { padding: 12, borderRadius: 12, marginVertical: 6, maxWidth: '85%' },
  userBubble: { backgroundColor: '#1e88e5', alignSelf: 'flex-end' },
  aiBubble: { backgroundColor: '#2d2d2d', alignSelf: 'flex-start' },
  roleText: { fontSize: 10, color: '#aaa', marginBottom: 2, fontWeight: 'bold' },
  text: { color: '#ffffff', fontSize: 15 },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#181818', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#2d2d2d', color: '#fff', padding: 12, borderRadius: 8, marginRight: 8 },
  sendButton: { backgroundColor: '#1e88e5', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  sendButtonDisabled: { opacity: 0.6 },
  sendText: { color: '#fff', fontWeight: 'bold' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8 },
  loadingText: { color: '#888', fontSize: 12, marginLeft: 8 },
});