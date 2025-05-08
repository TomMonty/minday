import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import styles from './AvatarUploader.module.css';

const AvatarUploader = ({ currentAvatar, onAvatarChange, isEditable }) => {
  const fileInputRef = useRef(null);
  
  const handleClick = () => {
    if (!isEditable) return;
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }
    
    // Create local URL for the image
    const imageUrl = URL.createObjectURL(file);
    onAvatarChange(imageUrl);
  };
  
  return (
    <div className={styles.container}>
      <div 
        className={`${styles.avatarWrapper} ${isEditable ? styles.editable : ''}`}
        onClick={handleClick}
      >
        <Avatar className={styles.avatar}>
          <AvatarImage src={currentAvatar} alt="Profile" />
          <AvatarFallback>
            {currentAvatar ? 'AJ' : 'Avatar'}
          </AvatarFallback>
        </Avatar>
        
        {isEditable && (
          <div className={styles.cameraButton}>
            <Camera size={16} />
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className={styles.hiddenInput}
      />
    </div>
  );
};

export default AvatarUploader;
