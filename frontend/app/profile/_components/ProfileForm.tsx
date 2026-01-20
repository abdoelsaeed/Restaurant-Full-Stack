/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState, useTransition } from "react";
import { User } from "../../types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "../../actions/auth.actions";
import { useTheme } from "next-themes";

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    age: user.age || "",
    address: user.address || "",
  });

  const handleSave = () => {
    startTransition(async () => {
      try {
        const result = await updateProfileAction(formData);

        if (result?.error) {
          toast.error(result.error);
        } else if (result?.success) {
          toast.success("Profile updated successfully!");
          setEditing(false);
          // Refresh the page to show updated data
          window.location.reload();
        }
      } catch (error) {
        toast.error("Failed to update profile");
      }
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      age: user.age || "",
      address: user.address || "",
    });
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and contact details
          </CardDescription>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(true)} variant="outline" size="sm">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Full Name
          </Label>
          {editing ? (
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your full name"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <p className={`font-medium p-3 rounded-md border ${
              resolvedTheme === 'dark' 
                ? 'text-white bg-gray-800 border-gray-700' 
                : 'text-gray-900 bg-gray-50 border-gray-200'
            }`}>
              {user.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          {editing ? (
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <p className={`font-medium p-3 rounded-md border ${
              resolvedTheme === 'dark' 
                ? 'text-white bg-gray-800 border-gray-700' 
                : 'text-gray-900 bg-gray-50 border-gray-200'
            }`}>
              {user.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          {editing ? (
            <Input
              id="phone"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone_number: e.target.value,
                })
              }
              placeholder="Enter your phone number"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <p className={`font-medium p-3 rounded-md border ${
              resolvedTheme === 'dark' 
                ? 'text-white bg-gray-800 border-gray-700' 
                : 'text-gray-900 bg-gray-50 border-gray-200'
            }`}>
              {user.phone_number}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Age
          </Label>
          {editing ? (
            <Input
              id="age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              placeholder="Enter your age"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <p className={`font-medium p-3 rounded-md border ${
              resolvedTheme === 'dark' 
                ? 'text-white bg-gray-800 border-gray-700' 
                : 'text-gray-900 bg-gray-50 border-gray-200'
            }`}>
              {user.age || "Not specified"}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </Label>
          {editing ? (
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Enter your address"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <p className={`font-medium p-3 rounded-md border ${
              resolvedTheme === 'dark' 
                ? 'text-white bg-gray-800 border-gray-700' 
                : 'text-gray-900 bg-gray-50 border-gray-200'
            }`}>
              {user.address || "Not specified"}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {editing && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isPending}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}