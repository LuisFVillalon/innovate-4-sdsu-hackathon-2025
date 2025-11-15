"use client"

import { Button } from "@/components/ui/3d-button"
import { Input } from "@/components/ui/input"
import { useImageUpload } from "@/components/hooks/use-image-upload"
import { ImagePlus, X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  label?: string
  description?: string
  onUpload?: (url: string, file: File) => void
  onRemove?: () => void
  accept?: string
  multiple?: boolean
  value?: string | null
}

export function ImageUpload({
  label,
  description,
  onUpload,
  onRemove,
  accept = "image/*",
  multiple = false,
  value,
}: ImageUploadProps) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange: baseHandleFileChange,
    handleRemove: baseHandleRemove,
  } = useImageUpload({
    onUpload: (url) => {
      // This will be handled in our custom handler
    },
  })

  const [isDragging, setIsDragging] = useState(false)
  const displayUrl = value || previewUrl

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files && files.length > 0) {
        if (multiple) {
          // Process all selected files
          Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
              onUpload?.(URL.createObjectURL(file), file)
            }
          })
          // Reset the input so the same files can be selected again if needed
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
        } else {
          // Single file mode (existing behavior)
          const file = files[0]
          baseHandleFileChange(event)
          onUpload?.(URL.createObjectURL(file), file)
        }
      }
    },
    [baseHandleFileChange, onUpload, multiple, fileInputRef]
  )

  const handleRemove = useCallback(() => {
    baseHandleRemove()
    onRemove?.()
  }, [baseHandleRemove, onRemove])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        if (multiple) {
          // Process all dropped files
          Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
              onUpload?.(URL.createObjectURL(file), file)
            }
          })
        } else {
          // Single file mode
          const file = files[0]
          if (file && file.type.startsWith("image/")) {
            baseHandleFileChange({
              target: {
                files: [file],
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
            onUpload?.(URL.createObjectURL(file), file)
          }
        }
      }
    },
    [baseHandleFileChange, multiple, onUpload]
  )

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium leading-4 text-black">
          {label}
        </label>
      )}
      {description && (
        <p className="text-sm text-black">{description}</p>
      )}
      <div className="w-full space-y-2 rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
        <Input
          type="file"
          accept={accept}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          capture="environment"
        />
        {!displayUrl ? (
          <div
            onClick={handleThumbnailClick}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 bg-white transition-colors hover:bg-gray-50",
              isDragging && "border-gray-400 bg-gray-100"
            )}
          >
            <div className="rounded-full bg-gray-100 p-3 shadow-sm">
              <ImagePlus className="h-6 w-6 text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-black">Click to select or take photo</p>
              <p className="text-xs text-gray-600">
                or drag and drop file here
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="group relative h-64 overflow-hidden rounded-lg border border-gray-300">
              <Image
                src={displayUrl}
                alt="Preview"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleThumbnailClick}
                  className="h-9 w-9 p-0"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  className="h-9 w-9 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {fileName && (
              <div className="mt-2 flex items-center gap-2 text-sm text-black">
                <span className="truncate">{fileName}</span>
                <button
                  onClick={handleRemove}
                  className="ml-auto rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

