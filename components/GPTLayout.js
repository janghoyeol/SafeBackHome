import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from "react-native-dotenv";
import { Linking } from 'react-native';
import { auth, db, doc, getDoc } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Speech from 'expo-speech';
import "react-native-url-polyfill/auto"

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const speak = (message) => {
  Speech.speak(message);
};

const Gpt = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [reservedWord, setReservedWord] = useState('');

  const fetchUserSettings = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);  // Assuming auth.currentUser.uid is the current user's uid
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEmergencyNumber(docSnap.data().emergencyNumber);
        setReservedWord(docSnap.data().word);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const callEmergencyNumber = () => {
    const phoneNumber = `tel:${emergencyNumber}`;
    Linking.openURL(phoneNumber);
  };

  const handleInput = async () => {
    try {
      const userInput = input;

      const newMessages = [...messages, { type: 'user', text: userInput }];

      setMessages(newMessages);

      if (userInput.includes(reservedWord)) {
        callEmergencyNumber();
        return;
      }

      const prompt = newMessages.map(m => `${m.type === 'user' ? 'You' : 'AI'}: ${m.text}`).join('\n') + '\nAI:';

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 1.0,
        stop: ["You:"],

      });
      setMessages(prev => [...prev, { type: 'ai', text: response.data.choices[0].text.trim() }]);

    } catch (error) {
      console.log(error);
    }

    setInput('');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>AI Chatbot</Text>
        
        <View style={styles.chatContainer}>
          <ScrollView style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <View key={index} style={message.type === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
                <Text style={message.type === 'user' ? styles.userMessage : styles.aiMessage}>
                  {message.text}
                </Text>
                <Icon
                  name="volume-up"
                  size={20}
                  color="#000"
                  style={message.type === 'user' ? styles.userSpeaker : styles.aiSpeaker}
                  onPress={() => speak(message.text)}
                />
              </View>
            ))}
          </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message here"
                    onChangeText={(text) => setInput(text)}
                    value={input}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    chatContainer: {
      width: '90%',
      height: '70%',
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#F2F2F2',
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
      backgroundColor: '#fff',
    },
    sendButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 20,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    outputContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    output: {
      fontSize: 16,
    },
    messagesContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    userMessage: {
      alignSelf: 'flex-end', 
      backgroundColor: '#e5e5e5',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      maxWidth: '80%'
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      color: '#fff',
      maxWidth: '80%'
    },
    userSpeaker: {
      alignSelf: 'flex-end',
      margin: 5,
    },
    aiSpeaker: {
      alignSelf: 'flex-start',
      margin: 5,
    },
  });
  
  export default Gpt;
  
