import React, { useState } from 'react';
import { User, PencilLine, Save, Award, BookOpen, Trophy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import AvatarUploader from '@/components/Profile/AvatarUploader';
import styles from './Profile.module.css';
import { toast } from 'sonner';

const Profile = () => {
  const { state, updateUserProfile, getStreak } = useApp();
  const { userProfile } = state;
  const dayStreak = getStreak();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || 'Alex Johnson');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [location, setLocation] = useState(userProfile?.location || 'San Francisco, CA');
  const [avatarUrl, setAvatarUrl] = useState(
    userProfile?.avatarUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
  );
  
  const handleSaveProfile = () => {
    updateUserProfile({
      name,
      bio, 
      location,
      avatarUrl,
    });
    
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6 animate-fade-in">
      <div className={styles.profileHeader}>
        <AvatarUploader 
          currentAvatar={avatarUrl}
          onAvatarChange={handleAvatarChange}
          isEditable={isEditing}
        />
        
        <Button
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          variant="outline"
          className={`${styles.editButton} mt-4`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </>
          ) : (
            <>
              <PencilLine className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <div className={styles.statsContainer}>
        <Card className={styles.statCard}>
          <BookOpen className={styles.statIcon} />
          <div className={styles.statValue}>{userProfile?.cardsLearned || 124}</div>
          <div className={styles.statLabel}>Cards Learned</div>
        </Card>
        
        <Card className={styles.statCard}>
          <Trophy className={styles.statIcon} />
          <div className={styles.statValue}>{userProfile?.challengesWon || 15}</div>
          <div className={styles.statLabel}>Challenges Won</div>
        </Card>
        
        <Card className={styles.statCard}>
          <Award className={styles.statIcon} />
          <div className={`${styles.statValue} ${styles.streakValue}`}>{dayStreak}</div>
          <div className={styles.statLabel}>Day Streak</div>
        </Card>
      </div>
      
      <Card className={`${styles.profileCard} w-full`}>
        <h2 className="font-bold mb-4 text-lg">Profile</h2>
        
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Name</div>
          {isEditing ? (
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your name"
            />
          ) : (
            <div>{name}</div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Location</div>
          {isEditing ? (
            <div className="flex items-center">
              <Input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                placeholder="Your location"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-gray-400" />
              {location}
            </div>
          )}
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Bio</div>
          {isEditing ? (
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.textarea}
              placeholder="Tell us about yourself and your interests"
            />
          ) : (
            <div>{bio || "L'histoire du monde, L'évolution artificielle, Avancés science"}</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
