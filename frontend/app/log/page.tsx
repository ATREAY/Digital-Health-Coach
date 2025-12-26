"use client";
import ProtectedPage from "../../components/Protected";
import LogForm from "../../components/LogForm";

export default function LogPage() {
  return (
    <ProtectedPage>
      <LogForm />
    </ProtectedPage>
  );
}
