"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/3d-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopover,
  SelectListBox,
  SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewReport() {
  const router = useRouter()
  
  // Form state
  const [incidentType, setIncidentType] = useState<string>("")
  const [licensePlateImage, setLicensePlateImage] = useState<string | null>(null)
  const [licensePlateFile, setLicensePlateFile] = useState<File | null>(null)
  const [licensePlateNumber, setLicensePlateNumber] = useState<string>("")
  const [damageImages, setDamageImages] = useState<string[]>([])
  const [damageFiles, setDamageFiles] = useState<File[]>([])
  const [timestamp, setTimestamp] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [contactName, setContactName] = useState<string>("")
  const [contactEmail, setContactEmail] = useState<string>("")
  const [contactPhone, setContactPhone] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  // Generate random license plate number
  // const generateRandomLicensePlate = useCallback((): string => {
  //   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  //   const numbers = "0123456789"
  //   
  //   // Format: 1 number + 3 letters + 3 numbers (e.g., "1ABC234")
  //   const num1 = numbers[Math.floor(Math.random() * numbers.length)]
  //   const letter1 = letters[Math.floor(Math.random() * letters.length)]
  //   const letter2 = letters[Math.floor(Math.random() * letters.length)]
  //   const letter3 = letters[Math.floor(Math.random() * letters.length)]
  //   const num2 = numbers[Math.floor(Math.random() * numbers.length)]
  //   const num3 = numbers[Math.floor(Math.random() * numbers.length)]
  //   const num4 = numbers[Math.floor(Math.random() * numbers.length)]
  //   
  //   return `${num1}${letter1}${letter2}${letter3}${num2}${num3}${num4}`
  // }, [])

  // Extract timestamp from image metadata
  const extractTimestampFromFile = useCallback((file: File): string => {
    // Try to get timestamp from file metadata
    const fileDate = new Date(file.lastModified)
    // Format as ISO string for datetime-local input
    const year = fileDate.getFullYear()
    const month = String(fileDate.getMonth() + 1).padStart(2, "0")
    const day = String(fileDate.getDate()).padStart(2, "0")
    const hours = String(fileDate.getHours()).padStart(2, "0")
    const minutes = String(fileDate.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }, [])

  // Convert File to base64 data URL
  const convertFileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  // Validate required fields
  const isFormValid = useCallback(() => {
    // Required: Incident Type
    if (!incidentType) return false
    
    // Required: License Plate Photo
    if (!licensePlateImage) return false
    
    // Required: License Plate Number (when image is uploaded)
    if (licensePlateImage && !licensePlateNumber.trim()) return false
    
    // Required: At least one damage photo
    if (damageImages.length === 0) return false
    
    // Required: Timestamp
    if (!timestamp) return false
    
    // Required: Location
    if (!location) return false
    
    // Required: Contact name if contact info is enabled
    if (showContactInfo && !contactName.trim()) return false
    
    return true
  }, [incidentType, licensePlateImage, licensePlateNumber, damageImages, timestamp, location, showContactInfo, contactName])

  const handleLicensePlateUpload = useCallback(
    (url: string, file: File) => {
      setLicensePlateImage(url)
      setLicensePlateFile(file)
      // Auto-populate random license plate number
      // const randomPlate = generateRandomLicensePlate()
      // setLicensePlateNumber(randomPlate)
      // Hardcoded for demo
      setLicensePlateNumber("8KXD006")
      // Auto-populate timestamp from file metadata if not already set
      if (!timestamp) {
        const extractedTimestamp = extractTimestampFromFile(file)
        setTimestamp(extractedTimestamp)
      }
    },
    [timestamp, extractTimestampFromFile]
  )

  const handleDamageImageUpload = useCallback(
    (url: string, file: File) => {
      setDamageImages((prev) => {
        // Limit to 3 images maximum
        if (prev.length >= 3) {
          return prev
        }
        // Auto-populate timestamp from first damage photo if not already set
        if (!timestamp && prev.length === 0) {
          const extractedTimestamp = extractTimestampFromFile(file)
          setTimestamp(extractedTimestamp)
        }
        return [...prev, url]
      })
      setDamageFiles((prev) => {
        // Limit to 3 files maximum
        if (prev.length >= 3) {
          return prev
        }
        return [...prev, file]
      })
    },
    [timestamp, extractTimestampFromFile]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!isFormValid()) {
      alert("Please fill out all required fields before submitting.")
      return
    }
    
    try {
      // Convert damage photos to base64
      const photos: string[] = []
      for (const file of damageFiles) {
        const base64 = await convertFileToBase64(file)
        photos.push(base64)
      }

      // Map incident type to readable text
      const incidentText = incidentType === "caused" ? "I caused it." : incidentType === "witnessed" ? "I witnessed it." : ""

      // Convert timestamp from datetime-local to ISO string
      let timestampISO = ""
      if (timestamp) {
        const date = new Date(timestamp)
        timestampISO = date.toISOString()
      }

      // Build contact object only if showContactInfo is true
      const contact = showContactInfo
        ? {
            name: contactName,
            phone: contactPhone,
            email: contactEmail,
          }
        : undefined

      // Format data according to JSON template
      // Note: reportId will be generated by the API route
      const reportData = {
        ...(contact && { contact }),
        incident: incidentText,
        licensePlate: licensePlateNumber,
        photos: photos,
        description: description,
        timestamp: timestampISO,
        location: location,
      }

      // Send to API route to save on server
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })

      if (!response.ok) {
        throw new Error('Failed to save report')
      }

      const result = await response.json()
      
      // Navigate to confirmation page with reportId
      router.push(`/report/confirm?reportId=${result.reportId}`)
    } catch (error) {
      console.error("Error saving report:", error)
      alert("An error occurred while saving the report. Please try again.")
    }
  }

  // Parking lot options - you can customize these
  const parkingLots = [
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "P6",
    "P7",
    "P8",
    "P9",
    "P10",
    "P11",
    "P12",
    "P13",
    "P14",
    "P15",
    "P16",
    "P17a",
    "P17b",
    "P17c"  
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start py-8 px-4 sm:py-16 sm:px-8 bg-white">
        <div className="w-full space-y-6 sm:space-y-8">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-black">
                File an Incident
              </h1>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-black">
                Please fill out the form below to report an incident.
              </p>
            </div>
            <Button
              type="button"
              variant="default"
              onClick={() => router.push("/")}
              className="shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5 sm:space-y-6">
            {/* 1. Incident Type */}
            <div className="space-y-2">
              <Label htmlFor="incident-type">Incident Type <span className="text-red-500">*</span></Label>
              <Select
                selectedKey={incidentType}
                onSelectionChange={(key) => setIncidentType(key as string)}
                placeholder="Select incident type"
                className="w-full"
              >
                <SelectTrigger className="min-h-[44px] w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopover>
                  <SelectListBox>
                    <SelectItem id="caused">I caused it</SelectItem>
                    <SelectItem id="witnessed">I witnessed it</SelectItem>
                  </SelectListBox>
                </SelectPopover>
              </Select>
            </div>

            {/* 2. License Plate Photo */}
            <div className="space-y-2">
              <Label>
                Upload a picture of the victim's license plate <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-black">
                Supported formats: JPG, PNG
              </p>
              {licensePlateImage ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="relative h-48 rounded-lg border overflow-hidden">
                        <img
                          src={licensePlateImage}
                          alt="License plate"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLicensePlateImage(null)
                            setLicensePlateFile(null)
                            setLicensePlateNumber("")
                          }}
                          className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white border border-gray-300 text-red-600 rounded-full shadow-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ImageUpload
                  onUpload={handleLicensePlateUpload}
                  onRemove={() => {
                    setLicensePlateImage(null)
                    setLicensePlateFile(null)
                    setLicensePlateNumber("")
                  }}
                  accept="image/*"
                />
              )}
              {licensePlateImage && (
                <div className="space-y-2">
                  <Label htmlFor="license-plate-number">License Plate Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="license-plate-number"
                    type="text"
                    value={licensePlateNumber}
                    onChange={(e) => setLicensePlateNumber(e.target.value)}
                    placeholder="Enter license plate number"
                    className="min-h-[44px]"
                  />
                </div>
              )}
            </div>

            {/* 3. Damage Photos */}
            <div className="space-y-2">
              <Label>Upload pictures related to accident <span className="text-red-500">*</span></Label>
              <p className="text-sm text-black">
                Maximum 3 images. You can select or drag and drop multiple images at once. Supported formats: JPG, PNG
              </p>
              {damageImages.length === 0 ? (
                <ImageUpload
                  onUpload={handleDamageImageUpload}
                  onRemove={() => {
                    setDamageImages([])
                    setDamageFiles([])
                  }}
                  multiple={true}
                  accept="image/*"
                />
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {damageImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="relative h-48 rounded-lg border overflow-hidden">
                          <img
                            src={img}
                            alt={`Damage ${idx + 1}`}
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = damageImages.filter((_, i) => i !== idx)
                              const newFiles = damageFiles.filter((_, i) => i !== idx)
                              setDamageImages(newImages)
                              setDamageFiles(newFiles)
                            }}
                            className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white border border-gray-300 text-red-600 rounded-full shadow-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {damageImages.length < 3 && (
                    <ImageUpload
                      onUpload={handleDamageImageUpload}
                      onRemove={() => {}}
                      multiple={true}
                      accept="image/*"
                    />
                  )}
                  {damageImages.length >= 3 && (
                    <p className="text-sm text-black text-center">
                      Maximum of 3 images reached. Remove an image to add more.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 4. Timestamp */}
            <div className="space-y-2">
              <Label htmlFor="timestamp">Timestamp <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input
                  id="timestamp"
                  type="datetime-local"
                  value={timestamp}
                  onChange={(e) => {
                    const value = e.target.value
                    // Ensure year is exactly 4 digits
                    if (value) {
                      const parts = value.split("T")
                      if (parts[0]) {
                        const dateParts = parts[0].split("-")
                        if (dateParts[0] && dateParts[0].length === 4) {
                          setTimestamp(value)
                        } else if (dateParts[0] && dateParts[0].length < 4) {
                          // Allow typing but validate on blur
                          setTimestamp(value)
                        }
                      } else {
                        setTimestamp(value)
                      }
                    } else {
                      setTimestamp(value)
                    }
                  }}
                  onBlur={(e) => {
                    // Validate and fix year if needed
                    const value = e.target.value
                    if (value) {
                      const parts = value.split("T")
                      if (parts[0]) {
                        const dateParts = parts[0].split("-")
                        if (dateParts[0] && dateParts[0].length !== 4) {
                          // Pad or truncate year to 4 digits
                          let year = dateParts[0]
                          if (year.length < 4) {
                            year = year.padStart(4, "0")
                          } else if (year.length > 4) {
                            year = year.substring(0, 4)
                          }
                          const fixedDate = `${year}-${dateParts[1] || ""}-${dateParts[2] || ""}${parts[1] ? `T${parts[1]}` : ""}`
                          setTimestamp(fixedDate)
                        }
                      }
                    }
                  }}
                  placeholder="Date and time of incident"
                  className="min-h-[44px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-datetime-edit]:pr-8"
                  style={{
                    paddingRight: '2.5rem'
                  }}
                  max="9999-12-31T23:59"
                  min="1000-01-01T00:00"
                />
              </div>
              <p className="text-xs text-black">
                Timestamp is extracted automatically. You can edit if needed.
              </p>
            </div>

            {/* 5. Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <Select
                selectedKey={location}
                onSelectionChange={(key) => setLocation(key as string)}
                placeholder="Select parking lot"
              >
                <SelectTrigger className="min-h-[44px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopover>
                  <SelectListBox>
                    {parkingLots.map((lot) => (
                      <SelectItem key={lot} id={lot}>
                        {lot}
                      </SelectItem>
                    ))}
                  </SelectListBox>
                </SelectPopover>
              </Select>
            </div>

            {/* 6. Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Additional Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the incident..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="min-h-[120px]"
              />
            </div>

            {/* 7. Contact Information */}
            <div className="space-y-4">
              <Checkbox
                isSelected={showContactInfo}
                onChange={setShowContactInfo}
                className="min-h-[44px] items-center"
              >
                I would like to provide my contact information for the victim.
              </Checkbox>

              {showContactInfo && (
                <div className="ml-0 sm:ml-6 space-y-4 border-l-0 sm:border-l-2 border-muted pl-0 sm:pl-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name"
                      className="min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="min-h-[44px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 8. Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                variant="default" 
                stretch 
                className="min-h-[44px]"
                disabled={!isFormValid()}
              >
                Submit Report
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
