
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Settings, Edit } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { SkinType } from '@/lib/database';

const ProfileCard = () => {
  const { profile, updateProfile, updateSkinType, removeConcern, removeAllergy } = useProfile();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(profile.name);

  const handleSave = () => {
    updateProfile({ name: editName });
    setIsEditing(false);
  };

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSkinType(e.target.value as SkinType);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={profile.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {profile.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing ? (
              <div className="space-y-1">
                <Input 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="max-w-[200px]"
                />
              </div>
            ) : (
              <div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Settings size={18} /> : <Edit size={18} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <Label className="text-muted-foreground">Skin Type</Label>
          {isEditing ? (
            <select 
              value={profile.skinType} 
              onChange={handleSkinTypeChange}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="normal">Normal</option>
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="combination">Combination</option>
              <option value="sensitive">Sensitive</option>
            </select>
          ) : (
            <div className="font-medium capitalize mt-1">{profile.skinType}</div>
          )}
        </div>

        <div>
          <Label className="text-muted-foreground">Skin Concerns</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.concerns.length > 0 ? (
              profile.concerns.map((concern) => (
                <Badge key={concern} variant="secondary" className="capitalize">
                  {concern}
                  {isEditing && (
                    <button 
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => removeConcern(concern)}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No concerns added</span>
            )}
          </div>
        </div>

        <div>
          <Label className="text-muted-foreground">Allergies</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.allergies.length > 0 ? (
              profile.allergies.map((allergy) => (
                <Badge key={allergy} variant="destructive" className="capitalize">
                  {allergy}
                  {isEditing && (
                    <button 
                      className="ml-1 text-destructive-foreground hover:text-destructive-foreground/90"
                      onClick={() => removeAllergy(allergy)}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No allergies added</span>
            )}
          </div>
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end gap-2 pt-0">
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileCard;
