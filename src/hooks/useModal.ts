import { useState, useEffect } from "react";
import type { PersonData } from "../contexts/GenericContext";

export default function useModal(item?: PersonData, type?: "intern" | "nss") {
  const [fullName, setFullName] = useState("");
  const [level, setLevel] = useState("");
  const [nssID, setNssID] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentInstitution, setCurrentInstitution] = useState("");
  const [course, setCourse] = useState("");
  const [interest, setInterest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Populate fields when editing an existing item
  useEffect(() => {
    if (item) {
      setFullName(item.name || "");
      setPhoneNumber(item.phone || "");
      setCurrentInstitution(item.institution || "");
      setCourse(item.course || "");
      setInterest(item.interest || "");
      setStartDate(item.startDate || "");
      setEndDate(item.endDate || "");

      // Type-specific fields
      if (type === "intern" && "level" in item) {
        setLevel(item.level.toString() || "");
      }

      if (type === "nss" && "nssID" in item && "email" in item) {
        setNssID(item.nssID || "");
        setEmail(item.email || "");
      }
    } else {
      // Reset all fields when no item (adding new)
      setFullName("");
      setLevel("");
      setNssID("");
      setEmail("");
      setPhoneNumber("");
      setCurrentInstitution("");
      setCourse("");
      setInterest("");
      setStartDate("");
      setEndDate("");
    }
  }, [item, type]);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };
  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(e.target.value);
  };
  const handleNssIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNssID(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleCurrentInstitutionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentInstitution(e.target.value);
  };
  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse(e.target.value);
  };
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return {
    fullName,
    level,
    nssID,
    course,
    email,
    interest,
    phoneNumber,
    currentInstitution,
    startDate,
    endDate,
    handleFullNameChange,
    handleCourseChange,
    handleCurrentInstitutionChange,
    handleEmailChange,
    handleEndDateChange,
    handleInterestChange,
    handleLevelChange,
    handleNssIDChange,
    handlePhoneNumberChange,
    handleStartDateChange,
  };
}
