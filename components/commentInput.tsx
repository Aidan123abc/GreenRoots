import React, { useEffect, forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from 'react-native';

type CommentInputProps = {
  visible: boolean;
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const CommentInput = forwardRef<TextInput, CommentInputProps>(
  ({ visible, value, onChange, onSubmit, onClose }, ref) => {
    if (!visible) return null;

    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder="Write your comment..."
          value={value}
          onChangeText={onChange}
          returnKeyType="send"
          onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
            onSubmit();
            Keyboard.dismiss();
            onClose();
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    fontSize: 16,
  },
});

export default CommentInput;
