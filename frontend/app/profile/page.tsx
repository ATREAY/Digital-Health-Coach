"use client";
import ProtectedPage from "../../components/Protected";
import ProfileForm from "../../components/ProfileForm";

export default function ProfilePage() {
  return (
    <ProtectedPage>
      <ProfileForm />
    </ProtectedPage>
  );
}
